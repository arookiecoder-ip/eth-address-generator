"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, KeyRound, List, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const batchFormSchema = z.object({
  count: z.coerce.number().int().min(1, "Must be at least 1").max(100, "Cannot generate more than 100 at a time."),
});

type KeyPair = {
  address: string;
  privateKey: string;
};

export default function BatchGenerator() {
  const [keyPairs, setKeyPairs] = useState<KeyPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof batchFormSchema>>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      count: 10,
    },
  });

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Copied!", description: `${label} copied to clipboard.` });
    });
  };

  const handleGenerateBatch = (values: z.infer<typeof batchFormSchema>) => {
    setIsLoading(true);
    setKeyPairs([]);
    // Use a worker or timeout to avoid freezing the UI on large generations
    setTimeout(() => {
        const pairs: KeyPair[] = [];
        for (let i = 0; i < values.count; i++) {
            const wallet = ethers.Wallet.createRandom();
            pairs.push({ address: wallet.address, privateKey: wallet.privateKey });
        }
        setKeyPairs(pairs);
        setIsLoading(false);
        toast({
            title: "Batch Generation Complete",
            description: `${values.count} new key pairs have been generated.`,
        });
    }, 250);
  };

  const downloadCSV = () => {
    if (keyPairs.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Index,Public Address,Private Key\n" 
      + keyPairs.map((pair, index) => `${index + 1},${pair.address},${pair.privateKey}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eth_addresses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "CSV Downloaded", description: "The list of key pairs has been saved." });
  };


  return (
    <Card className="w-full shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-lg border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
            <List className="w-7 h-7 text-primary" />
            Batch Address Generator
        </CardTitle>
        <CardDescription>
          Generate multiple key pairs at once. Results are cleared on page refresh.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateBatch)} className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 rounded-xl bg-secondary/30 border border-primary/10">
                <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                        <FormItem className="flex-grow w-full">
                            <FormLabel>Number of addresses (1-100)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto shrink-0">
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? "Generating..." : "Generate Batch"}
                </Button>
            </form>
        </Form>
      </CardContent>

      { (keyPairs.length > 0) &&
        <CardFooter className="flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center">
                <h3 className="font-bold text-lg text-foreground">Generated Key Pairs</h3>
                <Button variant="outline" onClick={downloadCSV} disabled={keyPairs.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                </Button>
            </div>
            <TooltipProvider>
              <ScrollArea className="h-80 w-full rounded-md border border-primary/10 bg-secondary/20">
              <Table>
                  <TableHeader className="sticky top-0 bg-secondary/80 backdrop-blur-sm z-10">
                  <TableRow>
                      <TableHead className="w-[60px]">#</TableHead>
                      <TableHead>Public Address</TableHead>
                      <TableHead>Private Key</TableHead>
                      <TableHead className="text-right w-[120px]">Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {keyPairs.map((pair, index) => (
                      <TableRow key={index} className="hover:bg-primary/5">
                        <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                        <TableCell className="font-code text-sm truncate max-w-[200px]">{pair.address}</TableCell>
                        <TableCell className="font-code text-sm truncate max-w-[200px] text-destructive/80 filter blur-[3px] hover:blur-none transition-all">{pair.privateKey}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyToClipboard(pair.address, 'Address')}>
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Copy Address</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyToClipboard(pair.privateKey, 'Private Key')}>
                                      <KeyRound className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Copy Private Key</p></TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
              </ScrollArea>
            </TooltipProvider>
        </CardFooter>
      }
    </Card>
  );
}
