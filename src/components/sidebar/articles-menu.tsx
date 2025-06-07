import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getUserArticles } from "@/lib/actions/articles";
import { Suspense } from "react";
import { ArticlesMenuList } from "./articles-menu-list";

function ArticlesMenuSkeleton() {
  return (
    <SidebarMenuSub>
      {Array.from({ length: 3 }).map((_, index) => (
        <SidebarMenuSubItem key={index}>
          <SidebarMenuSubButton>
            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}

async function ArticlesMenuContent() {
  try {
    const articles = await getUserArticles();
    return <ArticlesMenuList articles={articles} />;
  } catch (_error) {
    return (
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton className="text-muted-foreground">
            Failed to load articles
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    );
  }
}

export function ArticlesMenu() {
  return (
    <Suspense fallback={<ArticlesMenuSkeleton />}>
      <ArticlesMenuContent />
    </Suspense>
  );
}
