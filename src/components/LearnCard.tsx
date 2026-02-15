import { LearnItem } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const typeLabels: Record<LearnItem["type"], string> = {
  summary: "Summary",
  "key-concepts": "Key Concepts",
  "note-card": "Quick Note",
  bullets: "Bullet Points",
};

export function LearnCard({ item }: { item: LearnItem }) {
  const content = Array.isArray(item.content) ? item.content : [item.content];

  return (
    <Card>
      <CardHeader>
        <Badge className="w-fit bg-accent/20 text-ink dark:bg-accent/30 dark:text-white">
          {typeLabels[item.type]}
        </Badge>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-ink/70 dark:text-white/70">
        {item.type === "bullets" || item.type === "key-concepts" ? (
          <ul className="space-y-2">
            {content.map((entry) => (
              <li key={entry} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{entry}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{content[0]}</p>
        )}
      </CardContent>
    </Card>
  );
}
