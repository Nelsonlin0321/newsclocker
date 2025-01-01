import { Button } from "@/components/ui/button";
import { Clock, Globe, Sparkles, Users, MessageSquare, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming News Intelligence
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              NewsClocker combines AI technology with personalized news delivery to help professionals stay informed and make better decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              We're on a mission to revolutionize how professionals consume and understand news through AI-powered insights and personalized delivery.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {missionPoints.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    {point.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose NewsClocker</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your News Experience?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who trust NewsClocker for their daily news intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const missionPoints = [
  {
    title: "Global Reach",
    description: "Connecting users with news sources worldwide for comprehensive coverage.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "AI Innovation",
    description: "Leveraging cutting-edge AI to deliver personalized insights.",
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "User Focus",
    description: "Building tools that adapt to how professionals consume news.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
];

const features = [
  {
    title: "Real-time Processing",
    description: "Our AI analyzes news as it happens, ensuring you never miss critical updates.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Smart Insights",
    description: "Advanced AI algorithms transform complex news into actionable intelligence.",
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Community-Driven",
    description: "Share and discover news analysis prompts from industry professionals.",
    icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Customizable Delivery",
    description: "Get news insights delivered when and how you want them.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Scalable Solutions",
    description: "From individuals to enterprises, our platform grows with your needs.",
    icon: <Rocket className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Continuous Innovation",
    description: "Regular updates and new features based on user feedback and needs.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
];