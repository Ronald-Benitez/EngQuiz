import useSpeak from '@/src/hooks/useSpeak';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedSpeakButton } from '@/components/themed/ThemedSpeakButton';
import { TipsFile as File } from '@/src/interfaces';
import { formatedTipsFileSpeak, formatedTipSpeak } from '@/src/utils/formatedSpeaks';

const optionsConfig = {
    GerundsVSInfinitives: {
        import: () => import("@/src/files/tips/GerundsVSInfinitives.json")
    },
    InOnAt: {
        import: () => import("@/src/files/tips/InOnAt.json")
    },
    PerfectSentences: {
        import: () => import("@/src/files/tips/PerfectSentences.json")
    },
    TypeOfSentences: {
        import: () => import("@/src/files/tips/TypesOfSentences.json")
    },
    TypesOfConditional: {
        import: () => import("@/src/files/tips/TypesOfConditionals.json")
    }
} as const;

type OptionsConfig = typeof optionsConfig;
type OptionName = keyof OptionsConfig;


export default function DynamicQuiz() {
    const { name: nameParam } = useLocalSearchParams();
    const name = nameParam as OptionName;
    const [file, setFile] = useState<File | null>(null);
    const [optionConfig, setOptionConfig] = useState<OptionsConfig[OptionName]>(optionsConfig[name]);
    const speak = useSpeak();

    if (!Object.keys(optionsConfig).includes(name)) return <Redirect href="/tips" />

    useEffect(() => {
        setOptionConfig(optionsConfig[name])
    }, [name])


    useEffect(() => {
        const fetchFile = async () => {
            if (!optionConfig) return
            try {
                const module = await optionConfig.import()
                setFile(module.default);
            } catch (error) {
                return <Redirect href="/tips" />
            }
        };
        fetchFile()
        return () => {
            setFile(null)
        }
    }, [optionConfig]);


    if (!file) {
        return (
            <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 20 }}>
                <ThemedText>...loading</ThemedText>
            </ThemedView>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <ThemedView style={{ flex: 1, alignItems: "center", gap: 20 }}>
                <ThemedView style={{ padding: 20, alignItems: "center", gap: 10 }}>
                    <ThemedText type='title' style={{ textAlign: "center" }}>{file.title}</ThemedText>
                    <ThemedText style={{ textAlign: "center", maxWidth: 600 }}>{file.description}</ThemedText>
                    <ThemedView style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
                        <ThemedText style={{ textAlign: "center" }}>Listen all</ThemedText>
                        <ThemedSpeakButton text={formatedTipsFileSpeak(file)} speak={speak} />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={{ padding: 10 }}>
                    {
                        file?.tips?.map((tip, index) => (
                            <ThemedView key={index} secondary style={{ padding: 20, gap: 10, marginVertical: 5 }}>
                                <ThemedView secondary style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <ThemedText type='subtitle'>{index + 1} {" > "} {tip?.title}</ThemedText>
                                    <ThemedSpeakButton text={formatedTipSpeak(tip, index)} speak={speak} />
                                </ThemedView>
                                <ThemedText>{tip?.description}</ThemedText>
                                <ThemedText type='defaultSemiBold'>Examples</ThemedText>
                                <ThemedView style={{ gap: 5, padding: 10 }}>
                                    {
                                        tip?.examples?.map((example, index) => (
                                            <ThemedText key={index}>{example}</ThemedText>
                                        ))
                                    }
                                </ThemedView>
                            </ThemedView>
                        ))
                    }
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
}