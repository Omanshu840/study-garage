import { useMemo, useState } from "react";
import { QuizItem } from "../types";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface AnswerState {
  selected: string[];
  submitted: boolean;
}

const typeLabels: Record<QuizItem["type"], string> = {
  mcq: "Multiple Choice",
  "true-false": "True / False",
  "multi-select": "Multi Select",
};

export function QuizEngine({ items }: { items: QuizItem[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const current = items[index];

  const state = answers[current.id] ?? { selected: [], submitted: false };

  const isCorrect = useMemo(() => {
    if (!state.submitted) return false;
    const selectedSet = new Set(state.selected);
    const correctSet = new Set(current.correctOptionIds);
    if (selectedSet.size !== correctSet.size) return false;
    for (const item of correctSet) {
      if (!selectedSet.has(item)) return false;
    }
    return true;
  }, [current, state]);

  const score = useMemo(() => {
    return items.reduce((acc, item) => {
      const stored = answers[item.id];
      if (!stored?.submitted) return acc;
      const selectedSet = new Set(stored.selected);
      const correctSet = new Set(item.correctOptionIds);
      const correct =
        selectedSet.size === correctSet.size &&
        [...correctSet].every((value) => selectedSet.has(value));
      return acc + (correct ? 1 : 0);
    }, 0);
  }, [answers, items]);

  const isFinished = items.every((item) => answers[item.id]?.submitted);

  const toggleOption = (id: string) => {
    if (state.submitted) return;
    setAnswers((prev) => {
      const currentState = prev[current.id] ?? { selected: [], submitted: false };
      let nextSelected = currentState.selected;
      if (current.type === "multi-select") {
        nextSelected = currentState.selected.includes(id)
          ? currentState.selected.filter((value) => value !== id)
          : [...currentState.selected, id];
      } else {
        nextSelected = [id];
      }
      return {
        ...prev,
        [current.id]: {
          selected: nextSelected,
          submitted: currentState.submitted,
        },
      };
    });
  };

  const submit = () => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: { ...state, submitted: true },
    }));
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="bg-ink/10 text-ink dark:bg-white/10 dark:text-white">
              {typeLabels[current.type]}
            </Badge>
            <span className="text-xs text-ink/60 dark:text-white/60">
              Question {index + 1} of {items.length}
            </span>
          </div>
          <CardTitle className="text-xl">{current.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            {current.options.map((option) => {
              const selected = state.selected.includes(option.id);
              const isCorrectOption = (current.correctOptionIds as readonly string[]).includes(option.id);
              const showFeedback = state.submitted;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "border-accent bg-accent/20"
                      : "border-ink/10 bg-white/70 dark:border-white/10 dark:bg-white/5"
                  } ${
                    showFeedback
                      ? isCorrectOption
                        ? "border-mint bg-mint/20"
                        : selected
                          ? "border-red-400 bg-red-400/10"
                          : ""
                      : ""
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
          {!state.submitted ? (
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={submit}
              disabled={state.selected.length === 0}
            >
              Check Answer
            </Button>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-ink/5 p-4 text-sm text-ink/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-semibold">
                {isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-2">{current.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          disabled={index === 0}
        >
          Previous
        </Button>
        <div className="text-center text-xs text-ink/60 dark:text-white/60">
          Score: {score} / {items.length}
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIndex((prev) => Math.min(prev + 1, items.length - 1))}
          disabled={index === items.length - 1}
        >
          Next
        </Button>
      </div>

      {isFinished && (
        <Card className="border-accent/50">
          <CardHeader>
            <CardTitle>Quiz Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink/70 dark:text-white/70">
            You answered {score} out of {items.length} questions correctly.
            Review the explanations above to solidify your understanding.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
