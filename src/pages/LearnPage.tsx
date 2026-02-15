import { useParams } from "react-router-dom";
import { StudyModeTabs } from "../components/StudyModeTabs";
import { LearnCard } from "../components/LearnCard";
import { getChapter } from "../data/helpers";
import { Card } from "../components/ui/card";

export function LearnPage() {
  const { subjectId, chapterId } = useParams();
  const chapter = subjectId && chapterId ? getChapter(subjectId, chapterId) : null;

  if (!chapter) {
    return (
      <Card>
        <p className="text-sm">Chapter not found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StudyModeTabs />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chapter.learn.map((item) => (
          <LearnCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
