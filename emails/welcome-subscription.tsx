import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import { Clock } from "lucide-react";
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";
  
  interface WelcomeEmailProps {
    userFirstName?: string;
  }
  
  export const WelcomeEmail = ({ userFirstName = "there" }: WelcomeEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Thank you for subscribing - Your AI-Powered News Intelligence Platform</Preview>
        <Body style={main}>
          <Container style={container}>
            {/* Header */}
            <Section style={headerSection}>
              <img
                src={`${baseUrl}/clocker-icon.svg`}
                alt="NewsClocker Logo"
                width="40"
                height="40"
                style={logo}
              />
              <Heading style={brandStyles}>Welcome to NewsClocker!</Heading>
            </Section>
  
            {/* Welcome Message */}
            <Section style={section}>
              <Text style={text}>Hi {userFirstName},</Text>
              <Text style={text}>
                Thank you for subscribing! We're excited to help you stay informed with AI-powered news insights tailored to your interests.
              </Text>
            </Section>
  
            <Hr style={hr} />
  
            {/* Getting Started Guide */}
            <Section style={section}>
              <Heading as="h2" style={subheading}>
                Getting Started with Your News Subscription
              </Heading>
              
              <Text style={stepHeading}>Here's how to set up your personalized news insights:</Text>
              
              <div style={stepContainer}>
                <Text style={step}>
                  <strong>1. Configure Your Search</strong>
                  <br />
                  Enter your keywords and customize your AI prompt in the search settings
                </Text>
  
                <Text style={step}>
                  <strong>2. Retrieve News</strong>
                  <br />
                  Click "Search News" to get the latest relevant articles
                </Text>
  
                <Text style={step}>
                  <strong>3. Generate AI Insights</strong>
                  <br />
                  Click "Execute Your Prompt" to get AI-powered analysis
                </Text>
  
                <Text style={step}>
                  <strong>4. Export and Save</strong>
                  <br />
                  Generate PDF reports and save insights to your mailbox
                </Text>
  
                <Text style={step}>
                  <strong>5. Schedule Delivery</strong>
                  <br />
                  Save your settings to receive regular AI insights on your schedule
                </Text>
              </div>
            </Section>
  
            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button
                // pX={20}
                // pY={12}
                style={button}
                href={`${baseUrl}/workspace`}
              >
                Set Up Your First Subscription
              </Button>
            </Section>
  
            <Hr style={hr} />
  
            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                Need help? Contact our support team at{" "}
                <Link href="mailto:contact@newsclocker.com" style={link}>
                contact@newsclocker.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  // Styles
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  };
  
  const headerSection = {
    padding: "10px 32px",
    textAlign: "center" as const,
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const heading = {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: "16px 0",
  };
  
  const section = {
    padding: "5px 32px",
  };
  
  const text = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };
  
  const stepHeading = {
    ...text,
    fontWeight: "600",
    marginBottom: "16px",
  };
  
  const stepContainer = {
    marginTop: "12px",
  };
  
  const step = {
    ...text,
    marginBottom: "12px",
  };
  
  const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
  };
  
  const button = {
    backgroundColor: "#2563eb",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
  };
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };
  
  const subheading = {
    color: "#1a1a1a",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: "5px 0",
  };

  const footer = {
    padding: "0 32px",
    textAlign: "center" as const,
  };
  
  const footerText = {
    ...text,
    fontSize: "14px",
    textAlign: "center" as const,
  };
  
  const link = {
    color: "#2563eb",
    textDecoration: "underline",
  };
  
const brandStyles = {
  fontSize: "24px",
  fontWeight: "bold",
  background: "#2563eb",
  color: "white",
  padding: "4px 8px",
  borderRadius: "4px",
};

  export default WelcomeEmail;