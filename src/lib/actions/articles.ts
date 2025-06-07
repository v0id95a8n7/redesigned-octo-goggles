"use server";

import { auth } from "@/auth";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticleByUrl,
  getArticlesByUserId,
} from "@/lib/dao/articles";
import { parseArticle } from "@/lib/readability";
import { redirect } from "next/navigation";
import { z } from "zod";

const saveArticleSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export async function saveArticle(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = saveArticleSchema.safeParse({
    url: formData.get("url"),
  });

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const { url } = result.data;
  // Check if article already exists for this user
  const existingArticle = await getArticleByUrl(url, Number(session.user.id));
  if (existingArticle) {
    return existingArticle;
  }

  // Parse the article
  const parsedArticle = await parseArticle(url);
  if (!parsedArticle) {
    throw new Error("Could not parse article from this URL");
  }

  // Save to database
  const article = await createArticle({
    title: parsedArticle.title,
    content: parsedArticle.content,
    excerpt: parsedArticle.excerpt || `${parsedArticle.textContent.substring(0, 300)}...`,
    url,
    author: parsedArticle.byline,
    siteName: parsedArticle.siteName,
    publishedTime: parsedArticle.publishedTime,
    length: parsedArticle.length,
    userId: Number(session.user.id),
  });

  return article;
}

export async function getUserArticles() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return await getArticlesByUserId(Number(session.user.id));
}

export async function getArticle(id: number) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return await getArticleById(id, Number(session.user.id));
}

export async function removeArticle(id: number) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await deleteArticle(id, Number(session.user.id));
}
