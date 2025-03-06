import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Email Marketing Automation
            <span className="text-primary block mt-2">Made Simple</span>
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Send personalized email campaigns, automate workflows, and grow your e-commerce business with our powerful platform.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 