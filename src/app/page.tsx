import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EthGenerator from "@/components/EthGenerator";
import BatchGenerator from "@/components/BatchGenerator";
import EducationalInfo from "@/components/EducationalInfo";
import { Gem } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 md:p-8 transition-colors duration-300 overflow-x-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse delay-2000"></div>

      <main className="w-full max-w-5xl mx-auto space-y-16 z-10">
        <header className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center gap-3">
            <Gem className="w-12 h-12 text-primary drop-shadow-[0_2px_4px_hsl(var(--primary)/0.5)]" />
            <h1 className="text-5xl sm:text-6xl font-headline font-bold text-primary-foreground text-shadow bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              EthAddressGen
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your secure and intuitive toolkit for generating Ethereum addresses, right in your browser.
          </p>
        </header>
        
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10 p-1.5 h-auto rounded-xl">
            <TabsTrigger value="single" className="text-base font-medium py-2 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg">Single Address</TabsTrigger>
            <TabsTrigger value="batch" className="text-base font-medium py-2 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-lg">Batch Generation</TabsTrigger>
          </TabsList>
          <TabsContent value="single" className="mt-8">
            <EthGenerator />
          </TabsContent>
          <TabsContent value="batch" className="mt-8">
            <BatchGenerator />
          </TabsContent>
        </Tabs>
        
        <EducationalInfo />
      </main>
      <footer className="w-full max-w-5xl mx-auto pt-8 mt-12 border-t border-primary/10 text-center text-muted-foreground text-sm z-10">
        <p>&copy; {new Date().getFullYear()} EthAddressGen. All rights reserved.</p>
        <p className="mt-1">This is an open-source tool. Always audit code before use with real funds.</p>
      </footer>
    </div>
  );
}
