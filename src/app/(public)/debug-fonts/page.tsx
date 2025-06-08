"use client";

import { useEffect, useState } from "react";

export default function DebugFontsPage() {
  const [currentFont, setCurrentFont] = useState("noto-serif");

  useEffect(() => {
    const root = document.documentElement;

    // Check if CSS variables are available
    const geistVar = getComputedStyle(root).getPropertyValue("--font-geist");
    const notoSansVar = getComputedStyle(root).getPropertyValue("--font-noto-sans");
    const notoSerifVar = getComputedStyle(root).getPropertyValue("--font-noto-serif");
    const firaCodeVar = getComputedStyle(root).getPropertyValue("--font-fira-code");

    console.log("=== CSS FONT VARIABLES CHECK ===");
    console.log("--font-geist:", geistVar);
    console.log("--font-noto-sans:", notoSansVar);
    console.log("--font-noto-serif:", notoSerifVar);
    console.log("--font-fira-code:", firaCodeVar);
  }, []);

  const changeFont = (fontFamily: string) => {
    setCurrentFont(fontFamily);
    const root = document.documentElement;

    if (fontFamily === "noto-serif") {
      root.style.setProperty("--article-font-family", "var(--font-noto-serif), serif");
      console.log("Applied Noto Serif");
    } else {
      root.style.setProperty(
        "--article-font-family",
        "var(--font-noto-sans), sans-serif"
      );
      console.log("Applied Noto Sans");
    }

    // Check if the variable was set
    setTimeout(() => {
      const computedFontFamily = getComputedStyle(root).getPropertyValue(
        "--article-font-family"
      );
      console.log("Current --article-font-family:", computedFontFamily);
    }, 50);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Font Debug Page</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={() => changeFont("noto-serif")}
          className={`px-4 py-2 rounded ${currentFont === "noto-serif" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Noto Serif
        </button>
        <button
          onClick={() => changeFont("noto-sans")}
          className={`px-4 py-2 rounded ${currentFont === "noto-sans" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Noto Sans
        </button>
      </div>

      <div className="article-content">
        <h2>Test Article Content</h2>
        <p>
          This is a test paragraph to check if font switching works. The font should
          change when you click the buttons above.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>

        <h3>Another heading</h3>
        <p>
          More text content to test the font switching functionality. This should change
          font family based on the CSS variable.
        </p>

        <blockquote>
          This is a blockquote to test if all elements inherit the font correctly.
        </blockquote>

        <pre>
          <code>console.log("This code should always use Fira Code");</code>
        </pre>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Current font setting: {currentFont}</p>
        <p>Check browser console for CSS variable values</p>
      </div>
    </div>
  );
}
