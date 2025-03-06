import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, CreditCard, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - Email Marketing Automation",
  description: "View your email marketing statistics and performance",
};

const stats = [
  {
    name: "Total Subscribers",
    value: "0",
    icon: Users,
    description: "Active subscribers in your list",
  },
  {
    name: "Campaigns Sent",
    value: "0",
    icon: Mail,
    description: "Total campaigns sent this month",
  },
  {
    name: "Average Open Rate",
    value: "0%",
    icon: Activity,
    description: "Across all campaigns",
  },
  {
    name: "Revenue",
    value: "$0",
    icon: CreditCard,
    description: "Total revenue this month",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your email marketing performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 