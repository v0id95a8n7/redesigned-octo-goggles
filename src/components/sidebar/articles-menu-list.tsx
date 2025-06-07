"use client";

import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { Article } from "@prisma/client";
import { IconArticle } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ArticlesMenuListProps {
  articles: Article[];
}

export function ArticlesMenuList({ articles }: ArticlesMenuListProps) {
  const pathname = usePathname();

  if (!articles.length) {
    return (
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton className="text-muted-foreground">
            No saved articles
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    );
  }

  return (
    <SidebarMenuSub>
      {articles.slice(0, 10).map((article) => {
        const isActive = pathname === `/articles/${article.id}`;

        return (
          <SidebarMenuSubItem key={article.id}>
            <SidebarMenuSubButton asChild isActive={isActive}>
              <Link href={`/articles/${article.id}`}>
                {/* <IconArticle className="size-3" /> */}
                <span className="truncate">{article.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
      {articles.length > 10 && (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link href="/saved" className="text-muted-foreground">
              View all ({articles.length})
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )}
    </SidebarMenuSub>
  );
}
