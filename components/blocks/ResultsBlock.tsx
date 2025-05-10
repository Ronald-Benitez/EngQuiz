import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { ThemedBlock } from '@/components/themed/ThemedBlock';
import { ScrollView } from 'react-native-gesture-handler';
import { Completed } from '@/src/interfaces';
import useSpeak from '@/src/hooks/useSpeak';

export interface ResultsBlockProps {
    handleRestart: () => void;
    completed: Completed[];
    speak: (item: Completed) => void;
    time: string;
}

export default function ResultsBlock({ handleRestart, completed, speak, time }: ResultsBlockProps) {
    const color = useThemeColor({}, 'text');
    const { speak: speakText } = useSpeak();

    const CompletedItem = ({ item }: { item: Completed }) => {
        const isCorrect = item.isCorrect;
        const correctAnswer = item?.question?.correct;
        const selectedAnswer = item?.selected;

        return (
            <ThemedBlock type='secondary' style={{ width: "100%", gap: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
                    <MaterialIcons name={isCorrect ? "check-circle" : "cancel"} size={24} color={isCorrect ? "green" : "red"} />
                    <ThemedText type='defaultSemiBold' style={{ textTransform: "capitalize", fontWeight: "normal" }}>{item?.question?.main}</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, marginTop: 20 }}>
                    <ThemedText>{item.question.question}</ThemedText>
                    <Pressable onPress={() => speak(item)}>
                        <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
                            <MaterialIcons name="volume-up" size={20} color={color} />
                        </ThemedBlock>
                    </Pressable>
                </View>
                <ThemedView style={{ flexDirection: 'column', alignItems: 'center', width: "100%", padding: 10 }}>
                    <ThemedText style={[styles.disabled]}>Correct:</ThemedText>
                    <ThemedText >{correctAnswer}</ThemedText>
                </ThemedView>
                <ThemedView style={{ flexDirection: 'column', alignItems: 'center', width: "100%", padding: 10 }}>
                    <ThemedText style={[styles.disabled]}>Yours:</ThemedText>
                    <ThemedText>{selectedAnswer}</ThemedText>
                </ThemedView>
                {
                    item.question.explanation && (
                        <ThemedBlock type='secondary' style={{ padding: 10, marginTop: 10, flexDirection: "row", gap: 8, alignItems: "center" }}>
                            <Pressable onPress={() => speakText(item?.question?.explanation || "")}>
                                <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
                                    <MaterialIcons name="volume-up" size={20} color={color} />
                                </ThemedBlock>
                            </Pressable>
                            <ThemedText style={{ width: "80%" }}>{item?.question?.explanation}</ThemedText>
                        </ThemedBlock>
                    )
                }
            </ThemedBlock>
        )
    }
    return (
        <>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, width: '100%', paddingVertical: 5 }}>
                <ThemedText style={{ textTransform: "capitalize", fontWeight: "normal" }}>{time}</ThemedText>
                <Pressable onPress={handleRestart}>
                    <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
                        <MaterialIcons name="refresh" size={24} color={color} />
                    </ThemedBlock>
                </Pressable>
            </ThemedView>
            <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <ThemedView style={{ flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 20, width: '100%' }}>
                    {
                        completed.map((item, index) => (
                            <CompletedItem key={index} item={item} />
                        ))
                    }
                </ThemedView>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    },
});
