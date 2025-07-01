import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";

export default function EducationalInfo() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-headline font-bold text-center mb-6 flex items-center justify-center gap-2">
        <ShieldCheck className="w-7 h-7 text-primary" />
        Security Best Practices
      </h2>
      <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg shadow-md border">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is a Private Key?</AccordionTrigger>
          <AccordionContent className="space-y-2 text-base">
            <p>
              An Ethereum private key is a secret 64-character hexadecimal string that gives you ownership and control over your cryptocurrency wallet and any funds within it. It's like the master password to your bank account.
            </p>
            <p className="font-semibold text-destructive">
              Never share your private key with anyone. Anyone who has it can access your funds.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How to Store Your Keys Securely</AccordionTrigger>
          <AccordionContent className="space-y-4 text-base">
            <div>
              <h4 className="font-semibold">Hardware Wallets (Most Secure)</h4>
              <p>Devices like Ledger or Trezor store your private keys offline, making them immune to online hacking attempts. This is the recommended method for storing significant amounts of crypto.</p>
            </div>
            <div>
              <h4 className="font-semibold">Paper Wallets (Good for long-term storage)</h4>
              <p>This involves writing or printing your private key on a piece of paper and storing it in a safe, secure location (like a fireproof safe or safe deposit box). Make multiple copies.</p>
            </div>
            <div>
                <h4 className="font-semibold text-destructive">Software Wallets (Less Secure)</h4>
                <p>Desktop or mobile wallets are convenient but are connected to the internet, making them vulnerable. Only use trusted, well-reviewed software and store small amounts for daily use.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Dangers of Online Generators &amp; Phishing</AccordionTrigger>
          <AccordionContent className="space-y-4 text-base">
            <p>
              While this tool generates keys securely in your browser (they are never sent over the internet), you should be cautious with online crypto tools.
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong className="font-semibold">Malicious Generators:</strong> Some websites might save the private keys they generate for you, intending to steal your funds later. Always use open-source and reputable tools.</li>
                <li><strong className="font-semibold">Phishing Scams:</strong> Be wary of emails, messages, or websites asking for your private key or seed phrase. Legitimate services will NEVER ask for this information.</li>
                <li><strong className="font-semibold">Clipboard Hijacking:</strong> Some malware can change the crypto address you've copied, replacing it with an attacker's address. Always double-check the address after pasting before sending a transaction.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
