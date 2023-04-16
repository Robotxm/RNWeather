import {ScrollView, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {Text, useTheme} from "react-native-paper";
import * as React from "react";
import {DailyAQIForecast} from "../../../model/app-model";
import {aqiNumberToColor} from "../../../utils/q-weather";
import {Dimensions} from 'react-native'
import dayjs from "dayjs";
import {useState} from "react";

export declare type ScrollableDailyAQIChartProps = {
    dailyAQIForecast: DailyAQIForecast[],
}

export function ScrollableDailyAQIChart(props: ScrollableDailyAQIChartProps) {
    const theme = useTheme()
    const [clickedIndex, setClickedIndex] = useState(-1)
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            marginTop: -64
        }}>
            <View>
                <View style={{
                    marginLeft: -8,
                    marginRight: -32
                }}>
                    <LineChart
                        data={{
                            labels: props.dailyAQIForecast.map((d, index) => {
                                if (index == 0) {
                                    return "今天"
                                } else if (index == 1) {
                                    return "明天"
                                } else {
                                   return dayjs(d.date).format("MM-DD")
                                }
                            }),
                            datasets: [
                                {
                                    data: props.dailyAQIForecast.map(h => parseInt(h.aqiNumber, 10)),
                                    key: "dailyAQI"
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width}
                        withHorizontalLabels={false}
                        withVerticalLines={false}
                        withDots={true}
                        height={130}
                        xLabelsOffset={-10}
                        fromNumber={Math.min(...props.dailyAQIForecast.map(h => parseInt(h.aqiNumber, 10))) - 20}
                        chartConfig={{
                            backgroundColor: "transparent",
                            backgroundGradientTo: "white",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientFrom: "white",
                            backgroundGradientToOpacity: 0,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: () => `rgba(230,232,234, 1)`,
                            style: {
                                borderRadius: 16,
                            },
                            labelColor: () => theme.colors.onSurface,
                            fillShadowGradientTo: "white",
                            fillShadowGradientToOpacity: 0,
                            fillShadowGradientFrom: "white",
                            fillShadowGradientFromOpacity: 0,
                        }}
                        getDotColor={(dataPoint) => aqiNumberToColor(dataPoint)}
                        renderDotContent={({x, y, index}) => (
                            clickedIndex == index ? (<View
                                style={{
                                    position: "absolute",
                                    top: y - 40,
                                    left: x - 20,
                                    backgroundColor: aqiNumberToColor(props.dailyAQIForecast?.[index]?.aqiNumber),
                                    borderRadius: 4,
                                    paddingHorizontal: 4,
                                    paddingVertical: 2
                                }}
                            >
                                <Text style={{
                                    fontFamily: "sans-serif-medium",
                                    color: "white",
                                    fontSize: 16
                                }}>{props.dailyAQIForecast?.[index]?.aqiNumber} {props.dailyAQIForecast?.[index]?.airQuality}</Text>
                            </View>) : <></>
                        )}
                        onDataPointClick={({index}) => setClickedIndex(index)}
                        style={{
                            marginVertical: 80,
                            borderRadius: 16
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
