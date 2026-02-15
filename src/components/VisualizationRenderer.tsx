import { VisualizationItem } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function VisualizationRenderer({ item }: { item: VisualizationItem }) {
  return (
    <Card>
      <CardHeader>
        <Badge className="w-fit bg-ink/10 text-ink dark:bg-white/10 dark:text-white">
          {item.type.replace("-", " ")}
        </Badge>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{renderVisualization(item)}</CardContent>
    </Card>
  );
}

function renderVisualization(item: VisualizationItem) {
  switch (item.type) {
    case "table": {
      const columns = item.data.columns as string[];
      const rows = item.data.rows as string[][];
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ink/70 dark:text-white/70">
                {columns.map((col) => (
                  <th key={col} className="pb-3 pr-4 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-t border-ink/10 dark:border-white/10">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="py-3 pr-4 text-ink/70 dark:text-white/70">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "flow": {
      const steps = item.data.steps as Array<{
        id: string;
        label: string;
        description?: string;
      }>;
      return (
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-ink dark:bg-accent/30 dark:text-white">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold">{step.label}</p>
                {step.description && (
                  <p className="text-sm text-ink/70 dark:text-white/70">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "cycle": {
      const stages = item.data.stages as Array<{
        id: string;
        label: string;
        description?: string;
      }>;
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {stages.map((stage) => (
            <div key={stage.id} className="rounded-2xl border border-ink/10 p-4 dark:border-white/10">
              <p className="font-semibold">{stage.label}</p>
              <p className="text-sm text-ink/70 dark:text-white/70">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      );
    }
    case "comparison": {
      const left = item.data.left as { title: string; points: string[] };
      const right = item.data.right as { title: string; points: string[] };
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {[left, right].map((side) => (
            <div key={side.title} className="rounded-2xl border border-ink/10 p-4 dark:border-white/10">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/60 dark:text-white/60">
                {side.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink/70 dark:text-white/70">
                {side.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mint" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    default:
      return (
        <p className="text-sm text-ink/70 dark:text-white/70">
          Unsupported visualization type.
        </p>
      );
  }
}
