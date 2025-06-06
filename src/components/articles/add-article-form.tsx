"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { saveArticle } from "@/lib/actions/articles";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export function AddArticleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await saveArticle(formData);
      toast.success("Article saved successfully!");

      // Reset form
      const form = document.getElementById("add-article-form") as HTMLFormElement;
      form?.reset();

      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save article");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconPlus className="h-5 w-5" />
          Add Article
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-article-form" action={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="url"
              type="url"
              placeholder="https://example.com/article"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <IconPlus className="mr-2 h-4 w-4" />
                Save Article
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
