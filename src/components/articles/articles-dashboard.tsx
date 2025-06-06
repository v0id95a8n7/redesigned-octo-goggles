"use client";

import { AddArticleForm } from "@/components/articles/add-article-form";
import { ArticleList } from "@/components/articles/article-list";
import { getUserArticles } from "@/lib/actions/articles";
import type { Article } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ArticlesDashboardProps {
  initialArticles?: Article[];
}

export function ArticlesDashboard({ initialArticles = [] }: ArticlesDashboardProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function refreshArticles() {
    startTransition(async () => {
      try {
        const userArticles = await getUserArticles();
        setArticles(userArticles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    });
  }

  function handleSuccess() {
    refreshArticles();
    router.refresh();
  }

  return (
    <>
      {/* Add Article Form */}
      <div className="flex justify-center">
        <AddArticleForm onSuccess={handleSuccess} />
      </div>

      {/* Articles List */}
      <div>
        {isPending ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : (
          <ArticleList articles={articles} onArticleRemoved={handleSuccess} />
        )}
      </div>
    </>
  );
}
