import { SubjectCard } from "../components/SubjectCard";
import { Card } from "../components/ui/card";
import { useStudyData } from "../data/helpers";

export function StudyHome() {
  const { subjects, isLoading, error } = useStudyData();

  if (isLoading) {
    return (
      <Card>
        <p className="text-sm">Loading subjects...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm">Unable to load subjects. {error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.subjectId} subject={subject} />
        ))}
      </div>
    </div>
  );
}
