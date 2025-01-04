import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessStoryProps {
  name: string;
  role: string;
  company: string;
  story: string;
  result: string;
  // image: string;
}

export function SuccessStoryCard({
  name,
  role,
  company,
  story,
  result,
}: SuccessStoryProps) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            {/* <AvatarImage src={image} alt={name} /> */}
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">{story}</p>
          <p className="font-medium text-primary">{result}</p>
        </div>
      </CardContent>
    </Card>
  );
}
