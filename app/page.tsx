import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Stay Ahead with Smart News Alerts
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Never miss important news again. Get personalized news alerts delivered straight to your inbox,
          exactly when you want them.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg">
              Learn more
            </Button>
          </Link>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Get news delivered as it happens, filtered to your exact specifications
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Filters</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Set precise keywords, languages, and time ranges for your news alerts
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Choose when and how often you want to receive your news updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}