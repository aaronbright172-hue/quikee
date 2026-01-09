import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-sm text-neutral-600 mb-4">
            Last Updated: August 4, 2025
          </p>
          <p className="text-neutral-800 leading-relaxed">
            This Privacy Policy describes how Quikee Bikes ("we", "us", "our")
            collects, uses, and protects your personal information when you
            visit our website (quikee.top) or use our services. By using our
            site, you agree to the practices described here.
          </p>
          <p className="text-neutral-800 leading-relaxed">
            We may update this policy from time to time by posting a new version
            on our website.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              1. INFORMATION WE COLLECT
            </h2>
            <h3 className="font-bold text-lg text-neutral-900 mb-2">
              a. Information you provide directly:
            </h3>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Name, address, phone number, and email</li>
              <li>Payment information and credit card information</li>
              <li>Account login details</li>
              <li>Support and feedback communications</li>
            </ul>
            <h3 className="font-bold text-lg text-neutral-900 mb-2 mt-4">
              b. Automatically when you use our site:
            </h3>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Device type, operating system, and IP address</li>
              <li>Usage patterns via cookies and similar technology</li>
            </ul>
            <h3 className="font-bold text-lg text-neutral-900 mb-2 mt-4">
              c. Information from third parties:
            </h3>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Shopify (store platform)</li>
              <li>Payment processors (payment billing)</li>
              <li>Shipping and analytics partners</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              2. HOW WE USE YOUR INFORMATION
            </h2>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>To process orders and manage your account</li>
              <li>To provide customer support</li>
              <li>
                To send marketing, and advertising, or promotions (you can opt
                out anytime)
              </li>
              <li>To detect and prevent fraud</li>
              <li>To improve site performance and ads</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              3. COOKIES
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              We use cookies to improve your shopping experience and personalise
              content. You can control cookie settings through your browser. For
              more information, please see our Cookie Policy.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              4. SHARING YOUR INFORMATION
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Service providers (IT, payment, shipping)</li>
              <li>Affiliates and business partners</li>
              <li>Legal authorities when required</li>
              <li>With your consent or as part of a group</li>
            </ul>
            <p className="text-neutral-800 leading-relaxed mt-4">
              We do not sell or share your sensitive personal information
              without consent.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              5. YOUR RIGHTS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              Depending on where you live, you may be able to:
            </p>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Access your personal data</li>
              <li>Request deletion</li>
              <li>Opt-out of targeted advertising</li>
              <li>Receive a copy of your data</li>
              <li>Object to processing your data</li>
            </ul>
            <p className="text-neutral-800 leading-relaxed mt-4">
              To make a request, contact us at info@quikee.top. We may verify
              your identity before processing your request.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              6. DATA RETENTION & SECURITY
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              We keep your information as long as needed to provide services and
              meet legal requirements. We use security measures to protect your
              data, but no method is 100% secure. Avoid sending sensitive
              details through unsecured channels.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              7. CHILDREN'S PRIVACY
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              Our site is not intended for children under 16. We do not
              knowingly collect their personal information.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              8. INTERNATIONAL USERS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              If you are outside Australia, your information may be stored and
              processed in other countries. We use recognised safeguards for
              international data transfers.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              9. CONTACT US
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              If you have questions about this policy or how your data is
              handled, email: info@quikee.top
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
