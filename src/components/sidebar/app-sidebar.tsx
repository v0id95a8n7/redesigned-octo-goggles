import ProfileMenu from "@/components/sidebar/profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserFromSession } from "@/lib/dao/users";
import { IconBookmark, IconSettings } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export async function AppSidebar() {
  const user = await getUserFromSession();

  return (
    <Sidebar>
      {" "}
      <SidebarHeader className="pl-[22px] py-3.5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Articles App" width={28} height={28} />
          Reedr
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <IconBookmark className="size-4" />
                My Articles
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <IconSettings className="size-4" />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="h-auto">
                <SidebarMenuButton>
                  <Avatar className="size-7">
                    <AvatarImage src={user?.picture || ""} />
                    <AvatarFallback className="text-muted-foreground">
                      {user?.name
                        ?.split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("") || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <p>{user?.name || "Anonymous"}</p>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 md:w-[15rem]">
                <ProfileMenu hasCustomerId={false} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
