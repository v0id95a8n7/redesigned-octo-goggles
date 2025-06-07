import { ArticlesDashboard } from "@/components/articles/articles-dashboard";
import { getUserArticles } from "@/lib/actions/articles";
import { Suspense } from "react";

export default async function SavedArticles() {
  const articles = await getUserArticles();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-2">
        {" "}
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-left">Saved Articles</h1>
        </div>
        {/* Content */}
        <ArticlesDashboard initialArticles={articles} />
      </div>
    </div>
  );
}
