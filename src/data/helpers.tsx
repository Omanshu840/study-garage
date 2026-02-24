import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import rawManifest from "./subjects.json";
import type { Subject, SubjectManifest } from "../types";

type StudyDataContextValue = {
  subjects: Subject[];
  isLoading: boolean;
  error: string | null;
  getSubject: (subjectId: string) => Subject | null;
  getChapter: (subjectId: string, chapterId: string) => Subject["chapters"][number] | null;
};

const StudyDataContext = createContext<StudyDataContextValue | null>(null);

let cachedSubjects: Subject[] | null = null;
let loadingPromise: Promise<Subject[]> | null = null;

async function loadSubjectsFromLinks() {
  if (cachedSubjects) return cachedSubjects;
  if (loadingPromise) return loadingPromise;

  const manifest = rawManifest as SubjectManifest;

  loadingPromise = Promise.all(
    manifest.subjects.map(async ({ subjectLink }) => {
      const response = await fetch(subjectLink);
      if (!response.ok) {
        throw new Error(`Failed to fetch subject data from ${subjectLink}`);
      }
      return (await response.json()) as Subject;
    }),
  )
    .then((subjects) => {
      cachedSubjects = subjects;
      return subjects;
    })
    .finally(() => {
      loadingPromise = null;
    });

  return loadingPromise;
}

export function StudyDataProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>(cachedSubjects ?? []);
  const [isLoading, setIsLoading] = useState(!cachedSubjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (cachedSubjects) {
      setSubjects(cachedSubjects);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    loadSubjectsFromLinks()
      .then((loadedSubjects) => {
        if (!isMounted) return;
        setSubjects(loadedSubjects);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const message = err instanceof Error ? err.message : "Failed to load subjects.";
        setError(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<StudyDataContextValue>(() => {
    const getSubject = (subjectId: string) =>
      subjects.find((subject) => subject.subjectId === subjectId) ?? null;

    const getChapter = (subjectId: string, chapterId: string) => {
      const subject = getSubject(subjectId);
      if (!subject) return null;
      return subject.chapters.find((chapter) => chapter.chapterId === chapterId) ?? null;
    };

    return {
      subjects,
      isLoading,
      error,
      getSubject,
      getChapter,
    };
  }, [subjects, isLoading, error]);

  return <StudyDataContext.Provider value={value}>{children}</StudyDataContext.Provider>;
}

export function useStudyData() {
  const context = useContext(StudyDataContext);
  if (!context) {
    throw new Error("useStudyData must be used inside StudyDataProvider.");
  }
  return context;
}
