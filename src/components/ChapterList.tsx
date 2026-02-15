import { Link, useParams } from "react-router-dom";
import { Chapter } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const { subjectId } = useParams();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {chapters.map((chapter) => (
        <Link
          key={chapter.chapterId}
          to={`/${subjectId}/${chapter.chapterId}/learn`}
        >
          <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader>
              <Badge className="w-fit bg-ink/10 text-ink dark:bg-white/10 dark:text-white">
                Chapter
              </Badge>
              <CardTitle className="text-[1.05rem] leading-snug">{chapter.chapterName}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink/70 dark:text-white/70">
              {chapter.learn.length} learn items · {chapter.visualize.length} visual
              items · {chapter.flashcards.length} flashcards · {chapter.quiz.length} quiz questions
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
