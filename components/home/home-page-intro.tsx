"use client";
import { ScrollAnimation } from "@/components/animations/scroll-animation";
import { NewsHero } from "@/components/hero/news-hero";
import { Button } from "@/components/ui/button";
import { scaleIn, slideIn } from "@/lib/animation-variants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {};

const HomePageIntro = (props: Props) => {
  return (
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
            personalized subscriptions, and intelligent analysis delivered right
            to your inbox.
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
      <ScrollAnimation variants={scaleIn} className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl" />
        <div className="relative animate-float">
          <NewsHero className="w-full h-auto drop-shadow-2xl" />
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default HomePageIntro;
