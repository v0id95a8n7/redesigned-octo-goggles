"use client";

import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { Article } from "@prisma/client";
import { IconArticle } from "@tabler/icons-react";
import Link from "next/link";

interface ArticlesMenuListProps {
  articles: Article[];
}

export function ArticlesMenuList({ articles }: ArticlesMenuListProps) {
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
      {articles.slice(0, 5).map((article) => (
        <SidebarMenuSubItem key={article.id}>
          <SidebarMenuSubButton asChild>
            <Link href={`/articles/${article.id}`}>
              <IconArticle className="size-3" />
              <span className="truncate">{article.title}</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
      {articles.length > 5 && (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link href="/dashboard" className="text-muted-foreground">
              View all ({articles.length})
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )}
    </SidebarMenuSub>
  );
}
