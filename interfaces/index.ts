export type Question = {
    main: string;
    question: string;
    options: string[];
    correct: number;
    explanation?: string;
};

export type Completed = {
    question: Question;
    selected: number;
    isCorrect: boolean;
}