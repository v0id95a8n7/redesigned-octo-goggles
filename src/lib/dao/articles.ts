import { PrismaClient } from "@prisma/client";
import type { Article } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt?: string;
  url: string;
  author?: string;
  siteName?: string;
  publishedTime?: string;
  length?: number;
  userId: number;
}

export async function createArticle(data: CreateArticleData): Promise<Article> {
  return await prisma.article.create({
    data,
  });
}

export async function getArticlesByUserId(userId: number): Promise<Article[]> {
  return await prisma.article.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getArticleById(
  id: number,
  userId: number
): Promise<Article | null> {
  return await prisma.article.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function deleteArticle(id: number, userId: number): Promise<void> {
  await prisma.article.delete({
    where: {
      id,
      userId,
    },
  });
}

export async function getArticleByUrl(
  url: string,
  userId: number
): Promise<Article | null> {
  return await prisma.article.findFirst({
    where: {
      url,
      userId,
    },
  });
}
