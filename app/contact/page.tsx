import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Contact - Email Marketing Automation",
  description: "Get in touch with our team",
};

export default function ContactPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Get in touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have questions about our email marketing platform? We&apos;re here to help.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">Inquiry Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your needs..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">Other ways to reach us</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="mt-2 text-muted-foreground">
                support@emailmarketing.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="mt-2 text-muted-foreground">
                +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Office</h3>
              <p className="mt-2 text-muted-foreground">
                123 Business St
                <br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 