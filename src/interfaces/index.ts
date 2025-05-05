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