"use client";
import { ScrollAnimation } from "@/components/animations/scroll-animation";
import { NewsHero } from "@/components/hero/news-hero";
import { scaleIn } from "@/lib/animation-variants";

const HeroScrollAnimation = () => {
  return (
    <ScrollAnimation variants={scaleIn} className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl" />
      <div className="relative animate-float">
        <NewsHero className="w-full h-auto drop-shadow-2xl" />
      </div>
    </ScrollAnimation>
  );
};

export default HeroScrollAnimation;
