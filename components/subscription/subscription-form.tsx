"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { languages } from "@/lib/mock-data"

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  language: z.string().min(1, "Language is required"),
  dateRange: z.enum(["any_time", "past_hour", "past_24_hours", "past_week", "past_month", "past_year"]),
  active: z.boolean(),
  frequency: z.enum(["every_12_hour", "every_day", "every_week"]),
  timeToSend: z.string().regex(/^([0-1]?\d|2[0-3]):[0-5]\d$/, "Invalid time format"),
  amOrPm: z.enum(["AM", "PM"]).optional(),
})

type SubscriptionFormData = z.infer<typeof subscriptionSchema>

interface SubscriptionFormProps {
  id: string
}

export function SubscriptionForm({ id }: Readonly<SubscriptionFormProps>) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      active: true,
      dateRange: "past_24_hours",
      frequency: "every_day",
      timeToSend: "09:00",
      amOrPm: "AM",
    },
  })

  const frequency = watch("frequency")

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsLoading(true)
    try {
      console.log(data)
      toast({
        title: "Success",
        description: "Subscription updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Subscription Name</Label>
          <Input
            id="name"
            {...register("name")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            {...register("keywords")}
            className="mt-1"
            placeholder="Enter keywords separated by commas"
          />
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select
            {...register("language")}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Select
            {...register("dateRange")}
          >
            <option value="any_time">Any Time</option>
            <option value="past_hour">Past Hour</option>
            <option value="past_24_hours">Past 24 Hours</option>
            <option value="past_week">Past Week</option>
            <option value="past_month">Past Month</option>
            <option value="past_year">Past Year</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select
            {...register("frequency")}
          >
            <option value="every_12_hour">Every 12 Hours</option>
            <option value="every_day">Every Day</option>
            <option value="every_week">Every Week</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeToSend">Time to Send</Label>
          <Input
            id="timeToSend"
            type="time"
            {...register("timeToSend")}
            className="mt-1"
          />
        </div>

        {frequency !== "every_12_hour" && (
          <div>
            <Label htmlFor="amOrPm">AM/PM</Label>
            <Select
              {...register("amOrPm")}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Select>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch id="active" {...register("active")} />
          <Label htmlFor="active">Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}