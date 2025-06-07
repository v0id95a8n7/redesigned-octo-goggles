"use server";

import { signIn } from "@/auth";
import { createArticle } from "@/lib/dao/articles";
import { saveUser } from "@/lib/dao/users";
import { redirect } from "next/navigation";

export async function createDemoUser() {
  try {
    // Create demo user
    const demoEmail = `demo_${Date.now()}@example.com`;
    const demoUser = await saveUser({
      name: "Demo User",
      email: demoEmail,
      picture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    });

    // Create sample articles
    const sampleArticles = [
      {
        title: "Welcome to Reedr",
        content:
          "<h1>Welcome to Reedr</h1><p>This is a sample article to show how the app works. You can save articles from any website and read them in a clean, distraction-free format.</p><p>Try adding your own articles by pasting a URL in the dashboard!</p>",
        excerpt: "This is a sample article to show how the Reedr works.",
        url: "https://example.com/welcome",
        author: "Reedr Team",
        siteName: "Reedr",
        length: 150,
        userId: demoUser.id,
      },
      {
        title: "How to Use Mozilla Readability",
        content:
          "<h1>How to Use Mozilla Readability</h1><p>Mozilla Readability is a standalone version of the readability library used for Firefox Reader View.</p><p>It removes clutter from web pages and provides a clean reading experience.</p>",
        excerpt: "Learn about Mozilla Readability and how it cleans up web pages.",
        url: "https://example.com/readability",
        author: "Mozilla Team",
        siteName: "Mozilla",
        length: 200,
        userId: demoUser.id,
      },
    ];

    for (const article of sampleArticles) {
      await createArticle(article);
    }

    // Sign in the demo user
    await signIn("credentials", {
      email: demoEmail,
      name: "Demo User",
      password: "demo",
      redirect: false,
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Failed to create demo user:", error);
    redirect("/login?error=demo_failed");
  }
}
