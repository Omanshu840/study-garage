import { useParams } from "react-router-dom";
import { StudyModeTabs } from "../components/StudyModeTabs";
import { VisualizationRenderer } from "../components/VisualizationRenderer";
import { useStudyData } from "../data/helpers";
import { Card } from "../components/ui/card";

export function VisualizePage() {
  const { subjectId, chapterId } = useParams();
  const { getChapter, isLoading, error } = useStudyData();
  const chapter = subjectId && chapterId ? getChapter(subjectId, chapterId) : null;

  if (isLoading) {
    return (
      <Card>
        <p className="text-sm">Loading chapter...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm">Unable to load chapter. {error}</p>
      </Card>
    );
  }

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
