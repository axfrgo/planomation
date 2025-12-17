export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-ios-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl bg-ios-card p-8 shadow-sm ring-1 ring-gray-900/5">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: December 16, 2024</p>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using Planomation ("the Service"), you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Planomation is a social media scheduling platform that allows users to connect their social media accounts
                                (including but not limited to Twitter/X, LinkedIn, Facebook, Instagram, TikTok, YouTube, Pinterest, and Threads)
                                and schedule posts for publication.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                To use Planomation, you must create an account. You agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Be responsible for all activities under your account</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Social Media Account Connections</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By connecting your social media accounts to Planomation, you grant us permission to post content on your behalf.
                                You remain solely responsible for all content posted through the Service and must ensure compliance with each
                                platform's terms of service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Content</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">You are responsible for all content you create and schedule through Planomation. You agree not to post content that:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Violates any laws or regulations</li>
                                <li>Infringes on intellectual property rights</li>
                                <li>Contains harmful, offensive, or inappropriate material</li>
                                <li>Violates the terms of service of connected platforms</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Service Availability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                While we strive for high availability, we do not guarantee uninterrupted access to the Service.
                                We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data and Privacy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your use of Planomation is also governed by our <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>.
                                We collect and use data as described in that policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Planomation is provided "as is" without warranties of any kind. We are not liable for any damages arising from
                                your use of the Service, including but not limited to failed posts, data loss, or issues with connected platforms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update these Terms of Service from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
                            <p className="text-gray-600 leading-relaxed">
                                For questions about these Terms of Service, please contact us through our support channels.
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
