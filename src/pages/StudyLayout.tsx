import { useLocation, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getChapter, getSubject } from "../data/helpers";

export function StudyLayout() {
  const { subjectId, chapterId } = useParams();
  const location = useLocation();

  let title = "Study Dashboard";
  let subtitle = "Choose a subject to begin a focused learning session.";

  if (subjectId && !chapterId) {
    const subject = getSubject(subjectId);
    title = subject ? subject.subjectName : "Subject";
    subtitle = "Pick a chapter to dive into learning, visualizations, flashcards, or quizzes.";
  }

  if (subjectId && chapterId) {
    const chapter = getChapter(subjectId, chapterId);
    title = chapter ? chapter.chapterName : "Chapter";
    subtitle = "Switch between modes to learn fast, visualize structure, and test recall.";
  }

  if (location.pathname.endsWith("/learn")) {
    subtitle = "Summaries, key concepts, and bullet explanations for fast recall.";
  }
  if (location.pathname.endsWith("/visualize")) {
    subtitle = "Visual flows, cycles, and comparison charts rendered from JSON.";
  }
  if (location.pathname.endsWith("/flashcards")) {
    subtitle = "Flip cards to reinforce memory with spaced repetition.";
  }
  if (location.pathname.endsWith("/quiz")) {
    subtitle = "Instant feedback and a score summary to guide revision.";
  }

  return <Layout title={title} subtitle={subtitle} />;
}
