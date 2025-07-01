"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Copy, KeyRound, Wallet, Shuffle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

export default function EthGenerator() {
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [inputPrivateKey, setInputPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string, label: string) => {
    if(!text) return;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `${label} has been copied.`,
      });
    });
  };

  const generateRandom = () => {
    setIsLoading(true);
    setInputPrivateKey(""); // Clear derivation input
    setTimeout(() => {
      const wallet = ethers.Wallet.createRandom();
      setPrivateKey(wallet.privateKey);
      setAddress(wallet.address);
      setIsLoading(false);
      toast({
        title: "New Address Generated",
        description: "A new random Ethereum address and private key have been created.",
      });
    }, 250); // a small delay for better UX
  };

  const deriveFromPrivateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pk = e.target.value;
    setInputPrivateKey(pk);
    // Reset if input is empty
    if (pk === "") {
      setPrivateKey("");
      setAddress("");
      return;
    }
    if (ethers.isHexString(pk, 32)) {
      try {
        const wallet = new ethers.Wallet(pk);
        setPrivateKey(wallet.privateKey);
        setAddress(wallet.address);
      } catch (error) {
        setPrivateKey("");
        setAddress("");
      }
    } else {
        setPrivateKey("");
        setAddress("");
    }
  };

  const KeyDisplay = ({ label, value, isPrivate = false }: { label: string; value: string; isPrivate?: boolean }) => (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={label.toLowerCase()}
          readOnly
          value={value}
          placeholder={`Your ${label.toLowerCase()} will appear here...`}
          className={`font-code text-base transition-colors ${isPrivate ? 'bg-destructive/10 border-destructive/30 focus:ring-destructive/50' : 'bg-secondary/50 border-border'}`}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleCopyToClipboard(value, label)}
          disabled={!value}
          aria-label={`Copy ${label}`}
          className="shrink-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-lg border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Wallet className="w-7 h-7 text-primary" />
          Single Address Generator
        </CardTitle>
        <CardDescription>
          Create a new random address or derive one from an existing private key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="p-6 rounded-xl bg-secondary/30 border border-primary/10 flex flex-col justify-between text-center lg:text-left">
                <div>
                    <h3 className="font-bold text-lg text-foreground">Generate New Wallet</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-6">Securely generate a new key pair. This is done entirely on your device.</p>
                </div>
                <Button onClick={generateRandom} disabled={isLoading} size="lg" className="w-full">
                    <Shuffle className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? "Generating..." : "Generate Random Wallet"}
                </Button>
            </div>

            <div className="p-6 rounded-xl bg-secondary/30 border border-primary/10 flex flex-col justify-between text-center lg:text-left">
                 <div>
                    <h3 className="font-bold text-lg text-foreground">Derive from Private Key</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-6">Paste your key to get the corresponding public address.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="input-pk" className="sr-only">Your Private Key</Label>
                    <div className="relative flex items-center">
                        <KeyRound className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                        <Input
                            id="input-pk"
                            placeholder="Enter 64-character private key"
                            value={inputPrivateKey}
                            onChange={deriveFromPrivateKey}
                            className="font-code pl-10"
                        />
                    </div>
                </div>
            </div>
        </div>
        
        {(address || privateKey || inputPrivateKey) && (
          <>
            <Separator className="bg-primary/10" />
            <div className="space-y-4 pt-2">
                <h3 className="text-xl font-semibold text-center text-foreground">Your Generated Keys</h3>
                <KeyDisplay label="Public Address" value={address} />
                <KeyDisplay label="Private Key" value={privateKey} isPrivate />
            </div>
          </>
        )}

      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center gap-3 text-sm text-amber-800 dark:text-amber-300 p-3 rounded-lg bg-amber-400/10 border border-amber-500/20">
            <AlertTriangle className="h-8 w-8 shrink-0 text-amber-500" />
            <span>Private keys provide full control over your funds. <strong className="font-semibold">Handle with extreme care.</strong></span>
        </div>
      </CardFooter>
    </Card>
  );
}
