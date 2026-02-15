import { Link, useParams } from "react-router-dom";
import { getChapter, getSubject } from "../data/helpers";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const modes = [
  { id: "learn", label: "Learn", description: "Summaries, key concepts, and recall cards." },
  { id: "visualize", label: "Visualize", description: "Diagrams, flows, cycles, and comparisons." },
  { id: "flashcards", label: "Flashcards", description: "Flip, recall, repeat." },
  { id: "quiz", label: "Quiz", description: "Test understanding with instant feedback." },
];

export function ChapterOverview() {
  const { subjectId, chapterId } = useParams();
  const subject = subjectId ? getSubject(subjectId) : null;
  const chapter = subjectId && chapterId ? getChapter(subjectId, chapterId) : null;

  if (!subject || !chapter) {
    return (
      <Card>
        <p className="text-sm">Chapter not found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 dark:bg-white/5">
        <CardHeader>
          <Badge className="w-fit bg-accent/20 text-ink dark:bg-accent/30 dark:text-white">
            {subject.subjectName}
          </Badge>
          <CardTitle className="text-xl">{chapter.chapterName}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-ink/70 dark:text-white/70">
          Pick a mode to start learning. Each mode is tailored for a different
          kind of recall.
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {modes.map((mode) => (
          <Link key={mode.id} to={`/${subjectId}/${chapterId}/${mode.id}`}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle>{mode.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ink/70 dark:text-white/70">
                {mode.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
