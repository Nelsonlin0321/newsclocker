import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mail - NewsAlert Pro",
  description: "View your AI-powered news insights",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function MailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
