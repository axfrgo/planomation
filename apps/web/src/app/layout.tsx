import './global.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Script from 'next/script';

export const metadata = {
  title: 'Planomation - Social Media Scheduler',
  description: 'Schedule posts across all your social media platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-ios-bg min-h-screen">
          {/* Facebook SDK - Loaded after page interactive */}
          <Script
            id="facebook-sdk"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId: '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}',
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                  });
                  FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `
            }}
          />

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
