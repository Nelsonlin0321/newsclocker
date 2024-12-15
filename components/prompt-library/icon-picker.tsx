"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const icons = ["📝", "📰", "📊", "📈", "🔔", "📱", "💡", "🎯", "🌟", "📅"];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="text-2xl">{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="grid grid-cols-5 gap-2">
          {icons.map((icon) => (
            <Button
              key={icon}
              variant="ghost"
              className="h-10 w-10 p-0 text-xl"
              onClick={() => onChange(icon)}
            >
              {icon}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
