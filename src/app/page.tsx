import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EthGenerator from "@/components/EthGenerator";
import BatchGenerator from "@/components/BatchGenerator";
import EducationalInfo from "@/components/EducationalInfo";
import { Gem } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8 transition-colors duration-300">
      <main className="w-full max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2">
            <Gem className="w-10 h-10 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary">
              EthAddressGen
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your secure and intuitive Ethereum address generator.
          </p>
        </header>
        
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10">
            <TabsTrigger value="single">Single Address</TabsTrigger>
            <TabsTrigger value="batch">Batch Generation</TabsTrigger>
          </TabsList>
          <TabsContent value="single" className="mt-6">
            <EthGenerator />
          </TabsContent>
          <TabsContent value="batch" className="mt-6">
            <BatchGenerator />
          </TabsContent>
        </Tabs>
        
        <EducationalInfo />
      </main>
      <footer className="w-full max-w-4xl mx-auto pt-8 mt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} EthAddressGen. All rights reserved.</p>
        <p className="mt-1">This is an open-source tool. Always verify code before use.</p>
      </footer>
    </div>
  );
}
