"use server";

import { SearchParams } from "@/app/types/search";
import { SerperDateRangeInputMap } from "@/lib/constant";
import searchNewsClient from "@/app/services/search-news-services";

export async function searchNews(params: SearchParams) {
  let newsSourcesFilter = "";

  if (params.newsSources) {
    const newsSources = params.newsSources.toSorted((a, b) =>
      a.localeCompare(b)
    );
    const site_with_url = newsSources.map((url) => `site:${url.toLowerCase()}`);
    newsSourcesFilter = site_with_url.join(" OR ");
  }
  const q =
    params.keywords
      .toLowerCase()
      .split(",")
      .sort((a, b) => a.localeCompare(b))
      .join(" OR ") +
    " " +
    newsSourcesFilter;

  console.info(`INFO: Search News Query:${q}`);

  const tbs = SerperDateRangeInputMap[params.dateRange];

  const payLoad = {
    q,
    tbs,
    gl: params.country,
    hl: params.language,
    num: 50,
  };

  const response = await searchNewsClient.get({
    params: payLoad,
  });

  return response;
}
