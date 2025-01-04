"use server";

import apiClient from "@/app/services/scrape-url-services";

export async function scrapeUrls(urls: string[]) {
  try {
    const response = await apiClient.post(urls);
    return response;
  } catch (error) {
    console.error("Error scraping URLs:", error);
    throw new Error("Failed to scrape URLs");
  }
}

// "use server";
// import axios from "axios";

// export async function scrapeUrls(urls: string[]): Promise<string[]> {
//   try {
//     const response = await axios.post(
//       "/api/v1/scrape/",
//       urls,
//       {
//         headers: {
//           "X-API-Key": "",
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error scraping content:", error);
//     throw new Error("Failed to scrape content");
//   }
// }
