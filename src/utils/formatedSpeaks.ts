import { Completed } from "@/interfaces";
import { UseSpeakReturn } from "@/hooks/useSpeak";

export const formatedSplittedSpeak = (speak: UseSpeakReturn) => (item: Completed) => {
    speak.stop();
    // replace all what is inside () with empty string
    const question = item?.question?.question.replace(/\(.*?\)/g, "");
    const correctBlocks = item?.question?.correct?.split("/") || [""];
    const questionBlocks = question.split("___") || [""];
    console.log(correctBlocks, questionBlocks, item?.question?.question, item?.question?.correct);

    const textToListen = questionBlocks.map((block, index) => {
        return `${block} ${correctBlocks[index] || ""}`;
    }
    ).join(" ");
    speak.speak(textToListen);
}

export const formatedBasicSpeak = (speak: UseSpeakReturn) => (item: Completed) => {
    speak.stop();
    const textToListen = `${item?.question?.question} ${item?.question?.correct}`;
    speak.speak(textToListen);
}

export const formatedTypeSentencesSpeak = (speak: UseSpeakReturn) => (item: Completed) => {
    speak.stop();
    const textToListen = `The sentence: ${item?.question?.question} is a ${item?.question?.correct}`;
    speak.speak(textToListen);
}

export const formatedGerundsInfinitivesSpeak = (speak: UseSpeakReturn) => (item: Completed) => {
    speak.stop();
    const optionToListen = item?.question?.correct == "both" ? item?.question?.options[Math.floor(Math.random() * 2)] : item?.question?.correct;
    const textToListen = `${item?.question?.question.replace("___", optionToListen)}`;
    speak.speak(textToListen);
}