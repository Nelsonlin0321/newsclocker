import FeaturesGrid from "@/components/home/features-grid";
import HomePageIntro from "@/components/home/home-page-intro";
import { StoriesSection } from "@/components/user-stories/stories-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { homeMetadata } from "@/lib/metadata/home-metadata";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute right-0 top-0 -translate-y-[10%] translate-x-[15%] w-[60%] h-[120%] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-20 blur-3xl" />
        <div className="container relative px-4 py-32 mx-auto">
          <HomePageIntro />
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How NewsClocker Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your news consumption
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <StoriesSection />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stay Ahead with Smart News Intelligence
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who trust NewsClocker for
              AI-powered news insights and analysis.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: "Set Your Preferences",
    description:
      "Choose your topics, news sources, and delivery schedule. Tell us what matters to you.",
  },
  {
    title: "Create Your Prompts",
    description:
      "Design custom prompts for AI analysis or choose from our community library.",
  },
  {
    title: "Receive Smart Insights",
    description:
      "Get AI-powered news analysis delivered to your inbox, exactly when you need it.",
  },
];
