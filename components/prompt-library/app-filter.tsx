"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const apps = [
  "All Apps",
  "Quiz",
  "Email",
  "Presentation",
  "Fitness",
  "Writing",
];

export function AppFilter() {
  return (
    <Select defaultValue="All Apps">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select app" />
      </SelectTrigger>
      <SelectContent>
        {apps.map((app) => (
          <SelectItem key={app} value={app}>
            {app}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
