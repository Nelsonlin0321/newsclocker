import { z } from "zod";

export const NewsSearchSchema = z.object({
  keywords: z.string().min(1, "At least one keyword is required"),
  language: z.string({
    required_error: "Please select a language.",
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
  newsSources: z.array(z.string()).optional(),
});
