import { Link } from "react-router-dom";
import { Subject } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link to={`/${subject.subjectId}`}>
      <Card className="group h-full transition hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader>
          <Badge className="w-fit bg-accent/20 text-ink dark:bg-accent/30 dark:text-white">
            Subject
          </Badge>
          <CardTitle className="text-xl">{subject.subjectName}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-ink/70 dark:text-white/70">
          {subject.chapters.length} chapters available
        </CardContent>
      </Card>
    </Link>
  );
}
