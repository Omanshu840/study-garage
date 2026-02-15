/**
 * @typedef {'easy' | 'medium' | 'hard'} Difficulty
 */

/**
 * @typedef {'summary' | 'key-concepts' | 'note-card' | 'bullets'} LearnType
 */

/**
 * @typedef {Object} LearnItem
 * @property {string} id
 * @property {LearnType} type
 * @property {string} title
 * @property {string | string[]} content
 */

/**
 * @typedef {'table' | 'flow' | 'cycle' | 'comparison'} VisualizationType
 */

/**
 * @typedef {Object} VisualizationNode
 * @property {string} id
 * @property {string} label
 * @property {string} [description]
 */

/**
 * @typedef {Object} VisualizationItem
 * @property {string} id
 * @property {VisualizationType} type
 * @property {string} title
 * @property {Record<string, unknown>} data
 */

/**
 * @typedef {Object} FlashcardItem
 * @property {string} id
 * @property {string} front
 * @property {string} back
 * @property {Difficulty} [difficulty]
 */

/**
 * @typedef {Object} QuizOption
 * @property {string} id
 * @property {string} text
 */

/**
 * @typedef {'mcq' | 'true-false' | 'multi-select'} QuizType
 */

/**
 * @typedef {Object} QuizItem
 * @property {string} id
 * @property {QuizType} type
 * @property {string} question
 * @property {QuizOption[]} options
 * @property {string[]} correctOptionIds
 * @property {string} explanation
 */

/**
 * @typedef {Object} Chapter
 * @property {string} chapterId
 * @property {string} chapterName
 * @property {LearnItem[]} learn
 * @property {VisualizationItem[]} visualize
 * @property {FlashcardItem[]} flashcards
 * @property {QuizItem[]} quiz
 */

export {};
