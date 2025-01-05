import HeroScrollAnimation from "@/components/hero/hero-scroll-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {};

const HomePageIntro = (props: Props) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* <ScrollAnimation variants={slideIn} custom="left"> */}
      <div className="text-left space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Your All-in-One AI-Powered{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800">
            News Intelligence
          </span>
        </h1>
        <p className="text-xl text-blue-100 max-w-xl">
          Transform how you consume news with AI-powered insight, personalized
          subscriptions, and intelligent analysis delivered right to your inbox.
        </p>
        <p className="text-xl text-blue-100 max-w-xl">
          Select your preferred news sources in a single platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/workspace">
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
      {/* </ScrollAnimation> */}
      <HeroScrollAnimation />
    </div>
  );
};

export default HomePageIntro;
