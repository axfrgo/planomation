'use client';

import { useEffect, useState, useCallback } from 'react';

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

interface FacebookAuthResponse {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
}

interface FacebookLoginStatus {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: FacebookAuthResponse;
}

export function useFacebookSDK() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loginStatus, setLoginStatus] = useState<FacebookLoginStatus | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const statusChangeCallback = useCallback((response: FacebookLoginStatus) => {
        console.log('Facebook status change:', response);
        setLoginStatus(response);

        if (response.status === 'connected') {
            // User is logged in and authenticated
            const { accessToken, userID } = response.authResponse!;
            console.log('User connected to Facebook:', { accessToken, userID });
            // TODO: Send this to your backend to save
        } else if (response.status === 'not_authorized') {
            // User is logged into Facebook but hasn't authorized your app
            console.log('User is logged into Facebook but not authorized');
        } else {
            // User isn't logged into Facebook
            console.log('User is not logged into Facebook');
        }
    }, []);

    const checkLoginState = useCallback(() => {
        if (!window.FB) return;

        window.FB.getLoginStatus((response: FacebookLoginStatus) => {
            statusChangeCallback(response);
            setIsChecking(false);
        });
    }, [statusChangeCallback]);

    useEffect(() => {
        // Load Facebook SDK
        if (typeof window !== 'undefined') {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });

                window.FB.AppEvents.logPageView();
                setIsLoaded(true);

                // Check login status on load
                window.FB.getLoginStatus((response: FacebookLoginStatus) => {
                    statusChangeCallback(response);
                    setIsChecking(false);
                });
            };

            // Load the SDK asynchronously
            if (!document.getElementById('facebook-jssdk')) {
                (function (d, s, id) {
                    var js: any, fjs: any = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        }
    }, [statusChangeCallback]);

    const loginWithFacebook = () => {
        return new Promise((resolve, reject) => {
            if (!window.FB) {
                reject('Facebook SDK not loaded');
                return;
            }

            window.FB.login((response: FacebookLoginStatus) => {
                statusChangeCallback(response);

                if (response.status === 'connected' && response.authResponse) {
                    resolve(response.authResponse);
                } else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, {
                scope: 'pages_manage_posts,pages_read_engagement,pages_show_list,instagram_basic,instagram_content_publish',
                return_scopes: true
            });
        });
    };

    const logout = () => {
        return new Promise((resolve) => {
            if (!window.FB) {
                resolve(null);
                return;
            }

            window.FB.logout((response: any) => {
                statusChangeCallback({ status: 'unknown' });
                resolve(response);
            });
        });
    };

    return {
        isLoaded,
        isChecking,
        loginStatus,
        isConnected: loginStatus?.status === 'connected',
        accessToken: loginStatus?.authResponse?.accessToken,
        userID: loginStatus?.authResponse?.userID,
        loginWithFacebook,
        checkLoginState,
        logout,
        FB: typeof window !== 'undefined' ? window.FB : null
    };
}
