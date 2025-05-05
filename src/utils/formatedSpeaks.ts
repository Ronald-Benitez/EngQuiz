import { Completed } from "@/src/interfaces";
import { UseSpeakReturn } from "@/src/hooks/useSpeak";
import { TipsFile, Tip } from "@/src/interfaces";

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

export const formatedTipsFileSpeak = (jsonData: TipsFile) => {
    try {
        let textTTS = "";

        if (jsonData && typeof jsonData === 'object') {
            if (jsonData.title) {
                textTTS += `${jsonData.title}. `;
            }
            if (jsonData.description) {
                textTTS += `${jsonData.description}. `;
            }
            if (jsonData.tips && Array.isArray(jsonData.tips)) {
                jsonData.tips.forEach((tip, index) => {
                    textTTS += `Tip number ${index + 1}: `;
                    if (tip.title) {
                        textTTS += `${tip.title}. `;
                    }
                    if (tip.description) {
                        textTTS += `${tip.description}. `;
                    }
                    if (tip.examples && Array.isArray(tip.examples)) {
                        textTTS += "Examples: ";
                        tip.examples.forEach((ejemplo, i) => {
                            textTTS += `${i + 1}. ${ejemplo}. `;
                        });
                    }
                });
            }
        } else {
            return "";
        }

        return textTTS.trim();
    } catch (error) {
        console.error("There was an error generating the speech:", error);
        return "";
    }
}

export const formatedTipSpeak = (tip: Tip, index: number) => {
    try {
        let textTTS = "";

        if (tip && typeof tip === 'object') {
            if (tip.title) {
                textTTS += `Tip number ${index + 1}: `;
                if (tip.title) {
                    textTTS += `${tip.title}. `;
                }
                if (tip.description) {
                    textTTS += `${tip.description}. `;
                }
                if (tip.examples && Array.isArray(tip.examples)) {
                    textTTS += "Examples: ";
                    tip.examples.forEach((ejemplo, i) => {
                        textTTS += `${i + 1}. ${ejemplo}. `;
                    });
                }
            }
        } else {
            return "";
        }

        return textTTS.trim();
    } catch (error) {
        console.error("There was an error generating the speech:", error);
        return "";
    }
}