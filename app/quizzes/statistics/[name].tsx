import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAppRecords, Record } from '@/src/hooks/useRecords';
import { ThemedText } from '@/components/themed/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';

export default function DynamicQuiz() {
    const { name } = useLocalSearchParams();
    const [statistics, setStatistics] = useState<Record[]>([]);
    const { records, resetRecords } = useAppRecords()
    const color = useThemeColor({}, 'text');

    // if (!Object.keys(optionsConfig).includes(name)) return <Redirect href="/quizzes" />

    useEffect(() => {
        setStatistics(records[name as string] as Record[])
    }, [name, records])


    if (!statistics) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText>There isn't statistic yet...</ThemedText>
            </ThemedView>
        );
    }

    const getDate = (date: string) => {
        if (!date) return ""
        const newDate = new Date(date)
        return `${newDate?.toDateString()} ${newDate?.toTimeString()?.split(" ")[0]}`
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText type='title' style={{ textAlign: "center", marginVertical: 10 }}>{name} statistics</ThemedText>
            {
                statistics?.length < 1 && (
                    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ThemedText>There aren't statistics yet</ThemedText>
                    </ThemedView>
                )
            }
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <ThemedView style={{ flex: 1, gap: 15, flexDirection: "column", alignItems: "center" }}>
                    {
                        statistics?.reverse()?.length && statistics?.map((statistic, index) => (
                            <ThemedView style={{ flexDirection: 'column', alignItems: 'center' }} key={index} secondary>
                                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 4 }}>
                                    <ThemedText>{getDate(statistic?.date)}</ThemedText>
                                </ThemedView>
                                <ThemedView style={{ flexDirection: 'column', alignItems: 'center', gap: 20, width: "100%" }}>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: "100%" }}>
                                        <MaterialIcons name="cancel" size={24} color="red" />
                                        <ThemedText>{statistic?.errors || 0}</ThemedText>
                                        <ThemedText>errors</ThemedText>
                                    </ThemedView>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: "100%" }}>
                                        <MaterialIcons name="check-circle" size={24} color="green" />
                                        <ThemedText>{statistic?.corrects || 0}</ThemedText>
                                        <ThemedText>corrects</ThemedText>
                                    </ThemedView>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: "100%" }}>
                                        <MaterialIcons name="circle" size={24} color={color} />
                                        <ThemedText>{statistic?.questions}</ThemedText>
                                        <ThemedText>questions</ThemedText>
                                    </ThemedView>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: "100%" }}>
                                        <MaterialIcons name="check-circle" size={24} color="green" />
                                        <ThemedText>{Math.round((statistic?.corrects / statistic?.questions || 0) * 100)}%</ThemedText>
                                        <ThemedText>precision</ThemedText>
                                    </ThemedView>
                                </ThemedView>
                            </ThemedView>
                        ))
                    }
                </ThemedView>

            </ScrollView>
        </ThemedView>
    );
}
