import { Link, useLocation, useParams } from "react-router-dom";
import { cn } from "../lib/utils";

const modes = [
  { id: "learn", label: "Learn" },
  { id: "visualize", label: "Visualize" },
  { id: "flashcards", label: "Flashcards" },
  { id: "quiz", label: "Quiz" },
];

export function StudyModeTabs() {
  const { subjectId, chapterId } = useParams();
  const location = useLocation();

  if (!subjectId || !chapterId) return null;

  return (
    <div className="sticky top-2 z-20">
      <div className="glass rounded-2xl border border-ink/10 p-1.5 dark:border-white/10">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          {modes.map((mode) => {
            const to = `/${subjectId}/${chapterId}/${mode.id}`;
            const active = location.pathname === to;
            return (
              <Link
                key={mode.id}
                to={to}
                className={cn(
                  "min-w-[88px] rounded-xl px-3 py-2 text-center text-xs font-medium transition",
                  active
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink dark:text-white/70 dark:hover:bg-white/10"
                )}
              >
                {mode.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
