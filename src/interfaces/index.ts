export type Question = {
    main: string;       //short description (one to five words)
    question: string;   //questions that will be showed to the user
    options: string[];  //list of possible options
    correct: string;    //correct option
    explanation?: string;   //explanation of the correct option
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