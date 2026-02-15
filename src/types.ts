export type Difficulty = "easy" | "medium" | "hard";
export type NonEmptyStringArray = [string, ...string[]];

export type LearnType = "summary" | "key-concepts" | "note-card" | "bullets";

interface LearnItemBase {
  id: string;
  title: string;
}

export interface SummaryLearnItem extends LearnItemBase {
  type: "summary";
  content: string;
}

export interface KeyConceptsLearnItem extends LearnItemBase {
  type: "key-concepts";
  content: NonEmptyStringArray;
}

export interface NoteCardLearnItem extends LearnItemBase {
  type: "note-card";
  content: string;
}

export interface BulletsLearnItem extends LearnItemBase {
  type: "bullets";
  content: NonEmptyStringArray;
}

export type LearnItem =
  | SummaryLearnItem
  | KeyConceptsLearnItem
  | NoteCardLearnItem
  | BulletsLearnItem;

export interface VisualizationNode {
  id: string;
  label: string;
  description: string;
}

export interface ComparisonSide {
  title: string;
  points: NonEmptyStringArray;
}

export interface TableVisualizationData {
  columns: NonEmptyStringArray;
  rows: NonEmptyStringArray[];
}

export interface FlowVisualizationData {
  steps: [VisualizationNode, ...VisualizationNode[]];
}

export interface CycleVisualizationData {
  stages: [VisualizationNode, ...VisualizationNode[]];
}

export interface ComparisonVisualizationData {
  left: ComparisonSide;
  right: ComparisonSide;
}

interface VisualizationItemBase {
  id: string;
  title: string;
}

export interface TableVisualizationItem extends VisualizationItemBase {
  type: "table";
  data: TableVisualizationData;
}

export interface FlowVisualizationItem extends VisualizationItemBase {
  type: "flow";
  data: FlowVisualizationData;
}

export interface CycleVisualizationItem extends VisualizationItemBase {
  type: "cycle";
  data: CycleVisualizationData;
}

export interface ComparisonVisualizationItem extends VisualizationItemBase {
  type: "comparison";
  data: ComparisonVisualizationData;
}

export type VisualizationType = VisualizationItem["type"];

export type VisualizationItem =
  | TableVisualizationItem
  | FlowVisualizationItem
  | CycleVisualizationItem
  | ComparisonVisualizationItem;

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  difficulty: Difficulty;
}

export type QuizType = "mcq" | "true-false" | "multi-select";

export interface QuizOption<TId extends string = string> {
  id: TId;
  text: string;
}

interface QuizItemBase {
  id: string;
  question: string;
  explanation: string;
}

export interface McqQuizItem extends QuizItemBase {
  type: "mcq";
  options: [QuizOption, ...QuizOption[]];
  correctOptionIds: [string];
}

export interface TrueFalseQuizItem extends QuizItemBase {
  type: "true-false";
  options: [QuizOption<"true">, QuizOption<"false">];
  correctOptionIds: ["true"] | ["false"];
}

export interface MultiSelectQuizItem extends QuizItemBase {
  type: "multi-select";
  options: [QuizOption, ...QuizOption[]];
  correctOptionIds: NonEmptyStringArray;
}

export type QuizItem = McqQuizItem | TrueFalseQuizItem | MultiSelectQuizItem;

export interface Chapter {
  chapterId: string;
  chapterName: string;
  learn: LearnItem[];
  visualize: VisualizationItem[];
  flashcards: FlashcardItem[];
  quiz: QuizItem[];
}

export interface Subject {
  subjectId: string;
  subjectName: string;
  chapters: Chapter[];
}

export type SubjectData = Subject;

export interface StudyData {
  subjects: Subject[];
}
