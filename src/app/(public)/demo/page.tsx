import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDemoUser } from "@/lib/actions/demo";

export default function Demo() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Demo Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Try the Articles App with a demo account. This will create a temporary user
            with sample articles.
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
      </Card>
    </div>
  );
}
