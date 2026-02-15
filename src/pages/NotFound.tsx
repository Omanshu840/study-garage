import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md text-center">
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-ink/70 dark:text-white/70">
          The study route you requested doesn't exist yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90 dark:bg-white dark:text-ink"
        >
          Back to Study
        </Link>
      </Card>
    </div>
  );
}
