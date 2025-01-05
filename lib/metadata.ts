export const defaultMetadata = {
  metadataBase: new URL("https://newsclocker.com"),
  title: {
    default:
      "NewsClocker - AI-Powered All-in-One News Intelligence and Subscription Platform",
    template: "%s | NewsClocker",
  },
  description:
    "Transform how you consume news, with AI-powered insights, personalized subscriptions, and intelligent analysis delivered to your inbox. Select your preferred news sources in a single platform.",
  keywords: [
    "news intelligence",
    "AI news analysis",
    "personalized news",
    "news subscription",
    "news insights",
    "AI prompts",
  ],
  authors: [{ name: "NewsClocker" }],
  creator: "NewsClocker",
  publisher: "NewsClocker",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newsclocker.com",
    siteName: "NewsClocker",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewsClocker - AI-Powered News Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@newsclocker",
    creator: "@newsclocker",
  },
  verification: {
    google: "google-site-verification-code",
  },
};
