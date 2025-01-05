export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NewsClocker",
  url: "https://newsclocker.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://newsclocker.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NewsClocker",
  url: "https://newsclocker.com",
  logo: "https://newsclocker.com/logo.png",
  sameAs: [
    "https://twitter.com/newsclocker",
    "https://linkedin.com/company/newsclocker",
  ],
};
