import { studyData } from "./index";

export function getSubjects() {
  return studyData.subjects;
}

export function getSubject(subjectId: string) {
  return studyData.subjects.find((subject) => subject.subjectId === subjectId);
}

export function getChapter(subjectId: string, chapterId: string) {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  return subject.chapters.find((chapter) => chapter.chapterId === chapterId);
}
