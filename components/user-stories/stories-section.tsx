"use client";
import { parallaxScroll } from "@/lib/animation-variants";
import { SuccessStoryCard } from "./success-story-card";
import { ScrollAnimation } from "@/components/animations/scroll-animation";

export function StoriesSection() {
  return (
    <ScrollAnimation variants={parallaxScroll(100)}>
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              See how professionals are saving time and making better decisions
              with NewsClocker
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {successStories.map((story) => (
              <SuccessStoryCard key={story.name} {...story} />
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              * Investment returns and time savings shown are based on specific
              use cases and may vary. Past performance does not guarantee future
              results.
            </p>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}

const successStories = [
  {
    name: "Alex Thompson",
    role: "Research Director",
    company: "Strategic Insights Group",
    // image: "/testimonials/alex-thompson.jpg",
    story:
      "NewsClocker revolutionized our research workflow by consolidating news from multiple sources into one platform. What used to take 4 hours of daily monitoring across different sites now takes just 30 minutes.",
    result: "Saved 87.5% of news monitoring time, improving team productivity",
  },
  {
    name: "Sarah Chen",
    role: "Investment Analyst",
    company: "Global Investments Ltd",
    // image: "/testimonials/sarah-chen.jpg",
    story:
      "Using NewsClocker's AI insights, I tracked Tesla's FSD developments and manufacturing expansion in real-time. The platform's analysis helped me identify a key market opportunity.",
    result: "Achieved 32% ROI on Tesla stock investment over 6 months",
  },
  {
    name: "Michael Rodriguez",
    role: "Crypto Fund Manager",
    company: "Digital Asset Capital",
    // image: "/testimonials/michael-rodriguez.jpg",
    story:
      "NewsClocker's comprehensive coverage of Bitcoin ETF developments and regulatory news gave me a decisive edge. The AI analysis helped predict market sentiment shifts.",
    result: "Successfully timed Bitcoin ETF approval for 45% portfolio gain",
  },
  {
    name: "Emily Watson",
    role: "PR Director",
    company: "Tech Innovations Inc",
    // image: "/testimonials/emily-watson.jpg",
    story:
      "The platform's reputation monitoring and sentiment analysis capabilities helped us proactively address potential PR challenges before they escalated.",
    result: "Improved brand sentiment by 27% through proactive management",
  },
];
