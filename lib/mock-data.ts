import { NewsSubscription } from "@/app/types/subscription";


export const mockSubscriptions: NewsSubscription[] = [
  {
    id: '1',
    userId: 'user1',
    keywords: ['Artificial Intelligence', 'Machine Learning'],
    language: 'en',
    dateRange: 'past_24_hours',
    active: true,
    frequency: 'every_day',
    timeToSend: '09:00',
    amOrPm: 'AM',
    nextRunTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    keywords: ['Blockchain', 'Cryptocurrency'],
    language: 'en',
    dateRange: 'past_week',
    active: false,
    frequency: 'every_week',
    timeToSend: '02:00',
    amOrPm: 'PM',
    nextRunTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];