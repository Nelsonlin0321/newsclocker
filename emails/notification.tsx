import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Column,
  Row,
  Markdown,
} from "@react-email/components";
import { Mail, NewsSubscription } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { NewsSearchResult } from "@/app/types/search";
import { exampleMail, exampleSubscription } from "@/lib/constant";
import { Clock3 } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const baseStyles = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const buttonStyles = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "16px auto",
  width: "fit-content",
};

const brandStyles = {
  fontSize: "24px",
  fontWeight: "bold",
  background: "linear-gradient(to right, #2563eb, rgba(37, 99, 235, 0.8))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const headerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 0",
  borderBottom: "1px solid #e5e7eb",
};

const logoStyles = {
  width: "24px",
  height: "24px",
  color: "#2563eb",
};

const Notification = ({
  mail = exampleMail,
  subscription = exampleSubscription,
}: {
  mail: Mail;
  subscription: NewsSubscription;
}) => {
  const searchResult = mail.searchResult as unknown as {
    news: NewsSearchResult[];
  };

  // Get first image URL for header
  // const headerImageUrl = searchResult.news[0]?.imageUrl;

  const headerImageUrl = undefined;

  return (
    <Html>
      <Head />
      <Preview>{mail.title}</Preview>
      <Body style={baseStyles}>
        <Container>
          {/* <Section style={headerStyles}> */}
          <div style={headerStyles}>
            <Clock3 style={logoStyles} />
            <Text style={brandStyles}>NewsClocker</Text>
          </div>
          {/* </Section> */}
        </Container>
        <Container>
          <Section style={{ padding: "20px 0" }}>
            <Heading
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#2563eb",
                marginBottom: "16px",
              }}
            >
              {`${subscription.name} News Insights: ${mail.title}`}
              {/* {`${baseUrl}`} */}
            </Heading>
            {headerImageUrl && (
              <Img
                src={headerImageUrl}
                alt="Header Image"
                width="600"
                height="300"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
            )}
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "5px 0" }} />

          {/* Keywords Section */}
          <Section>
            <Text style={{ color: "#6b7280", fontSize: "14px" }}>
              Tracking keywords: {subscription.keywords.join(", ")}
            </Text>

            <Text style={{ color: "#808080" }}>
              {mail.createdAt.toDateString()}
            </Text>
            <Text style={{ fontSize: "14px", color: "#9ca3af" }}>
              Download{" "}
              <Link
                href={mail.pdfUrl}
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                PDF
              </Link>
            </Text>
          </Section>

          {/* AI Insights Section */}
          <Section>
            <Markdown>{mail.content.split("Reference Links")[0]}</Markdown>
          </Section>

          {/* Read More Articles Button */}
          <Link
            href={`${baseUrl}/mail/${subscription.id}`}
            style={buttonStyles}
          >
            Read it on AI Insight MailBox
          </Link>

          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

          {/* News Sources Section */}
          <Section style={{ padding: "20px 0" }}>
            <Heading
              as="h2"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#2563eb",
                marginBottom: "16px",
              }}
            >
              Source Articles
            </Heading>

            {searchResult.news.slice(0, 5).map((article, index) => (
              <Section key={index} style={{ marginBottom: "24px" }}>
                <Link href={article.link}>
                  <Row>
                    <Column style={{ width: "150px", paddingRight: "16px" }}>
                      <Img
                        src={article.imageUrl}
                        alt={article.title}
                        width="150"
                        height="100"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </Column>
                    <Column>
                      <Text
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {article.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          margin: "8px 0",
                        }}
                      >
                        {article.snippet}
                      </Text>
                      <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {article.source} •{" "}
                        {formatDistanceToNow(new Date(article.date), {
                          addSuffix: true,
                        })}
                      </Text>
                    </Column>
                  </Row>
                </Link>
              </Section>
            ))}
          </Section>

          <Link
            href={`${baseUrl}/mail/${subscription.id}`}
            style={buttonStyles}
          >
            Read more news
          </Link>

          {/* Footer Section */}
          <Section style={{ padding: "20px 0", textAlign: "center" }}>
            <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />
            <Text
              style={{ fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}
            >
              <Link
                href={`${baseUrl}/workspace/news-subscription/${subscription.id}`}
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Tailor Your Subscriptions
              </Link>
              {" • "}
              <Link
                href={`${baseUrl}/workspace`}
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Manage Subscription
              </Link>
              {" • "}
              <Link
                href={`${baseUrl}/unsubscribe/${subscription.id}`}
                style={{ color: "#6b7280", textDecoration: "underline" }}
              >
                Unsubscribe This News Insight
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default Notification;
