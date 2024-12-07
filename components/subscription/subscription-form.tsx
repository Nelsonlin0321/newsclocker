"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languages } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  keywords: z.string().min(1, "At least one keyword is required"),
  language: z.string().min(1, "Language is required"),
  dateRange: z.enum(["any_time", "past_hour", "past_24_hours", "past_week", "past_month", "past_year"]),
  active: z.boolean(),
  frequency: z.enum(["every_12_hour", "every_day", "every_week"]),
  timeToSend: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
})

type SubscriptionFormData = z.infer<typeof subscriptionSchema>

interface SubscriptionFormProps {
  id: string
}

export function SubscriptionForm({ id }: SubscriptionFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      dateRange: "past_24_hours",
      frequency: "every_day",
      timeToSend: "09:00",
      language:"en"
    },
  })

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call
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
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.language && (
            <p className="mt-1 text-sm text-red-500">{errors.language.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any_time">Any Time</SelectItem>
                  <SelectItem value="past_hour">Past Hour</SelectItem>
                  <SelectItem value="past_24_hours">Past 24 Hours</SelectItem>
                  <SelectItem value="past_week">Past Week</SelectItem>
                  <SelectItem value="past_month">Past Month</SelectItem>
                  <SelectItem value="past_year">Past Year</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.dateRange && (
            <p className="mt-1 text-sm text-red-500">{errors.dateRange.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="every_12_hour">Every 12 Hours</SelectItem>
                  <SelectItem value="every_day">Every Day</SelectItem>
                  <SelectItem value="every_week">Every Week</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.frequency && (
            <p className="mt-1 text-sm text-red-500">{errors.frequency.message}</p>
          )}
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

        {/* <div className="flex items-center space-x-2">
          <Switch id="active" {...register("active")} />
          <Label htmlFor="active">Active</Label>
        </div> */}
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