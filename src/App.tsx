import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { StudyHome } from "./pages/StudyHome";
import { SubjectPage } from "./pages/SubjectPage";
import { ChapterOverview } from "./pages/ChapterOverview";
import { LearnPage } from "./pages/LearnPage";
import { VisualizePage } from "./pages/VisualizePage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { QuizPage } from "./pages/QuizPage";
import { NotFound } from "./pages/NotFound";
import { StudyLayout } from "./pages/StudyLayout";
import { getChapter, getSubject } from "./data/helpers";

type Breadcrumb = {
  label: string;
  to?: string;
};

const modeLabels: Record<string, string> = {
  learn: "Learn",
  visualize: "Visualize",
  flashcards: "Flashcards",
  quiz: "Quiz",
};

function BreadcrumbsOutlet() {
  const { subjectId, chapterId } = useParams();
  const location = useLocation();

  const crumbs: Breadcrumb[] = [{ label: "Home", to: "/" }];
  const subject = subjectId ? getSubject(subjectId) : null;
  const chapter = subjectId && chapterId ? getChapter(subjectId, chapterId) : null;

  if (subjectId) {
    crumbs.push({
      label: subject?.subjectName ?? "Subject",
      to: chapterId ? `/${subjectId}` : undefined,
    });
  }

  if (chapterId) {
    crumbs.push({
      label: chapter?.chapterName ?? "Chapter",
      to: location.pathname.split("/").length > 4 ? `/${subjectId}/${chapterId}` : undefined,
    });
  }

  const currentMode = location.pathname.split("/")[4];
  if (currentMode && modeLabels[currentMode]) {
    crumbs.push({ label: modeLabels[currentMode] });
  }

  if (location.pathname === "/") {
    crumbs[0] = { label: "Home" };
  }

  return (
    <div className="space-y-4">
      <nav aria-label="Breadcrumb">
        <ol className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-ink/65 dark:text-white/65">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2 whitespace-nowrap">
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="rounded-full border border-ink/10 bg-white/65 px-3 py-1.5 font-medium transition hover:border-ink/20 hover:text-ink dark:border-white/15 dark:bg-white/5 dark:hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "rounded-full bg-ink px-3 py-1.5 font-medium text-white dark:bg-white dark:text-ink"
                        : undefined
                    }
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && <span aria-hidden="true" className="text-ink/35 dark:text-white/35">•</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StudyLayout />}>
        <Route element={<BreadcrumbsOutlet />}>
          <Route index element={<StudyHome />} />
          <Route path=":subjectId" element={<SubjectPage />} />
          <Route path=":subjectId/:chapterId" element={<ChapterOverview />} />
          <Route path=":subjectId/:chapterId/learn" element={<LearnPage />} />
          <Route path=":subjectId/:chapterId/visualize" element={<VisualizePage />} />
          <Route path=":subjectId/:chapterId/flashcards" element={<FlashcardsPage />} />
          <Route path=":subjectId/:chapterId/quiz" element={<QuizPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
