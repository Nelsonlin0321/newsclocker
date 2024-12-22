import { z } from "zod";

export type Language = {
  code: string;
  name: string;
};

export type DateRange =
  | "any_time"
  | "past_hour"
  | "past_24_hours"
  | "past_week"
  | "past_month"
  | "past_year";

export type Frequency = "every_12_hour" | "every_day" | "every_week";

export interface NewsSource {
  value: string;
  label: string;
}

export const NewsSubscriptionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  keywords: z.string().min(1, "At least one keyword is required"),
  language: z.string({
    required_error: "Please select a language.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  dateRange: z.enum(
    [
      "any_time",
      "past_hour",
      "past_24_hours",
      "past_week",
      "past_month",
      "past_year",
    ],
    {
      required_error: "Please select a date range.",
    }
  ),
  active: z.boolean().default(true),
  frequency: z.enum(["every_12_hour", "every_day", "every_week"], {
    required_error: "Please select a frequency.",
  }),
  timeToSend: z
    .string()
    .regex(/^([0-1]?\d|2[0-3]):[0-5]\d$/, "Invalid time format"),
  newsSources: z.array(z.string()).optional(),
  country: z
    .string({
      required_error: "Please select country.",
    })
    .default("us"),
  newsPrompt: z.string(),
});

export type NewsSubscriptionFormType = z.infer<
  typeof NewsSubscriptionFormSchema
>;

export type UpdateNewsSubscriptionForm = NewsSubscriptionFormType & {
  id: string;
};

export type CreateNewsSubscriptionForm = NewsSubscriptionFormType & {
  userId: string;
};
