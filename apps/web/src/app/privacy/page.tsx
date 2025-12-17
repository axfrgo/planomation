export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-ios-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl bg-ios-card p-8 shadow-sm ring-1 ring-gray-900/5">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: December 16, 2024</p>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Planomation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you use our social media scheduling service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">a. Account Information</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">When you create an account, we collect:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Email address</li>
                                <li>Name (if provided)</li>
                                <li>Profile picture (if provided)</li>
                                <li>Authentication credentials (securely hashed)</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">b. Social Media Account Data</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">When you connect social media accounts, we collect:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>OAuth access tokens and refresh tokens</li>
                                <li>Social media account IDs</li>
                                <li>Profile information from connected accounts</li>
                                <li>Page and account metadata (for scheduling purposes)</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">c. Content Data</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">We store:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Posts you create and schedule</li>
                                <li>Media files you upload</li>
                                <li>Scheduling preferences and settings</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">d. Usage Data</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">We automatically collect:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Pages visited and features used</li>
                                <li>Date and time of access</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">We use your information to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Provide and maintain the Service</li>
                                <li>Authenticate your identity and connected accounts</li>
                                <li>Schedule and publish posts on your behalf</li>
                                <li>Improve and optimize the Service</li>
                                <li>Send important service notifications</li>
                                <li>Respond to support requests</li>
                                <li>Detect and prevent fraud or abuse</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. How We Share Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">We do not sell your personal information. We may share your information with:</p>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">a. Social Media Platforms</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We share your content with the social media platforms you've connected when you schedule posts for publication.
                            </p>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">b. Service Providers</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">We work with third-party service providers who assist us with:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Authentication (Clerk)</li>
                                <li>Hosting and infrastructure (Vercel, Railway)</li>
                                <li>Database services (Supabase/Neon)</li>
                                <li>Analytics and monitoring</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">c. Legal Requirements</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We may disclose information if required by law or to protect our rights, safety, or property.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement industry-standard security measures to protect your information, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
                                <li>Encryption of data in transit (HTTPS/TLS)</li>
                                <li>Encryption of sensitive data at rest</li>
                                <li>Secure OAuth token storage</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and authentication</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We retain your information for as long as your account is active or as needed to provide the Service.
                                You may request deletion of your account and associated data at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Export your data</li>
                                <li>Disconnect social media accounts</li>
                                <li>Opt-out of non-essential communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies and Tracking</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage patterns.
                                You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Planomation is not intended for users under 13 years of age. We do not knowingly collect information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. International Users</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your information may be transferred to and processed in countries other than your own. By using Planomation,
                                you consent to such transfers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Updates to This Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us through our support channels.
                            </p>
                        </section>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
