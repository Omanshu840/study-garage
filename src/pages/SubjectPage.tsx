import { useParams } from "react-router-dom";
import { ChapterList } from "../components/ChapterList";
import { getSubject } from "../data/helpers";
import { Card } from "../components/ui/card";

export function SubjectPage() {
  const { subjectId } = useParams();
  const subject = subjectId ? getSubject(subjectId) : null;

  if (!subject) {
    return (
      <Card>
        <p className="text-sm">Subject not found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/70 dark:bg-white/5">
        <p className="text-sm text-ink/70 dark:text-white/70">
          {subject.chapters.length} chapters ready for learning.
        </p>
      </Card>
      <ChapterList chapters={subject.chapters} />
    </div>
  );
}
