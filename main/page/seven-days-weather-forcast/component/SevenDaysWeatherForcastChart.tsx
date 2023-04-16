import {ScrollView, View} from "react-native"
import {LineChart} from "react-native-chart-kit"
import {Text} from "react-native-paper"
import * as React from "react"
import {useEffect} from "react"

export interface SevenDaysWeatherForcastData {
    date: string
    temperature: string
    weatherIconCode: string
    weatherDescription: string
    windDirectionDegree: string,
    windScale: string
}

export declare type SevenDaysWeatherForcastChartProps = React.ComponentPropsWithRef<typeof View> & {
    data: SevenDaysWeatherForcastData[]
    labelAtUpper: boolean
}

export function SevenDaysWeatherForcastChart(props: SevenDaysWeatherForcastChartProps) {
    let datasetIndex = -1

    useEffect(() => {
        console.log(props.data.map(d => parseInt(d.temperature, 10)))
    }, [props.data])

    return (
        <ScrollView scrollEnabled={false} horizontal showsHorizontalScrollIndicator={false} style={{
            ...props.style
        }}>
            <LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: props.data.map(d => parseInt(d.temperature, 10)),
                            key: "hourly"
                        },
                        {
                            data: [-20, 20],
                            color: () => 'transparent',
                            strokeWidth: 0,
                            key: "hourlyPlaceholder",
                            withDots: false
                        },

                    ]
                }}
                width={620}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                withInnerLines={false}
                withHorizontalLines={false}
                withVerticalLines={false}
                withDots={true}
                height={320}
                chartConfig={{
                    backgroundColor: "transparent",
                    backgroundGradientTo: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientFrom: "white",
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: () => `rgba(230, 232, 234, 1)`,
                    style: {
                        borderRadius: 16,
                    },
                    labelColor: () => `rgba(230, 232, 234, 0.9)`,
                    fillShadowGradientTo: "white",
                    fillShadowGradientToOpacity: 0,
                    fillShadowGradientFrom: "white",
                    fillShadowGradientFromOpacity: 0,
                }}
                getDotColor={() => `rgba(230, 232, 234, 0.9)`}
                renderDotContent={({x, y, index}) => {
                    if (index == 0) {
                        datasetIndex++
                    }

                    return datasetIndex == 0 ? (
                        <View
                            style={{
                                position: "absolute",
                                top: y - 20,
                                left: x - 8,
                            }}
                        >
                            <Text style={{
                                fontFamily: "sans-serif-medium",
                                color: "white"
                            }}>{props.data?.[index]?.temperature ? `${props.data?.[index]?.temperature}℃` : ""}</Text>
                        </View>
                    ) : (<></>)
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </ScrollView>
    )
}
