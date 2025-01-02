"use client";

import { ScrollAnimation } from "@/components/animations/scroll-animation";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { NewsHero } from "@/components/hero/news-hero";
import { SuccessStoriesSection } from "@/components/success-stories/success-stories-section";
import { Button } from "@/components/ui/button";
import {
  fadeIn,
  parallaxScroll,
  scaleIn,
  slideIn,
} from "@/lib/animation-variants";
import {
  ArrowRight,
  Bell,
  Brain,
  FileText,
  Inbox,
  Share2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute right-0 top-0 -translate-y-[10%] translate-x-[15%] w-[60%] h-[120%] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-20 blur-3xl" />
        <div className="container relative px-4 py-32 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation variants={slideIn} custom="left">
              <div className="text-left space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                  Your AI-Powered{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
                    News Intelligence
                  </span>
                </h1>
                <p className="text-xl text-blue-100 max-w-xl">
                  Transform how you consume news with AI-powered insights,
                  personalized subscriptions, and intelligent analysis delivered
                  right to your inbox.
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
                  <Link href="/prompt-library">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-lg px-8 py-6 text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    >
                      Explore Prompts
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              variants={scaleIn}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl" />
              <div className="relative animate-float">
                <NewsHero className="w-full h-auto drop-shadow-2xl" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ScrollAnimation variants={fadeIn}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Intelligent News Delivery & Analysis
              </h2>
              <p className="text-xl text-gray-600">
                Experience news like never before with AI-powered insights and
                personalized delivery
              </p>
            </div>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} variants={fadeIn}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Success Stories */}
      <ScrollAnimation variants={parallaxScroll(50)}>
        <SuccessStoriesSection />
      </ScrollAnimation>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* <ScrollAnimation variants={fadeIn}> */}
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
        {/* </ScrollAnimation> */}
      </section>
    </div>
  );
}

const features = [
  {
    title: "Personalized News Subscriptions",
    description:
      "Create custom news feeds with your preferred keywords, sources, and delivery schedules. Stay informed on topics that matter to you.",
    icon: <Bell className="w-6 h-6" />,
  },
  {
    title: "AI-Powered Insights",
    description:
      "Transform raw news into actionable insights with our advanced AI analysis. Get deeper understanding of complex news topics.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "Custom News Prompts",
    description:
      "Create and share your own news analysis prompts. Customize how AI generates insights from your news sources.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Smart PDF Generation",
    description:
      "Export your news insights as professionally formatted PDF reports. Perfect for sharing or archiving important information.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Dedicated News Inbox",
    description:
      "Access all your AI-generated news insights in one organized place. Never miss an important update.",
    icon: <Inbox className="w-6 h-6" />,
  },
  {
    title: "Community Sharing",
    description:
      "Share your custom prompts with the community. Discover new ways to analyze news from other professionals.",
    icon: <Share2 className="w-6 h-6" />,
  },
];

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
