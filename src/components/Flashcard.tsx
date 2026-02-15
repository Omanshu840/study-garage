import { useState } from "react";
import { FlashcardItem } from "../types";
import { Badge } from "./ui/badge";

export function Flashcard({ item }: { item: FlashcardItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      className="relative w-full rounded-3xl border border-ink/10 bg-white/80 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <Badge className="bg-accent/20 text-ink dark:bg-accent/30 dark:text-white">
          {item.difficulty ?? "medium"}
        </Badge>
        <span className="text-xs text-ink/60 dark:text-white/60">
          Tap to {flipped ? "see question" : "reveal answer"}
        </span>
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-ink/60 dark:text-white/60">
          {flipped ? "Answer" : "Question"}
        </p>
        <p className="mt-3 text-lg font-semibold text-ink dark:text-white">
          {flipped ? item.back : item.front}
        </p>
      </div>
    </button>
  );
}
