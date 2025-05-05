export type Question = {
    main: string;
    question: string;
    options: string[];
    correct: string;
    explanation?: string;
};

export type Completed = {
    question: Question;
    selected: string;
    isCorrect: boolean;
}

export type Tip = {
    title: string,
    description: string,
    examples: string[]
}

export interface TipsFile {
    title: string,
    description: string,
    tips: Tip[]
}