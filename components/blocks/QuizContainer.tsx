import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSettings } from '@/hooks/useSettings';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UseQuizReturn } from '@/hooks/useQuiz';

export interface QuizContainerProps {
    children?: React.ReactNode;
    quiz: UseQuizReturn,
}

export default function QuizContainer({ children, quiz }: QuizContainerProps) {
    const { settings } = useAppSettings();
    const color = useThemeColor({}, 'text');

    const { current, completed, questions, showResult } = quiz;

    if (questions.length === 0) return <ThemedText>Loading...</ThemedText>;

    const totalCorrect = completed.filter(q => q.isCorrect)?.length;
    const totalWrong = completed.filter(q => !q.isCorrect)?.length;

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{showResult ? "Quiz Finished " : "Choose the correct answer"}</ThemedText>

            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <ThemedText>{current + 1} of {settings.questions}</ThemedText>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                    <ThemedText>{totalWrong || 0}</ThemedText>
                </ThemedView>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <MaterialIcons name="check-circle" size={24} color="green" />
                    <ThemedText>{totalCorrect || 0}</ThemedText>
                </ThemedView>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <MaterialIcons name="circle" size={24} color={color} />
                    <ThemedText>{settings.questions - (current + 1)}</ThemedText>
                </ThemedView>
            </ThemedView>
            {
                children
            }
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});
