import { AddArticleMenuItem } from "@/components/articles/add-article-menu-item";
import { ArticlesMenu } from "@/components/sidebar/articles-menu";
import ProfileMenu from "@/components/sidebar/profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserFromSession } from "@/lib/dao/users";
import { IconBookmark, IconChevronDown, IconNotebook } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export async function AppSidebar() {
  const user = await getUserFromSession();

  return (
    <Sidebar>
      {" "}
      <SidebarHeader className="pl-[22px] py-3.5">
        <Link
          href="/dashboard"
          className="flex gap-2 items-center mr-auto font-medium text-lg whitespace-pre"
        >
          <IconNotebook width={24} height={24} />
          <h1 className="text-xl font-bold">Reedr</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {" "}
        <SidebarGroup className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <AddArticleMenuItem />
            </SidebarMenuItem>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-transparent">
                    <IconBookmark className="size-4" />
                    <span>Saved</span>
                    <IconChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180 ml-auto" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ArticlesMenu />
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
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
