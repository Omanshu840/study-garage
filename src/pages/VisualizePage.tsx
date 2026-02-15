import { useParams } from "react-router-dom";
import { StudyModeTabs } from "../components/StudyModeTabs";
import { VisualizationRenderer } from "../components/VisualizationRenderer";
import { getChapter } from "../data/helpers";
import { Card } from "../components/ui/card";

export function VisualizePage() {
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
      <div className="grid gap-4 xl:grid-cols-2">
        {chapter.visualize.map((item) => (
          <VisualizationRenderer key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
