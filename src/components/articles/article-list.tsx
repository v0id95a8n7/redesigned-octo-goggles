"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { removeArticle } from "@/lib/actions/articles";
import type { Article } from "@prisma/client";
import { IconClock, IconExternalLink, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";

interface ArticleListProps {
  articles: Article[];
  onArticleRemoved?: () => void;
}

export function ArticleList({ articles, onArticleRemoved }: ArticleListProps) {
  async function handleDelete(id: number) {
    try {
      await removeArticle(id);
      toast.success("Article removed successfully!");
      onArticleRemoved?.();
    } catch (_error) {
      toast.error("Failed to remove article");
    }
  }

  function formatReadingTime(length: number | null) {
    if (!length) return null;
    const minutes = Math.ceil(length / 200); // Assuming 200 words per minute
    return `${minutes} min read`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles saved yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Add your first article using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg leading-tight line-clamp-2">
                <Link href={`/articles/${article.id}`} className="hover:underline">
                  {article.title}
                </Link>
              </CardTitle>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <IconExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(article.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {article.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {article.siteName && (
                  <Badge variant="secondary" className="text-xs">
                    {article.siteName}
                  </Badge>
                )}
                {article.author && <span>by {article.author}</span>}
              </div>

              <div className="flex items-center gap-2">
                {article.length && (
                  <div className="flex items-center gap-1">
                    <IconClock className="h-3 w-3" />
                    <span>{formatReadingTime(article.length)}</span>
                  </div>
                )}
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
