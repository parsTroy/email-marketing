import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Mail, Trash, Edit } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Campaigns - Email Marketing Automation",
  description: "Manage your email marketing campaigns",
};

const campaigns = [
  {
    id: 1,
    name: "Welcome Series",
    status: "Active",
    subscribers: 1234,
    openRate: "42.3%",
    lastSent: "2024-03-15",
  },
  {
    id: 2,
    name: "Product Launch",
    status: "Draft",
    subscribers: 0,
    openRate: "-",
    lastSent: "-",
  },
  {
    id: 3,
    name: "Monthly Newsletter",
    status: "Scheduled",
    subscribers: 2345,
    openRate: "38.7%",
    lastSent: "2024-03-01",
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <Button asChild>
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribers</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Last Sent</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      campaign.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "Draft"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>{campaign.subscribers}</TableCell>
                <TableCell>{campaign.openRate}</TableCell>
                <TableCell>{campaign.lastSent}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/campaigns/${campaign.id}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 