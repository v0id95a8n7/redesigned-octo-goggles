import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export interface ParsedArticle {
  title: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  byline: string;
  dir: string;
  siteName: string;
  lang: string;
  publishedTime: string;
}

export async function parseArticle(url: string): Promise<ParsedArticle | null> {
  try {
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Create a DOM instance
    const dom = new JSDOM(html, { url });
    const document = dom.window.document;

    // Use Readability to parse the article
    const reader = new Readability(document);
    const article = reader.parse();

    if (!article) {
      return null;
    }

    return {
      title: article.title ?? "",
      content: article.content ?? "",
      textContent: article.textContent ?? "",
      length: article.length ?? 0,
      excerpt: article.excerpt ?? "",
      byline: article.byline ?? "",
      dir: article.dir ?? "",
      siteName: article.siteName ?? "",
      lang: article.lang ?? "",
      publishedTime: article.publishedTime ?? "",
    };
  } catch (error) {
    console.error("Error parsing article:", error);
    return null;
  }
}
