import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing - Email Marketing Automation",
  description: "Choose the perfect plan for your email marketing needs",
};

const plans = [
  {
    name: "Starter",
    price: "$20",
    description: "Perfect for small businesses just getting started",
    features: [
      "Up to 1,000 emails/month",
      "Basic email templates",
      "Simple automation",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: "Professional",
    price: "$50",
    description: "Ideal for growing businesses with advanced needs",
    features: [
      "Unlimited emails",
      "Advanced email templates",
      "Advanced automation",
      "Detailed analytics",
      "Priority support",
      "A/B testing",
      "Custom domains",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$150",
    description: "For large organizations with custom requirements",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "Custom reporting",
      "API access",
      "SLA guarantee",
      "Custom training",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the perfect plan for your email marketing needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative",
                plan.popular && "border-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="mt-4 text-3xl font-bold tracking-tight">
                  {plan.price}
                  <span className="text-base font-semibold text-muted-foreground">
                    /month
                  </span>
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom plan?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 