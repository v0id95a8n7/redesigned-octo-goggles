import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBookmark,
  IconBrandGithub,
  IconBrandGoogle,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 max-w-7xl h-[80vh] mx-auto p-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <IconBookmark className="h-12 w-12 text-primary" />
            <h1 className="text-6xl font-bold">Reedr</h1>
          </div>

          <p className="text-2xl text-muted-foreground max-w-2xl">
            Save and read articles from anywhere on the web with clean, distraction-free
            reading experience.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">Try Demo</Link>
            </Button>

            <Button variant="ghost" size="lg" asChild>
              <Link href="/setup">Setup Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto p-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for a modern article reading experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconExternalLink className="h-5 w-5" />
                Smart Parsing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Automatically extracts clean article content using Mozilla Readability,
                removing ads and distractions for focused reading.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBrandGoogle className="h-5 w-5" />
                Google Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Secure sign-in with your Google account. Your articles are private and
                synced across all your devices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBookmark className="h-5 w-5" />
                Beautiful Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clean, responsive interface built with Tailwind CSS and shadcn/ui. Dark
                mode support for comfortable reading anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
