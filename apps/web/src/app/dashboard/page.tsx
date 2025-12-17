'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setAuthToken } from '../../lib/api';
import { useFacebookSDK } from '../../lib/useFacebookSDK';

const SOCIAL_PLATFORMS = [
    {
        id: 'twitter',
        name: 'Twitter / X',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
        ),
        color: 'bg-blue-400',
        bgLight: 'bg-blue-50',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: 'bg-blue-600',
        bgLight: 'bg-blue-50',
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        color: 'bg-blue-500',
        bgLight: 'bg-blue-50',
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
        ),
        color: 'bg-pink-500',
        bgLight: 'bg-pink-50',
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
        ),
        color: 'bg-black',
        bgLight: 'bg-gray-50',
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        color: 'bg-red-600',
        bgLight: 'bg-red-50',
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
        ),
        color: 'bg-red-600',
        bgLight: 'bg-red-50',
    },
    {
        id: 'threads',
        name: 'Threads',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.774-1.68-.369-.322-.916-.532-1.679-.646-1.347-.201-2.907.246-3.953.743l-.650-1.733c1.248-.59 3.191-1.146 5.073-.906 1.247.158 2.282.65 2.99 1.42.647.705 1.034 1.654 1.15 2.815.193 1.937.014 3.915-.532 5.88-.285.924-1.033 2.148-2.532 2.902-1.1.555-2.389.829-3.83.829-.024.001-.05.001-.075.001zM9.507 13.48c-.74.065-1.366.283-1.858.647-.426.316-.65.74-.618 1.162.027.375.204.732.525.987.3.238.76.383 1.258.359.957-.052 1.671-.375 2.184-1.003.482-.59.754-1.413.808-2.448a11.844 11.844 0 0 0-2.299.297z" />
            </svg>
        ),
        color: 'bg-black',
        bgLight: 'bg-gray-50',
    },
];

export default function DashboardPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut, session } = useClerk();
    const router = useRouter();
    const [connections, setConnections] = useState<string[]>([]);
    const {
        isLoaded: fbLoaded,
        isChecking: fbChecking,
        isConnected: fbConnected,
        loginWithFacebook,
        logout: fbLogout,
        accessToken: fbAccessToken,
        userID: fbUserID
    } = useFacebookSDK();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
        if (session) {
            session.getToken().then(token => setAuthToken(token));
        }
    }, [isLoaded, isSignedIn, router, session]);

    // Update connections when Facebook status changes
    useEffect(() => {
        if (fbConnected && !connections.includes('facebook')) {
            setConnections([...connections, 'facebook']);

            // TODO: Send to backend to save
            console.log('Facebook connected:', { fbAccessToken, fbUserID });
        } else if (!fbConnected && connections.includes('facebook')) {
            setConnections(connections.filter(c => c !== 'facebook'));
        }
    }, [fbConnected, fbAccessToken, fbUserID]);

    const handleConnect = async (platformId: string) => {
        if (platformId === 'facebook') {
            if (fbConnected) {
                // Already connected - disconnect
                if (confirm('Disconnect from Facebook?')) {
                    await fbLogout();
                }
            } else if (fbLoaded) {
                // Not connected - connect
                try {
                    await loginWithFacebook();
                } catch (error) {
                    console.error('Facebook login failed:', error);
                    alert('Failed to connect Facebook. Please try again.');
                }
            } else {
                alert('Facebook SDK is still loading. Please wait a moment and try again.');
            }
        } else {
            // For other platforms, show message that backend is required
            alert(`${platformId.charAt(0).toUpperCase() + platformId.slice(1)} OAuth requires backend services.\n\nTo enable this:\n1. Deploy API Gateway & Scheduler Service to Railway/Render\n2. Add OAuth credentials to environment variables\n3. Update callback URLs in ${platformId} developer dashboard\n\nSee DEPLOYMENT.md for more details.`);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-ios-bg p-6 lg:p-12">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                    <p className="text-gray-500">Connect your social accounts and schedule posts.</p>
                </div>

                {/* User Info Card */}
                <div className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-4">
                        <img src={user?.imageUrl} alt="Profile" className="h-16 w-16 rounded-full bg-gray-50 ring-2 ring-white" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{user?.fullName}</h3>
                            <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>
                </div>

                {/* Connect Social Accounts Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Social Accounts</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {SOCIAL_PLATFORMS.map((platform) => (
                            <div
                                key={platform.id}
                                className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-all"
                            >
                                <div className={`h-12 w-12 rounded-full ${platform.bgLight} flex items-center justify-center mb-4`}>
                                    <div className={`${platform.color} text-white p-2 rounded-full`}>
                                        {platform.icon}
                                    </div>
                                </div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">{platform.name}</h4>

                                {connections.includes(platform.id) ? (
                                    <div className="flex items-center gap-2 text-xs text-green-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">Connected</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleConnect(platform.id)}
                                        className="w-full text-xs font-semibold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                                    >
                                        Connect
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Stats</h3>
                    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <dt className="text-xs text-gray-500">Connected</dt>
                            <dd className="text-2xl font-bold text-gray-900">{connections.length}</dd>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <dt className="text-xs text-gray-500">Scheduled</dt>
                            <dd className="text-2xl font-bold text-gray-900">0</dd>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <dt className="text-xs text-gray-500">Published</dt>
                            <dd className="text-2xl font-bold text-gray-900">0</dd>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <dt className="text-xs text-gray-500">Drafts</dt>
                            <dd className="text-2xl font-bold text-gray-900">0</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
