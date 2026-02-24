import { useParams } from "react-router-dom";
import { ChapterList } from "../components/ChapterList";
import { useStudyData } from "../data/helpers";
import { Card } from "../components/ui/card";

export function SubjectPage() {
  const { subjectId } = useParams();
  const { getSubject, isLoading, error } = useStudyData();
  const subject = subjectId ? getSubject(subjectId) : null;

  if (isLoading) {
    return (
      <Card>
        <p className="text-sm">Loading subject...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm">Unable to load subject. {error}</p>
      </Card>
    );
  }

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
