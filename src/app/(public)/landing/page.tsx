import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  IconBook,
  IconBookmark,
  IconBrandGithub,
  IconBrandGoogle,
  IconExternalLink,
  IconNotebook,
  IconWreckingBall,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <main className="flex flex-col items-center flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 max-w-7xl h-[80vh] mx-auto p-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <IconNotebook className="h-16 w-16 text-primary" />
            <h1 className="text-6xl font-bold">Reedr</h1>
          </div>

          <p className="text-2xl text-muted-foreground max-w-2xl">
            Save and read articles from anywhere on the web with clean, distraction-free
            reading experience.
          </p>
          <div className="flex flex-row gap-4 justify-center items-center mt-8">
            <Input type="Email" placeholder="Email" className="max-w-xs"></Input>
            <Button variant="default" size="default">
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
