import './global.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export const metadata = {
  title: 'Planomation - Social Media Scheduler',
  description: 'Schedule posts across all your social media platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {fbAppId && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.fbAsyncInit = function() {
                    FB.init({
                      appId: '${fbAppId}',
                      cookie: true,
                      xfbml: true,
                      version: 'v18.0'
                    });
                    FB.AppEvents.logPageView();
                  };
                `
              }}
            />
          )}
        </head>
        <body className="bg-ios-bg min-h-screen">
          {fbAppId && (
            <script
              async
              defer
              crossOrigin="anonymous"
              src="https://connect.facebook.net/en_US/sdk.js"
            />
          )}

          <header className="sticky top-0 z-50 glass-nav backdrop-blur-md bg-white/80 border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Planomation</h1>
                <div className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <a href="/dashboard" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors mr-4">
                      Dashboard
                    </a>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 ring-2 ring-white"
                        }
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
