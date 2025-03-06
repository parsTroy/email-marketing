"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Mail,
  Users,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Subscribers", href: "/dashboard/subscribers", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background p-6 shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            Email Marketing
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </div>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
} 