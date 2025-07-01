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
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `${label} has been copied.`,
      });
    });
  };

  const generateRandom = () => {
    setIsLoading(true);
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
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={label.toLowerCase()}
          readOnly
          value={value}
          placeholder={`Your ${label.toLowerCase()} will appear here`}
          className={`font-code ${isPrivate ? 'bg-destructive/10 border-destructive/50' : ''}`}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleCopyToClipboard(value, label)}
          disabled={!value}
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Single Address Generator
        </CardTitle>
        <CardDescription>
          Create a new random address or derive one from an existing private key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
          <h3 className="font-semibold mb-2">Generate a new random wallet</h3>
          <p className="text-sm text-muted-foreground mb-4">Click the button to securely generate a new key pair on your device.</p>
          <Button onClick={generateRandom} disabled={isLoading}>
            <Shuffle className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "Generating..." : "Generate Random Address"}
          </Button>
        </div>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-card px-2 text-muted-foreground text-sm">OR</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
          <h3 className="font-semibold mb-2">Derive from private key</h3>
          <p className="text-sm text-muted-foreground mb-4">Paste your private key below to derive the corresponding public address.</p>
          <div className="space-y-2">
             <Label htmlFor="input-pk">Your Private Key</Label>
             <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
                <Input
                    id="input-pk"
                    placeholder="Enter a 64-character hex private key"
                    value={inputPrivateKey}
                    onChange={deriveFromPrivateKey}
                    className="font-code"
                />
             </div>
          </div>
        </div>
        
        <Separator />

        <div className="space-y-4 pt-4">
            <KeyDisplay label="Public Address" value={address} />
            <KeyDisplay label="Private Key" value={privateKey} isPrivate />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <span>Private keys provide full control over your funds. Handle with extreme care.</span>
        </div>
      </CardFooter>
    </Card>
  );
}
