import { AppSidebar } from "@/components/sidebar/app-sidebar";
import TopMenu from "@/components/top-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserFromSession } from "@/lib/dao/users";
import { cookies } from "next/headers";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getUserFromSession();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="relative flex flex-1 min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <TopMenu />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
