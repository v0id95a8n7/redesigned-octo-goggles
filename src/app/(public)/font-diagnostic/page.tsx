"use client";

import { useEffect, useState } from "react";

export default function FontDiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState<any>({});

  useEffect(() => {
    const runDiagnostics = () => {
      const root = document.documentElement;
      const testElement = document.createElement("div");
      testElement.className = "article-content";
      testElement.innerHTML = "<p>Test paragraph</p>";
      document.body.appendChild(testElement);

      const result = {
        // CSS Variables
        fontGeist: getComputedStyle(root).getPropertyValue("--font-geist").trim(),
        fontNotoSans: getComputedStyle(root).getPropertyValue("--font-noto-sans").trim(),
        fontNotoSerif: getComputedStyle(root)
          .getPropertyValue("--font-noto-serif")
          .trim(),
        fontFiraCode: getComputedStyle(root).getPropertyValue("--font-fira-code").trim(),

        // Article font variable
        articleFontFamily: getComputedStyle(root)
          .getPropertyValue("--article-font-family")
          .trim(),

        // Computed styles
        bodyFontFamily: getComputedStyle(document.body).fontFamily,
        testElementFontFamily: getComputedStyle(testElement).fontFamily,

        // DOM classes
        bodyClasses: document.body.className,
        htmlClasses: document.documentElement.className,
      };

      document.body.removeChild(testElement);
      setDiagnostics(result);

      console.log("=== FONT DIAGNOSTICS ===", result);
    };

    runDiagnostics();
  }, []);

  const testFontSwitch = () => {
    const root = document.documentElement;

    // Try setting the font directly
    const currentFont = root.style.getPropertyValue("--article-font-family");
    console.log("Current article font:", currentFont);

    if (currentFont.includes("serif")) {
      root.style.setProperty(
        "--article-font-family",
        "var(--font-noto-sans), sans-serif"
      );
      console.log("Switched to Noto Sans");
    } else {
      root.style.setProperty("--article-font-family", "var(--font-noto-serif), serif");
      console.log("Switched to Noto Serif");
    }

    // Check what actually got set
    setTimeout(() => {
      const newFont = getComputedStyle(root).getPropertyValue("--article-font-family");
      console.log("New article font variable:", newFont);

      const testEl = document.querySelector(".test-article-content");
      if (testEl) {
        const computedFont = getComputedStyle(testEl).fontFamily;
        console.log("Computed font on test element:", computedFont);
      }
    }, 50);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Font Diagnostic Page</h1>

      <div className="mb-6">
        <button
          onClick={testFontSwitch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Font Switch
        </button>
      </div>

      <div className="test-article-content article-content mb-8">
        <h2>Test Article Content</h2>
        <p>This paragraph should change font when you click the button above.</p>
        <p>
          Pay attention to the font family - it should switch between Noto Sans and Noto
          Serif.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-4">Diagnostic Results:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(diagnostics, null, 2)}
        </pre>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-semibold">Font Examples:</h4>
          <div className="space-y-2 mt-2">
            <p style={{ fontFamily: "var(--font-geist), sans-serif" }}>
              Geist Font: The quick brown fox jumps over the lazy dog
            </p>
            <p style={{ fontFamily: "var(--font-noto-sans), sans-serif" }}>
              Noto Sans Font: The quick brown fox jumps over the lazy dog
            </p>
            <p style={{ fontFamily: "var(--font-noto-serif), serif" }}>
              Noto Serif Font: The quick brown fox jumps over the lazy dog
            </p>
            <p style={{ fontFamily: "var(--font-fira-code), monospace" }}>
              Fira Code Font: The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
