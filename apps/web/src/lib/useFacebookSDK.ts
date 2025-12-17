'use client';

import { useEffect, useState } from 'react';

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

export function useFacebookSDK() {
    const [isLoaded, setIsLoaded] = useState(false);

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
            };

            // Load the SDK asynchronously
            (function (d, s, id) {
                var js: any, fjs: any = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }, []);

    const loginWithFacebook = () => {
        return new Promise((resolve, reject) => {
            if (!window.FB) {
                reject('Facebook SDK not loaded');
                return;
            }

            window.FB.login((response: any) => {
                if (response.authResponse) {
                    // User is logged in and authenticated
                    resolve(response.authResponse);
                } else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, {
                scope: 'pages_manage_posts,pages_read_engagement,pages_show_list',
                return_scopes: true
            });
        });
    };

    const getLoginStatus = () => {
        return new Promise((resolve, reject) => {
            if (!window.FB) {
                reject('Facebook SDK not loaded');
                return;
            }

            window.FB.getLoginStatus((response: any) => {
                resolve(response);
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
                resolve(response);
            });
        });
    };

    return {
        isLoaded,
        loginWithFacebook,
        getLoginStatus,
        logout,
        FB: typeof window !== 'undefined' ? window.FB : null
    };
}
