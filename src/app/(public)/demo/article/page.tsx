"use client";

import { ReadingSettingsPopover } from "@/components/articles/reading-settings-popover";
import { Badge } from "@/components/ui/badge";
// filepath: /Users/andreynikonorov/Developer/Personal/Projects/redesigned-octo-goggles/src/app/(public)/demo/article/page.tsx
import { Button } from "@/components/ui/button";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DemoArticlePage() {
  // Debug CSS variables on component mount
  useEffect(() => {
    const root = document.documentElement;
    const geistVar = getComputedStyle(root).getPropertyValue("--font-geist").trim();
    const notoSansVar = getComputedStyle(root)
      .getPropertyValue("--font-noto-sans")
      .trim();
    const notoSerifVar = getComputedStyle(root)
      .getPropertyValue("--font-noto-serif")
      .trim();
    const firaCodeVar = getComputedStyle(root)
      .getPropertyValue("--font-fira-code")
      .trim();
    const articleFontVar = getComputedStyle(root)
      .getPropertyValue("--article-font-family")
      .trim();

    console.log("=== CSS FONT VARIABLES DEBUG ===");
    console.log("--font-geist:", geistVar || "NOT FOUND");
    console.log("--font-noto-sans:", notoSansVar || "NOT FOUND");
    console.log("--font-noto-serif:", notoSerifVar || "NOT FOUND");
    console.log("--font-fira-code:", firaCodeVar || "NOT FOUND");
    console.log("--article-font-family:", articleFontVar || "NOT FOUND");
    console.log("=== END DEBUG ===");
  }, []);

  const demoContent = `
    <h2>Understanding Modern Web Development</h2>
    <p>Web development has evolved significantly over the past decade. From simple static websites to complex, interactive applications, the tools and techniques available to developers have transformed the digital landscape.</p>
    
    <p>Today's web developers must navigate a complex ecosystem of frameworks, libraries, and tools. React, Vue, Angular, and Svelte each offer unique approaches to building user interfaces, while Node.js has revolutionized server-side JavaScript development.</p>
    
    <h3>The Rise of TypeScript</h3>
    <p>TypeScript has gained massive adoption in the JavaScript community. By adding static type checking to JavaScript, it helps developers catch errors early and write more maintainable code. Many popular frameworks now offer first-class TypeScript support.</p>
    
    <blockquote>
      "TypeScript is JavaScript that scales. It's particularly valuable for large codebases where type safety can prevent runtime errors and improve developer productivity."
    </blockquote>
    
    <h3>Modern Development Tools</h3>
    <p>The tooling landscape has also evolved dramatically:</p>
    
    <ul>
      <li><strong>Build Tools:</strong> Vite, Webpack, and Rollup offer different approaches to bundling and optimization</li>
      <li><strong>Package Managers:</strong> npm, yarn, and pnpm each have their strengths</li>
      <li><strong>Development Environments:</strong> VS Code has become the dominant editor with its rich extension ecosystem</li>
    </ul>
    
    <p>Here's a simple example of a TypeScript function:</p>
    
    <pre><code>function calculateSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result); // Output: 15</code></pre>
    
    <h3>Looking Forward</h3>
    <p>As we look to the future, several trends are shaping web development:</p>
    
    <ol>
      <li>Server-side rendering is making a comeback with frameworks like Next.js and Nuxt.js</li>
      <li>Edge computing is bringing computation closer to users</li>
      <li>WebAssembly is enabling high-performance applications in the browser</li>
      <li>Progressive Web Apps are blurring the line between web and native applications</li>
    </ol>
    
    <p>The key to success in modern web development is staying curious, continuously learning, and choosing the right tools for each project's specific needs.</p>
  `;

  function formatReadingTime(length: number) {
    const wordsPerMinute = 200;
    const words = length / 5; // Estimate words from character count
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/demo">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Demo
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <IconExternalLink className="mr-2 h-4 w-4" />
                Original
              </a>
            </Button>
            <ReadingSettingsPopover />
          </div>
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          Understanding Modern Web Development
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Badge variant="secondary">Tech Blog</Badge>
          <span>by John Developer</span>
          <div className="flex items-center gap-1">
            <IconClock className="h-4 w-4" />
            <span>{formatReadingTime(demoContent.length)}</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCalendar className="h-4 w-4" />
            <span>Saved {formatDate(new Date())}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="article-content">
        <div dangerouslySetInnerHTML={{ __html: demoContent }} />
      </article>

      {/* Bottom Navigation */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/demo">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
