import { NewsSearchResultResponse } from "@/app/types/search";
import APIClient from "./api-client";

export default new APIClient<NewsSearchResultResponse>("/news-search");
