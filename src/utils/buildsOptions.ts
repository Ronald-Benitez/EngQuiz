import { calculateQuestions, AppSettings } from "@/src/hooks/useSettings";
import { Question } from "@/src/interfaces";

export const buildOptions = (questionsData: Question[], settings: AppSettings) => () => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, calculateQuestions(questionsData?.length, settings)) as Question[];
}


const OptionsToAsk = [
    "For the verb ___, the simple past option is:",
    "For the verb ___, the past participle option is:",
    "For the verb ___, the regular sound option is:",
]

const OptionsList = [
    "simple_past",
    "past_participle",
    "sound",
]

const SoundOptions = [
    "t",
    "d",
    "id",
]

type VerbBlock = {
    main: string,
    simple_past_options: string[],
    simple_past: string,
    past_participle_options: string[],
    past_participle: string,
    sound: null | string,
    type: string,
    explanation: string
}

export const buildVerbOptions = (questionsData: VerbBlock[], settings: AppSettings) => () => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    const sliced = shuffled.slice(0, calculateQuestions(questionsData?.length || 0, settings));
    const list = sliced.map((item) => {
        const selected = Math.floor(Math.random() * (item?.type === "regular" ? 3 : 2));
        const question = OptionsToAsk[selected].replace("___", item?.main);
        const optionsKey = `${OptionsList[selected]}_options` as keyof typeof item;
        const correctKeyt = `${OptionsList[selected]}` as keyof typeof item;
        const correct = selected === 2 ? item?.sound : item[correctKeyt];
        const options = selected === 2 ? SoundOptions : item[optionsKey];
        return {
            main: item?.main,
            question,
            correct,
            options,
        } as Question;
    });
    return list;
}