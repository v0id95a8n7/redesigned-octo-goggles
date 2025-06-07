import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticle } from "@/lib/actions/articles";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = parseInt(id);

  if (isNaN(articleId)) {
    notFound();
  }

  const article = await getArticle(articleId);

  if (!article) {
    notFound();
  }

  function formatReadingTime(length: number | null) {
    if (!length) return null;
    const minutes = Math.ceil(length / 200);
    return `${minutes} min read`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        {" "}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/saved">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <IconExternalLink className="mr-2 h-4 w-4" />
              Original
            </a>
          </Button>
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {article.siteName && <Badge variant="secondary">{article.siteName}</Badge>}

          {article.author && <span>by {article.author}</span>}

          {article.length && (
            <div className="flex items-center gap-1">
              <IconClock className="h-4 w-4" />
              <span>{formatReadingTime(article.length)}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <IconCalendar className="h-4 w-4" />
            <span>Saved {formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-gray max-w-none dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="article-content"
        />
      </article>

      {/* Bottom Navigation */}
      <div className="mt-12 pt-8 border-t">
        {" "}
        <div className="flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/saved">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          {/* <Button variant="outline" asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <IconExternalLink className="mr-2 h-4 w-4" />
              View Original
            </a>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
