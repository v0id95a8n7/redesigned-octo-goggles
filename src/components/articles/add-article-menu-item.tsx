"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { saveArticle } from "@/lib/actions/articles";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddArticleMenuItemProps {
  onSuccess?: () => void;
}

export function AddArticleMenuItem({ onSuccess }: AddArticleMenuItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await saveArticle(formData);
      toast.success("Article saved successfully!");

      // Reset form and close popover
      const form = document.getElementById("add-article-menu-form") as HTMLFormElement;
      form?.reset();
      setIsOpen(false);

      // Refresh the page to update server components
      router.refresh();

      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save article");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SidebarMenuButton className="w-full">
          <IconPlus className="size-4" />
          <span>Add Article</span>
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Article</h4>
            <p className="text-sm text-muted-foreground">
              Save an article by entering its URL
            </p>
          </div>
          <form id="add-article-menu-form" action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Article URL</Label>
              <Input
                id="url"
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
