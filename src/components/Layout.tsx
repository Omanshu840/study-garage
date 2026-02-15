import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export function Layout({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-[#ece7e2] px-0 py-0 dark:bg-[#03070d]">
      <div className="flex min-h-screen w-full flex-col overflow-hidden border-ink/10 bg-canvas-light/95 dark:border-white/10 dark:bg-canvas/95 md:min-h-[calc(100vh-3rem)] md:border">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-grain [background-size:10px_10px] opacity-20" />
          <header className="relative z-10 flex items-center justify-between border-b border-ink/10 px-4 pb-3 pt-5 dark:border-white/10 md:px-8 md:pb-4 md:pt-6">
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/80 dark:text-white/80">
              Study Lab
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => document.body.classList.toggle("dark")}
            >
              Theme
            </Button>
          </header>

          <main className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-4 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6 w-full max-w-7xl mx-auto">
            <div className="mb-6 space-y-2 md:mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55 dark:text-white/60">
                Focus Session
              </p>
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-4xl">{title}</h1>
              {subtitle && (
                <p className="max-w-4xl text-sm leading-relaxed text-ink/70 dark:text-white/70 md:text-base">
                  {subtitle}
                </p>
              )}
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
