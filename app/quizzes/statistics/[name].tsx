import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/themed/ThemedView';
import { useAppRecords, Record } from '@/src/hooks/useRecords';
import { ThemedText } from '@/components/themed/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { DimensionValue } from 'react-native';

const getPercentage = (statistic: Record) => {
    const correct = (statistic?.corrects / statistic?.questions) * 100
    const error = (statistic?.errors / statistic?.questions) * 100
    const values = [
        correct?.toFixed(0) + "%",
        error?.toFixed(0) + "%"
    ] as DimensionValue[]

    console.log(values, correct, error, statistic)

    return values

}

export default function DynamicQuiz() {
    const { name } = useLocalSearchParams();
    const [statistics, setStatistics] = useState<Record[]>([]);
    const { records, resetRecords } = useAppRecords()
    const color = useThemeColor({}, 'text');

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
                                <ThemedView style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
                                    <ThemedText>{getDate(statistic?.date)}</ThemedText>
                                    <ThemedText style={{ fontWeight: 100, fontSize: 10 }}>({statistic?.questions} questions)</ThemedText>
                                </ThemedView>
                                <StatisticBlock statistic={statistic} />
                            </ThemedView>
                        ))
                    }
                </ThemedView>

            </ScrollView>
        </ThemedView>
    );
}

const StatisticBlock = ({ statistic }: { statistic: Record }) => {
    const percentages = getPercentage(statistic)

    return (
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, width: "100%" }}>
            {
                percentages[0] != "0%" && (
                    <ThemedView style={{ width: percentages[0], backgroundColor: "green", height: "100%", alignItems: "center" }}>
                        <ThemedText style={{ textAlign: "center", fontWeight: 100, fontSize: 10 }}>
                            {statistic?.corrects || 0}
                            {" "}
                            {`(${percentages[0]?.toString()})`}
                        </ThemedText>
                    </ThemedView>
                )
            }
            {
                percentages[1] != "0%" && (
                    <ThemedView style={{ width: percentages[1], backgroundColor: "red", height: "100%", alignItems: "center" }}>
                        <ThemedText style={{ textAlign: "center", fontWeight: 100, fontSize: 10 }}>
                            {statistic?.errors || 0}
                            {" "}
                            {`(${percentages[1]?.toString()})`}
                        </ThemedText>
                    </ThemedView>
                )
            }
        </ThemedView>
    )
}