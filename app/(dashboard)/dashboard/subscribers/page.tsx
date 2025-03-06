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
  title: "Subscribers - Email Marketing Automation",
  description: "Manage your email subscribers",
};

const subscribers = [
  {
    id: 1,
    email: "john@example.com",
    status: "Active",
    subscribedAt: "2024-03-15",
    lastEngagement: "2024-03-20",
  },
  {
    id: 2,
    email: "sarah@example.com",
    status: "Active",
    subscribedAt: "2024-03-14",
    lastEngagement: "2024-03-19",
  },
  {
    id: 3,
    email: "mike@example.com",
    status: "Inactive",
    subscribedAt: "2024-03-10",
    lastEngagement: "2024-03-15",
  },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
        <Button asChild>
          <Link href="/dashboard/subscribers/import">
            <Plus className="mr-2 h-4 w-4" />
            Import Subscribers
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed At</TableHead>
              <TableHead>Last Engagement</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      subscriber.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {subscriber.status}
                  </span>
                </TableCell>
                <TableCell>{subscriber.subscribedAt}</TableCell>
                <TableCell>{subscriber.lastEngagement}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/subscribers/${subscriber.id}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/subscribers/${subscriber.id}/edit`}>
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