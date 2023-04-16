import {ScrollView, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {Text} from "react-native-paper";
import * as React from "react";
import {HourlyWeatherForecast} from "../../../model/app-model";
import {weatherIconCodeToUnicode} from "../../../utils/q-weather";

export declare type ScrollableHourslyTempratureChartProps = {
    hourlyWeather: HourlyWeatherForecast[]
}

export function ScrollableHourslyTempratureChart(props: ScrollableHourslyTempratureChartProps) {
    const generateLabels = (arr: string[]) => arr.length > 0 ? [""].concat(arr).concat([""]) : []

    const generateData = (arr: number[]) => arr.length > 0 ? [arr[0]].concat(arr).concat(arr[arr.length - 1]) : []

    let datasetIndex = -1

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            marginTop: -30
        }}>
            <View>
                <View style={{
                    marginLeft: -95,
                    marginRight: -(1600) / 26,
                    marginBottom: -60
                }}>
                    <LineChart
                        data={{
                            labels: generateLabels(props.hourlyWeather.map(h => h.time)),
                            datasets: [
                                {
                                    data: [
                                        -20,
                                        20
                                    ],
                                    color: () => 'transparent',
                                    strokeWidth: 0,
                                    key: "hourlyPlaceholder"
                                },
                                {
                                    data: generateData(props.hourlyWeather.map(h => parseInt(h.temperature, 10))),
                                    key: "hourly"
                                }
                            ]
                        }}
                        width={1600}
                        withHorizontalLabels={false}
                        withVerticalLabels={false}
                        withInnerLines={false}
                        withHorizontalLines={false}
                        withVerticalLines={false}
                        withDots={true}
                        height={160}
                        xLabelsOffset={-60}
                        chartConfig={{
                            backgroundColor: "transparent",
                            backgroundGradientTo: "white",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientFrom: "white",
                            backgroundGradientToOpacity: 0,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: () => `rgba(193, 252, 0, 1)`,
                            style: {
                                borderRadius: 16,
                            },
                            labelColor: () => `rgba(230, 232, 234, 0.9)`,
                            fillShadowGradientTo: "white",
                            fillShadowGradientToOpacity: 0,
                            fillShadowGradientFrom: "white",
                            fillShadowGradientFromOpacity: 0,
                        }}
                        getDotColor={() => "transparent"}
                        renderDotContent={({x, y, index}) => {
                            if (index == 0) {
                                datasetIndex++
                            }

                            return datasetIndex == 1 ? (
                                <View
                                    style={{
                                        position: "absolute",
                                        top: y - 20,
                                        left: x,
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: "sans-serif-medium",
                                        color: "white"
                                    }}>{props.hourlyWeather?.[index - 1]?.temperature ? `${props.hourlyWeather?.[index - 1]?.temperature}℃` : ""}</Text>
                                </View>
                            ) : (<></>)
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 1600 - 95 - (1600 - 100) / 26,
                    // backgroundColor: "red",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: -40,
                    marginLeft: -5,
                }}>
                    {
                        props.hourlyWeather
                            .map((h, index) => (
                                <View key={h.time}>
                                    <Text style={{
                                        flex: 0.4,
                                        fontSize: 18,
                                        color: "white",
                                        fontFamily: "qweather-icons",
                                        textAlign: "center",
                                    }}>{weatherIconCodeToUnicode(h.weatherIconCode)}</Text>
                                    <Text style={{
                                        textAlign: "center",
                                        color: "rgba(230, 232, 234, 0.9)",
                                        marginTop: 4,
                                        fontSize: 12
                                    }}>
                                        {`${h.windScaleRange.split("-")[0]} 级`}
                                    </Text>
                                    <Text style={{
                                        textAlign: "center",
                                        color: "rgba(230, 232, 234, 0.9)",
                                        fontSize: 12
                                    }}>
                                        {h.time == "00:00" && index > 0 ? " 明天 " : h.time}
                                    </Text>
                                </View>
                            ))}
                </View>
            </View>
        </ScrollView>
    )
}
