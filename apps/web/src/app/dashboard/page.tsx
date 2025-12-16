'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setAuthToken } from '../../lib/api';

export default function DashboardPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut, session } = useClerk();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
        if (session) {
            session.getToken().then(token => setAuthToken(token));
        }
    }, [isLoaded, isSignedIn, router, session]);

    if (!isLoaded || !isSignedIn) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-ios-bg p-6 lg:p-12">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                    <p className="text-gray-500">Manage your account and scheduled content.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* User Card */}
                    <div className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <img src={user?.imageUrl} alt="Profile" className="h-12 w-12 rounded-full bg-gray-50" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">{user?.fullName}</h3>
                                <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                        <div className="mt-6 border-t border-gray-100 pt-4">
                            <dl className="divide-y divide-gray-100">
                                <div className="py-2 text-xs flex justify-between">
                                    <dt className="text-gray-500">User ID</dt>
                                    <dd className="font-mono text-gray-900 truncate ml-4" title={user?.id}>{user?.id?.substring(0, 12)}...</dd>
                                </div>
                                <div className="py-2 text-xs flex justify-between">
                                    <dt className="text-gray-500">Last Sign In</dt>
                                    <dd className="text-gray-900">{user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'N/A'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Connect Card */}
                    <div className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5 flex flex-col items-center justify-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">Twitter / X</h3>
                        <p className="mt-1 text-xs text-gray-500 mb-4">Connect your account to schedule posts.</p>

                        <button
                            onClick={async () => {
                                if (!user?.id) return;
                                try {
                                    const res = await fetch(`/api/auth/connect-mock?userId=${user.id}&platform=TWITTER`);
                                    if (res.ok) {
                                        alert('Connected mock Twitter account!');
                                    } else {
                                        alert('Failed to connect');
                                    }
                                } catch (e) {
                                    alert('Error connecting');
                                }
                            }}
                            className="text-xs font-semibold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Connect Twitter
                        </button>
                    </div>

                    {/* Stats Card */}
                    <div className="rounded-2xl bg-ios-card p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Stats</h3>
                        <dl className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <dt className="text-xs text-gray-500">Scheduled</dt>
                                <dd className="text-2xl font-bold text-gray-900">0</dd>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <dt className="text-xs text-gray-500">Published</dt>
                                <dd className="text-2xl font-bold text-gray-900">0</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
