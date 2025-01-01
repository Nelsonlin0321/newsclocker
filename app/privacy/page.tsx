import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <div className="space-y-4 text-gray-600">{section.content}</div>
              </section>
            ))}

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>
                .
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date("2024-12-30").toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "Introduction",
    content: (
      <p>
        NewsClocker ("we," "our," or "us") is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our news intelligence and
        subscription platform.
      </p>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <div className="space-y-2">
        <p>We collect information that you provide directly to us:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information (email, name, password)</li>
          <li>Subscription preferences and settings</li>
          <li>Custom news prompts and analysis preferences</li>
          <li>
            Payment information (processed securely through our payment
            providers)
          </li>
          <li>Usage data and interaction with our services</li>
        </ul>
      </div>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <div className="space-y-2">
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and personalize our news intelligence services</li>
          <li>Process your subscriptions and payments</li>
          <li>Send you AI-generated news insights and updates</li>
          <li>Improve our services and develop new features</li>
          <li>Communicate with you about your account and our services</li>
          <li>Protect against fraudulent or unauthorized activity</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Data Storage and Security",
    content: (
      <div className="space-y-2">
        <p>
          We implement appropriate security measures to protect your
          information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Secure access controls and authentication</li>
          <li>Regular backups and disaster recovery procedures</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Information Sharing",
    content: (
      <div className="space-y-2">
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Service providers who assist in operating our platform</li>
          <li>Payment processors for subscription management</li>
          <li>Analytics providers to improve our services</li>
          <li>Law enforcement when required by law</li>
        </ul>
        <p>We never sell your personal information to third parties.</p>
      </div>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <div className="space-y-2">
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data in a portable format</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Cookies and Tracking",
    content: (
      <div className="space-y-2">
        <p>We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Understand how you use our platform</li>
          <li>Improve our services and user experience</li>
          <li>Provide personalized content and recommendations</li>
        </ul>
        <p>You can control cookie preferences through your browser settings.</p>
      </div>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        Our services are not intended for users under 13 years of age. We do not
        knowingly collect information from children under 13. If you believe we
        have collected information from a child under 13, please contact us
        immediately.
      </p>
    ),
  },
  {
    title: "Changes to Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the "Last updated" date.
      </p>
    ),
  },
];
