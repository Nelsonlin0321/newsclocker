import { Metadata } from 'next'

export const promptLibraryMetadata: Metadata = {
  title: 'News Prompts Library | NewsClocker',
  description: 'Explore and create custom AI prompts for news analysis. Share and discover prompts from the NewsClocker community.',
  keywords: ['news prompts', 'AI prompts', 'news analysis prompts', 'custom prompts', 'prompt library'],
  openGraph: {
    title: 'NewsClocker Prompt Library - Custom News Analysis',
    description: 'Create and discover AI prompts for news analysis',
    images: [{ url: '/og/prompt-library.jpg', width: 1200, height: 630 }]
  }
}