"use client";
import { ScrollAnimation } from "@/components/animations/scroll-animation";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { fadeIn } from "@/lib/animation-variants";
import { Bell, Brain, FileText, Inbox, Share2, Sparkles } from "lucide-react";
// import { SuccessStoriesSection } from "../success-stories/success-stories-section";
type Props = {};

const FeaturesGrid = (props: Props) => {
  return (
    <>
      {" "}
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
      {/* <SuccessStoriesSection /> */}
    </>
  );
};

export default FeaturesGrid;

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
