export default function FontTestPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Font Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Default Font (Geist)</h2>
          <p className="text-lg">
            This text should be in Geist font. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Noto Sans Font</h2>
          <p className="text-lg font-noto-sans">
            This text should be in Noto Sans font. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Noto Serif Font</h2>
          <p className="text-lg font-noto-serif">
            This text should be in Noto Serif font. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Fira Code Font</h2>
          <p className="text-lg font-fira-code">
            This text should be in Fira Code font. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">CSS Variables Test</h2>
          <div className="space-y-4">
            <p style={{ fontFamily: "var(--font-noto-sans), sans-serif" }}>
              Direct CSS variable --font-noto-sans: Lorem ipsum dolor sit amet.
            </p>
            <p style={{ fontFamily: "var(--font-noto-serif), serif" }}>
              Direct CSS variable --font-noto-serif: Lorem ipsum dolor sit amet.
            </p>
            <p style={{ fontFamily: "var(--font-fira-code), monospace" }}>
              Direct CSS variable --font-fira-code: Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Article Content Simulation</h2>
          <div className="article-content prose prose-gray max-w-none dark:prose-invert">
            <p>
              This paragraph simulates article content and should use the article font
              family CSS variable. By default, it should be Noto Serif.
            </p>
            <h3>Heading in Article Content</h3>
            <p>
              Another paragraph to test font inheritance. This should also use the article
              font family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
