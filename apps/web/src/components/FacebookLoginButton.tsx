'use client';

import { useEffect } from 'react';

interface FacebookLoginButtonProps {
    configId?: string;
    onLogin?: () => void;
    size?: 'small' | 'medium' | 'large';
    buttonType?: 'continue_with' | 'login_with';
}

export default function FacebookLoginButton({
    configId,
    onLogin,
    size = 'large',
    buttonType = 'continue_with'
}: FacebookLoginButtonProps) {
    useEffect(() => {
        // Parse XFBML after component mounts
        if (typeof window !== 'undefined' && window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    const handleLogin = () => {
        if (onLogin) {
            onLogin();
        }
    };

    return (
        <div
            className="fb-login-button"
            data-width=""
            data-size={size}
            data-button-type={buttonType}
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            data-scope="pages_manage_posts,pages_read_engagement,pages_show_list,instagram_basic,instagram_content_publish"
            data-onlogin={onLogin ? 'checkLoginState()' : undefined}
            data-config-id={configId}
        ></div>
    );
}
