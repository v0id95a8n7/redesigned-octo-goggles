import { ArticlesDashboard } from "@/components/articles/articles-dashboard";
import { getUserArticles } from "@/lib/actions/articles";
import { Suspense } from "react";

export default async function Dashboard() {
  const articles = await getUserArticles();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">My Articles</h1>
          <p className="text-muted-foreground">
            Save and read articles from anywhere on the web
          </p>
        </div>

        {/* Content */}
        <ArticlesDashboard initialArticles={articles} />
      </div>
    </div>
  );
}
