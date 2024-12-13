import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function FormSection({
  title,
  children,
  className,
  ...props
}: Readonly<FormSectionProps>) {
  return (
    <div
      className={cn("space-y-4 rounded-lg border p-4", className)}
      {...props}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
