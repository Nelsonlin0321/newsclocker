// import { NewsSubscription } from "@prisma/client";

// export const mockSubscriptions: NewsSubscription[] = [
//   {
//     id: "1",
//     name: "AI Trend",
//     userId: "user1",
//     keywords: ["Artificial Intelligence", "Machine Learning"],
//     language: "en",
//     dateRange: "past_24_hours",
//     active: true,
//     frequency: "every_day",
//     timeToSend: "09:00",
//     timezone: "America/New_York",
//     nextRunTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     status: "COMPLETED",
//     newsSources: [],
//     country: "us",
//   },
//   {
//     id: "2",
//     userId: "user1",
//     name: "Blockchain",
//     keywords: ["Blockchain", "Cryptocurrency"],
//     language: "en",
//     dateRange: "past_week",
//     active: false,
//     frequency: "every_week",
//     timeToSend: "02:00",
//     nextRunTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     timezone: "America/New_York",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     status: "COMPLETED",
//     newsSources: [],
//     country: "us",
//   },
// ];

const mockNewsSearchResults = [
  {
    title:
      "Tesla Stock Jumps. Trump Might Not Collect Autonomous Driving Crash Data.",
    link: "https://www.barrons.com/articles/tesla-stock-price-analyst-targets-69855346",
    snippet:
      "Tesla stock rebounded Friday after falling back from all-time highs in the previous session, as it looked to reach another record close.",
    date: "9 hours ago",
    source: "Barron's",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGVS6r6-ABqYFGVjMCpug0Q-YJQ6GitWY-ugvZX1fL7m4N5wjd2TENtBkdw&s",
    position: 1,
  },
  {
    title:
      "Here's How Much $1,000 Invested In Tesla Stock Today Will Be Worth If Cathie Wood's Price Prediction Comes True In 2029",
    link: "https://www.benzinga.com/24/12/42486618/heres-how-much-1000-invested-in-tesla-stock-today-will-be-worth-if-cathie-woods-price-prediction-comes-true-in-2029",
    snippet:
      "Tesla Inc. TSLA+2.00%. Get Free Report. investors, including Ark Invest, are benefitting as the electric vehicle stock recently hit new all-time highs and...",
    date: "14 hours ago",
    source: "Benzinga",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgJH5aTh5U2IsvnynmKNkw7Mw7UPrGVfvhfniXoQ8pGFIBSQQV9KORWihVA&s",
    position: 2,
  },
  {
    title: "Tesla's Meteoric Rise: Why $1K a Share Isn't So Crazy",
    link: "https://finance.yahoo.com/news/teslas-meteoric-rise-why-1k-191500862.html",
    snippet:
      "Investors can leverage several different methods to determine long-term price targets. Using these methods on Tesla, the stock is amid a historical breakout...",
    date: "10 hours ago",
    source: "Yahoo Finance",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQDJO319_3RfwPeVVrp0SXKy-19vHoYnvHRgxxfKz8ceAIF_BZ46O-R470pQ&s",
    position: 3,
  },
  {
    title:
      "Cathie Wood Sells $15.3 Million Of Tesla, Buys This Surging Drone Stock",
    link: "https://www.investors.com/news/cathie-wood-ark-invest-tesla-archer-aviation-tsla-achr-price-hike/",
    snippet:
      "Cathie Wood loads up on drone maker Archer Aviation amid price hikes, defense partnership. Ark Invest offloaded some Tesla stock.",
    date: "8 hours ago",
    source: "Investor's Business Daily",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp9jA2V2WHaa5mtJ5SfJfPwEh0QT1Sgvr5YnTgjM-NKdodlJPCHCQ28H97A&s",
    position: 4,
  },
  {
    title: "Tesla (TSLA) Price Prediction and Forecast",
    link: "https://247wallst.com/forecasts/2024/12/13/tesla-tsla-price-prediction-and-forecast/",
    snippet:
      "The consensus 12-month price target for Tesla from over 50 different analysts is $212.00 per share, which would calculate year-over-year growth estimates at -...",
    date: "15 hours ago",
    source: "24/7 Wall St.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_iS7q50VKlBFHQz-d0kZegrHyRK0xdMNsVXD43oLiUUVrpM6NXgkBY3XvkA&s",
    position: 5,
  },
  {
    title:
      "If You'd Invested $10,000 in Tesla Stock 5 Years Ago, Here's How Much You'd Have Today",
    link: "https://www.aol.com/youd-invested-10-000-tesla-105900572.html",
    snippet:
      "CEO Elon Musk's antics notwithstanding, Tesla (NASDAQ: TSLA) has been one of the most phenomenal stocks in recent years. The company was founded in 2003,...",
    date: "15 hours ago",
    source: "AOL.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMvU0v3FwCd2eNhTaRfYIXLTDKbpATqAIAk_21OkxBnbKIPgE22hqCDjgsQ&s",
    position: 6,
  },
  {
    title: "Elon Musk’s political influence pushes Tesla stock to new heights",
    link: "https://www.cbtnews.com/elon-musks-political-influence-pushes-tesla-stock-to-new-heights/",
    snippet:
      "Tesla's stock surged to $424.77, and Elon Musk's political involvement will likely influence the auto industry and federal regulations.",
    date: "14 hours ago",
    source: "CBT News",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlJhqe07BHWWeMD5g-MvzGO35MntbZjKQ1_myT6OBux1apDrAT6vi00Z8xw&s",
    position: 7,
  },
  {
    title:
      "Apple Stock vs. Tesla Stock: Billionaires Are Buying One and Selling the Other Ahead of 2025",
    link: "https://www.fool.com/investing/2024/12/13/apple-stock-tesla-stock-billionaires-buy-and-sell/",
    snippet:
      "Investors can use Forms 13F to track the stocks hedge fund billionaires buy and sell on a quarterly basis. Apple has brand authority and pricing power,...",
    date: "21 hours ago",
    source: "The Motley Fool",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1l5VboMS81YNPZW4G1vgOAcsL1BM_XkYxkfZQc5GEZd9Dol8wxMYu77XjHw&s",
    position: 8,
  },
  {
    title:
      "Tesla shares rally as investors anticipate growth after Trump victory",
    link: "https://www.euronews.com/business/2024/12/13/teslas-shares-in-meteoric-rally-after-trumps-us-election-victory",
    snippet:
      "Tesla's stock regains popularity as investors expect its Robotaxi and FSD technology to drive another phase of growth acceleration. The stunning performance...",
    date: "22 hours ago",
    source: "Euronews.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1DSd0wsOEtnriTGCxJ4QHQmr1cNScFmC0D8UzaBHuO3gTOa0mwg5MV5kxA&s",
    position: 9,
  },
  {
    title: "Tesla Stock Hits $420: A Milestone Packed with Meme Significance",
    link: "https://bravenewcoin.com/insights/tesla-stock-hits-420-a-milestone-packed-with-meme-significance",
    snippet:
      "Tesla's stock (TSLA) surged to $420 yesterday, hitting a price that resonates deeply within the company's culture and its CEO Elon Musk's colorful history.",
    date: "16 hours ago",
    source: "Brave New Coin",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHvco8Mo7OW70U1vOuer8hKbIwGrq36lDaMH7u2t7FMfQJWznoar3L11rBNA&s",
    position: 10,
  },
];

export const mockNewsSearchResponse = {
  searchParameters: {
    q: "tesla",
    gl: "us",
    hl: "en",
    type: "news",
    num: 20,
    tbs: "qdr:d",
    engine: "google",
  },
  news: mockNewsSearchResults,
  credits: 1,
};
