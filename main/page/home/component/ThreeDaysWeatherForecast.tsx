import {Button, Card, Text} from "react-native-paper"
import * as React from "react"
import {TouchableOpacity, View} from "react-native"
import {Coordinate, DailyAQIForecast, DailyWeatherForecast} from "../../../model/app-model"
import dayjs from "dayjs"
import {getChineseWeekDay} from "../../../utils/date"
import {weatherIconCodeToUnicode} from "../../../utils/q-weather"
import {useNavigation} from "@react-navigation/native";

export declare type ThreeDaysWeatherForecastProps = React.ComponentPropsWithRef<typeof View> & {
    coordinate?: Coordinate
    futureWeatherForecast: DailyWeatherForecast[],
    futureAQIForecast: DailyAQIForecast[]
}

export function ThreeDaysWeatherForecast(props: ThreeDaysWeatherForecastProps) {
    const navigation = useNavigation()

    return (
        <View {...props}>
            <Card mode="contained" style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderWidth: 0,
            }}>
                <Card.Content>
                    <View style={{
                        gap: 28,
                        paddingVertical: 12
                    }}>
                        {
                            props.futureWeatherForecast.map((dailyWeatherForecast, index) => (
                                <WeatherForecastItem
                                    key={dailyWeatherForecast.date}
                                    date={dailyWeatherForecast.date}
                                    dayWeatherDescription={dailyWeatherForecast.dayWeatherDescription}
                                    nightWeatherDescription={dailyWeatherForecast.nightWeatherDescription}
                                    airQuality={props.futureAQIForecast?.[index]?.airQuality}
                                    maxTemperature={dailyWeatherForecast.maxTemperature}
                                    minTemperature={dailyWeatherForecast.minTemperature}
                                    weatherIconCode={dailyWeatherForecast.dayWeatherIconCode}
                                />
                            ))
                        }
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("SevenDaysWeatherForcast", {
                                coordinate: props.coordinate,
                            })
                        }}>
                            <View style={{
                                alignItems: "center",
                                borderRadius: 1024,
                                backgroundColor: "rgba(255,255,255, 0.25)",
                                paddingVertical: 14
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: "sans-serif-medium",
                                    color: "white"
                                }}>查看近 7 日天气</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}

declare type WeatherForecastItemProps = {
    date: string,
    dayWeatherDescription: string,
    nightWeatherDescription: string,
    airQuality?: string,
    maxTemperature: string,
    minTemperature: string,
    weatherIconCode: string
}

function WeatherForecastItem(props: WeatherForecastItemProps) {
    const weatherDescription = props.dayWeatherDescription == props.nightWeatherDescription
        ? props.dayWeatherDescription
        : `${props.dayWeatherDescription}转${props.nightWeatherDescription}`

    const getDateDescription = (date: string) => {
        const dayjsDate = dayjs(date)
        if (dayjsDate.isSame(dayjs(), "day")) {
            return "今天"
        } else if (dayjsDate.isSame(dayjs().add(1, "day"), "day")) {
            return "明天"
        } else {
            return getChineseWeekDay(dayjsDate.day())
        }
    }

    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Text style={{
                flex: 0.4,
                fontSize: 18,
                color: "white",
                fontFamily: "qweather-icons",
                textShadowColor: "white",
                textShadowRadius: 2
            }}>{weatherIconCodeToUnicode(props.weatherIconCode)}</Text>
            <Text style={{
                flex: 0.65,
                fontSize: 18,
                color: "white",
                fontFamily: "sans-serif-medium",
            }}>{getDateDescription(props.date)}</Text>
            <Text style={{
                flex: 2.5,
                fontSize: 18,
                color: "white",
                fontFamily: "sans-serif-medium",
            }}>{weatherDescription}</Text>
            <View style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                display: props.airQuality ? "flex" : "none",
                borderRadius: 4,
                paddingHorizontal: 6,
                paddingVertical: 2,
            }}>
                <Text style={{
                    color: "white",
                }}>
                    {props.airQuality}
                </Text>
            </View>
            <View style={{
                flexDirection: "row",
                flex: 2,
                justifyContent: "flex-end",
                gap: 6
            }}>
                <Text style={{
                    fontSize: 18,
                    display: props.maxTemperature ? "flex" : "none",
                    color: "white",
                    fontFamily: "sans-serif-medium",
                }}>{`${props.maxTemperature}℃`}</Text>
                <Text style={{
                    fontSize: 18,
                    display: props.maxTemperature || props.minTemperature ? "flex" : "none",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "sans-serif-medium",
                }}>/</Text>
                <Text style={{
                    fontSize: 18,
                    display: props.minTemperature ? "flex" : "none",
                    color: "white",
                    fontFamily: "sans-serif-medium",
                }}>{`${props.minTemperature}℃`}</Text>
            </View>
        </View>
    )
}
