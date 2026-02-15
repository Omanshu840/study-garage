import { SubjectCard } from "../components/SubjectCard";
import { getSubjects } from "../data/helpers";

export function StudyHome() {
  const subjects = getSubjects();

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
