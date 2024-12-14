export type SearchParams = {
  keywords: string;
  country: string;
  language: string;
  dateRange: string;
  newsSources?: string[];
};

export interface NewsSearchResult {
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  imageUrl: string;
  position: number;
}

interface SearchAPIParams {
  q: string;
  gl?: string;
  hl?: string;
  type?: string;
  tbs?: string;
  engine: string;
  num?: number;
}
export interface NewsSearchResultResponse {
  searchParameters: SearchAPIParams;
  news: NewsSearchResult[];
  credits: number;
}
