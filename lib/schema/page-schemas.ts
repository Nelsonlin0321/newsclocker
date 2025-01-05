export const newsArticleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "TITLE",
  "datePublished": "DATE",
  "dateModified": "DATE",
  "publisher": {
    "@type": "Organization",
    "name": "NewsClocker",
    "logo": {
      "@type": "ImageObject",
      "url": "https://newsclocker.com/logo.png"
    }
  }
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NewsClocker",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []
}