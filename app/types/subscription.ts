export type Language = {
    code: string;
    name: string;
  };
  
  export type DateRange = 'any_time' | 'past_hour' | 'past_24_hours' | 'past_week' | 'past_month' | 'past_year';
  
  export type Frequency = 'every_12_hour' | 'every_day' | 'every_week';
  
  export interface NewsSubscription {
    id: string;
    userId: string;
    keywords: string[];
    language: string;
    dateRange: DateRange;
    active: boolean;
    frequency: Frequency;
    timeToSend: string;
    nextRunTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface NewsSearchResult {
    title: string;
    link: string;
    snippet: string;
    date: string;
    source: string;
    imageUrl: string;
    position: number;
  }