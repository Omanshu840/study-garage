import { useParams } from "react-router-dom";
import { StudyModeTabs } from "../components/StudyModeTabs";
import { QuizEngine } from "../components/QuizEngine";
import { getChapter } from "../data/helpers";
import { Card } from "../components/ui/card";

export function QuizPage() {
  const { subjectId, chapterId } = useParams();
  const chapter = subjectId && chapterId ? getChapter(subjectId, chapterId) : null;

  if (!chapter) {
    return (
      <Card>
        <p className="text-sm">Chapter not found.</p>
      </Card>
    );
  }

  if (chapter.quiz.length === 0) {
    return (
      <Card>
        <p className="text-sm">No quiz questions available.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StudyModeTabs />
      <QuizEngine items={chapter.quiz} />
    </div>
  );
}
