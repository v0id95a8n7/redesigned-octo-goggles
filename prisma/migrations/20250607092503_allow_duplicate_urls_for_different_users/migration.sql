/*
  Warnings:

  - A unique constraint covering the columns `[url,user_id]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "articles_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "articles_url_user_id_key" ON "articles"("url", "user_id");
