import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bell, Globe, Clock } from "lucide-react";
import { NewsHero } from "@/components/hero/news-hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute right-0 top-0 -translate-y-[10%] translate-x-[15%] w-[60%] h-[120%] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-20 blur-3xl" />
        <div className="container relative px-4 py-32 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Stay Ahead with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
                  Smart News Clocker
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-xl">
                Get personalized news alerts delivered to your inbox, exactly
                when you want them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-6 text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl" />
              <div className="relative animate-float">
                <NewsHero className="w-1/2 h-auto drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Social Proof Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {["Quantum", "Echo Valley", "Celestial", "Pulse", "Horizon"].map(
              (brand) => (
                <div
                  key={brand}
                  className="text-xl font-semibold text-gray-400"
                >
                  {brand}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pt-2 pb-10 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A more effective way to track everything happening
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get personalized news alerts delivered straight to your inbox,
              exactly when you want them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your news experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who trust NewsAlert Pro for their
              daily news updates.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Real-time Updates",
    description:
      "Get news delivered instantly, filtered to your exact specifications and preferences.",
    icon: <Bell className="w-6 h-6" />,
  },
  {
    title: "Global Coverage",
    description: "Access news from multiple languages and sources worldwide.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Smart Scheduling",
    description:
      "Choose your preferred delivery time and frequency for news updates.",
    icon: <Clock className="w-6 h-6" />,
  },
];
