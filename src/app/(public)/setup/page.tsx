import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBrandGoogle, IconExternalLink, IconKey } from "@tabler/icons-react";
import Link from "next/link";

export default function Setup() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Reedr Setup</h1>
        <p className="text-muted-foreground text-lg">
          Your articles app is ready! Follow these steps to complete the setup.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Google OAuth Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBrandGoogle className="h-5 w-5" />
              Google OAuth Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To enable Google authentication, you need to set up OAuth credentials.
            </p>

            <div className="space-y-2">
              <h4 className="font-medium">Steps:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                <li>Go to Google Cloud Console</li>
                <li>Create a new project or select existing</li>
                <li>Enable Google+ API</li>
                <li>Create OAuth 2.0 credentials</li>
                <li>
                  Add http://localhost:3000/api/auth/callback/google to authorized
                  redirect URIs
                </li>
                <li>Copy Client ID and Client Secret to .env file</li>
              </ol>
            </div>

            <Button variant="outline" size="sm" asChild>
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconExternalLink className="mr-2 h-4 w-4" />
                Google Cloud Console
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconKey className="h-5 w-5" />
              Environment Variables
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Update your .env file with the following variables:
            </p>

            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              <div>AUTH_GOOGLE_ID=your_google_client_id</div>
              <div>AUTH_GOOGLE_SECRET=your_google_client_secret</div>
            </div>

            <p className="text-xs text-muted-foreground">
              After updating the .env file, restart the development server.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium mb-2">📖 Article Parsing</h4>
                <p className="text-sm text-muted-foreground">
                  Uses Mozilla Readability to extract clean article content from any URL.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">🔐 Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Secure authentication with Google OAuth integration.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">📱 Responsive Design</h4>
                <p className="text-sm text-muted-foreground">
                  Beautiful, modern UI built with Tailwind CSS and shadcn/ui.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
