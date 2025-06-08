import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDemoUser } from "@/lib/actions/demo";
import Link from "next/link";

export default function Demo() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Demo Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Try Reedr with a demo account. This will create a temporary user with sample
              articles.
            </p>

            <form action={createDemoUser}>
              <Button type="submit" className="w-full">
                Create Demo Account & Sign In
              </Button>
            </form>

            <p className="text-xs text-muted-foreground">
              Demo accounts are temporary and may be cleaned up periodically.
            </p>
          </CardContent>
        </Card>{" "}
        <Card>
          <CardHeader>
            <CardTitle>Demo Article & Reading Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Test the reading settings functionality with a sample article.
            </p>

            <div className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline">
                <Link href="/demo/article">View Demo Article</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              The demo article lets you test font switching, sizing, and other reading
              settings. The font test page shows all available fonts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
