import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'NewsClocker - AI-Powered News Intelligence Platform',
  description: 'Transform your news consumption with AI-powered insights, personalized subscriptions, and intelligent analysis delivered to your inbox.',
  keywords: ['AI news platform', 'personalized news', 'news intelligence', 'AI news analysis', 'news subscription service'],
  openGraph: {
    title: 'NewsClocker - AI-Powered News Intelligence',
    description: 'Get personalized news insights powered by AI, delivered to your inbox',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630 }]
  }
}