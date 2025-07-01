import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

const InfoItem = ({ icon, trigger, children }: { icon: React.ReactNode, trigger: string, children: React.ReactNode }) => (
    <AccordionItem value={trigger} className="border-b-0">
        <AccordionTrigger className="text-base sm:text-lg hover:no-underline font-semibold rounded-lg px-4 py-3 hover:bg-primary/10 transition-colors [&[data-state=open]]:bg-primary/10">
            <div className="flex items-center gap-3">
                {icon}
                <span>{trigger}</span>
            </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 text-base leading-relaxed text-muted-foreground pt-4 pb-2 px-4">
            {children}
        </AccordionContent>
    </AccordionItem>
);

export default function EducationalInfo() {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-headline font-bold text-center mb-8 flex items-center justify-center gap-3">
        <ShieldCheck className="w-8 h-8 text-primary" />
        Security Best Practices
      </h2>
      <div className="w-full bg-card/80 backdrop-blur-lg border border-primary/10 rounded-xl shadow-xl shadow-primary/5 p-2 sm:p-4">
        <Accordion type="single" collapsible className="w-full">
            <InfoItem 
                icon={<ShieldQuestion className="w-6 h-6 text-accent" />} 
                trigger="What is a Private Key?"
            >
                <p>
                An Ethereum private key is a secret 64-character hexadecimal string that gives you ownership and control over your wallet and any funds within it. It's the master key to your digital vault.
                </p>
                <p className="font-semibold text-destructive/80">
                Never share your private key. Anyone who has it can access and steal your assets.
                </p>
            </InfoItem>
            <InfoItem 
                icon={<ShieldCheck className="w-6 h-6 text-green-500" />} 
                trigger="How to Store Your Keys Securely"
            >
                 <div>
                    <h4 className="font-semibold text-foreground">Hardware Wallets (Most Secure)</h4>
                    <p>Devices like Ledger or Trezor store your private keys offline, making them immune to online hacking. This is the gold standard for storing significant value.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Paper Wallets (Offline Storage)</h4>
                    <p>This involves printing your key on paper and storing it in a safe, secure physical location. Good for long-term "cold storage," but be mindful of physical damage or loss.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Software Wallets (Convenient, Use with Caution)</h4>
                    <p>Desktop or mobile wallets are connected to the internet, making them inherently more vulnerable. Use trusted, well-reviewed software and only for small, "spending" amounts.</p>
                </div>
            </InfoItem>
            <InfoItem 
                icon={<ShieldAlert className="w-6 h-6 text-amber-500" />} 
                trigger="Dangers of Online Generators & Phishing"
            >
                <p>
                While this tool generates keys securely in your browser (they are never sent over the internet), you must be vigilant in the crypto space.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Malicious Generators:</strong> Some websites might secretly save the private keys they generate, intending to steal funds later. Always use open-source and reputable tools.</li>
                    <li><strong>Phishing Scams:</strong> Be wary of any email, message, or site asking for your private key or seed phrase. Legitimate services will <strong className="uppercase">never</strong> ask for this.</li>
                    <li><strong>Clipboard Hijacking:</strong> Malware can change the crypto address you've copied, replacing it with an attacker's address. Always double-check the address after pasting before sending a transaction.</li>
                </ul>
            </InfoItem>
        </Accordion>
      </div>
    </section>
  );
}
