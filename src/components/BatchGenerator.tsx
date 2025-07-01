"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Copy, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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

  const handleGenerateBatch = (values: z.infer<typeof batchFormSchema>) => {
    setIsLoading(true);
    setKeyPairs([]);
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
            description: `${values.count} new key pairs have been generated.`
        })
    }, 500); // Simulate processing time
  };

  const copyAsCsv = () => {
    if (keyPairs.length === 0) return;
    const header = "address,private_key\n";
    const csvContent = keyPairs.map(p => `${p.address},${p.privateKey}`).join("\n");
    navigator.clipboard.writeText(header + csvContent).then(() => {
      toast({
        title: "Copied as CSV!",
        description: "All generated key pairs have been copied to your clipboard.",
      });
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <List className="w-6 h-6 text-primary" />
            Batch Address Generator
        </CardTitle>
        <CardDescription>
          Generate multiple key pairs at once. Results are only stored on this page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateBatch)} className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 rounded-lg bg-secondary/50 border border-primary/20">
                <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of addresses</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 10" {...field} className="max-w-xs" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Generating..." : "Generate Batch"}
                </Button>
            </form>
        </Form>
      </CardContent>

      { (isLoading || keyPairs.length > 0) &&
        <CardFooter className="flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center">
                <h3 className="font-semibold text-lg">Generated Key Pairs</h3>
                <Button variant="outline" onClick={copyAsCsv} disabled={keyPairs.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Copy as CSV
                </Button>
            </div>
            <ScrollArea className="h-72 w-full rounded-md border">
            <Table>
                <TableHeader className="sticky top-0 bg-secondary">
                <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Public Address</TableHead>
                    <TableHead>Private Key</TableHead>
                    <TableHead className="text-right">Copy</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading && keyPairs.length === 0 ? (
                    Array.from({length: form.getValues('count')}).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell colSpan={4}>
                                <div className="flex items-center space-x-2 animate-pulse">
                                    <div className="h-4 w-4 bg-muted rounded-full"></div>
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    keyPairs.map((pair, index) => (
                        <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-code text-sm truncate max-w-[200px]">{pair.address}</TableCell>
                        <TableCell className="font-code text-sm truncate max-w-[200px] text-destructive/80">{pair.privateKey}</TableCell>
                        <TableCell className="text-right">
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                navigator.clipboard.writeText(`${pair.address},${pair.privateKey}`);
                                toast({ title: "Copied row" });
                            }}
                            >
                            <Copy className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </ScrollArea>
        </CardFooter>
      }
    </Card>
  );
}
