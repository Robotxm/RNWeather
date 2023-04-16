import {ScrollView, StatusBar, useColorScheme, View} from "react-native"
import {Appbar, Text, useTheme} from "react-native-paper"
import * as React from "react"
import {useNavigation, useRoute} from "@react-navigation/native"
import {useEffect, useState} from "react";
import {getFutureWeather} from "../../network/weather-api";
import {SevenDaysWeatherForcastChart, SevenDaysWeatherForcastData} from "./component/SevenDaysWeatherForcastChart";
import {DailyWeatherForecast} from "../../model/app-model";
import dayjs from "dayjs";
import {getChineseWeekDay} from "../../utils/date";
import {weatherIconCodeToUnicode} from "../../utils/q-weather";
import Icon from "react-native-vector-icons/FontAwesome5";

export function SevenDaysWeatherForcast() {
    const theme = useTheme()
    const colorScheme = useColorScheme()
    const route = useRoute()

    const navigation = useNavigation()

    const [dailyWeather, setDailyWeather] = useState<DailyWeatherForecast[]>([
        {
            date: "2023-01-01",
            sunriseTime: "08:00",
            sunsetTime: "18:00",
            moonriseTime: "08:00",
            moonsetTime: "18:00",
            maxTemperature: "20",
            minTemperature: "10",
            dayWeatherDescription: "晴",
            nightWeatherDescription: "多云",
            uvIndex: "200",
            dayWeatherIconCode: "100",
            nightWeatherIconCode: "100",
            dayWindDirection: "东风",
            dayWindScale: "1-2",
            dayWindDirectionDegree: "90",
            nightWindDirection: "东风",
            nightWindScale: "3-4",
            nightWindDirectionDegree: "90",
        }
    ])

    useEffect(() => {
        console.log(route.params)

        fetchFutureWeather(route.params.coordinate.longitude, route.params.coordinate.latitude)
            .then((futureWeatherResponse) => {
                if (futureWeatherResponse.daily) {
                    setDailyWeather(futureWeatherResponse.daily.map(dailyWeather => ({
                        date: dailyWeather.fxDate,
                        sunriseTime: dailyWeather.sunrise,
                        sunsetTime: dailyWeather.sunset,
                        moonriseTime: dailyWeather.moonrise,
                        moonsetTime: dailyWeather.moonset,
                        maxTemperature: dailyWeather.tempMax,
                        minTemperature: dailyWeather.tempMin,
                        dayWeatherDescription: dailyWeather.textDay,
                        nightWeatherDescription: dailyWeather.textNight,
                        uvIndex: dailyWeather.uvIndex,
                        dayWeatherIconCode: dailyWeather.iconDay,
                        nightWeatherIconCode: dailyWeather.iconNight,
                        dayWindDirection: dailyWeather.windDirDay,
                        dayWindScale: dailyWeather.windScaleDay,
                        dayWindDirectionDegree: dailyWeather.wind360Day,
                        nightWindDirection: dailyWeather.windDirNight,
                        nightWindScale: dailyWeather.windScaleNight,
                        nightWindDirectionDegree: dailyWeather.wind360Night,
                    })))
                }
            })
    }, [route.params.coordinate])

    const isDarkMode = colorScheme === "dark"

    const fetchFutureWeather = (longitude: number, latitude: number) => getFutureWeather(longitude, latitude, 7)

    return (
        <>
            <View style={{
                backgroundColor: theme.colors.background,
                flex: 1
            }}>
                <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"}/>
                <Appbar.Header mode="large" style={{
                    backgroundColor: theme.colors.background,
                }}>
                    <Appbar.BackAction onPress={() => {
                        navigation.goBack()
                    }}/>
                    <Appbar.Content color={"white"} title={
                        <Text style={{
                            fontSize: 36,
                            fontWeight: "normal"
                        }}>
                            7 天趋势预报
                        </Text>
                    }/>
                </Appbar.Header>
                <View style={{
                    flex: 1,
                    marginTop: 32
                }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View>
                            <View>
                                {getTopLabel(mapDailyWeatherForecast(dailyWeather, true))}
                                <SevenDaysWeatherForcastChart data={mapDailyWeatherForecast(dailyWeather, true)} labelAtUpper={true} style={{
                                    marginTop: 16,
                                    marginBottom: -200
                                }}/>
                            </View>
                            <View>
                                <SevenDaysWeatherForcastChart data={mapDailyWeatherForecast(dailyWeather, false)} labelAtUpper={false}/>
                                {getBottomLabel(mapDailyWeatherForecast(dailyWeather, false))}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

function mapDailyWeatherForecast(dailyWeatherForecast: DailyWeatherForecast[], day: boolean) {
    return dailyWeatherForecast.map(d => ({
        date: d.date,
        temperature: day ? d.maxTemperature : d.minTemperature,
        weatherIconCode: day ? d.dayWeatherIconCode : d.nightWeatherIconCode,
        weatherDescription: day ? d.dayWeatherDescription : d.nightWeatherDescription,
        windDirectionDegree: d.dayWindDirectionDegree,
        windScale: d.dayWindScale
    }))
}

function getDateDescription(date: string) {
    const dayjsDate = dayjs(date)
    if (dayjsDate.isSame(dayjs(), "day")) {
        return "今天"
    } else if (dayjsDate.isSame(dayjs().add(1, "day"), "day")) {
        return "明天"
    } else {
        return getChineseWeekDay(dayjsDate.day())
    }
}

function getTopLabel(data: SevenDaysWeatherForcastData[]) {
    return (
        <View style={{
            flexDirection: "row",
            width: 600,
            justifyContent: "space-evenly",
            alignItems: "center"
        }}>
            {
                data
                    .map((d, index) => (
                        <View key={d.date}>
                            <Text style={{
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                            }}>{getDateDescription(d.date)}</Text>
                            <Text style={{
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                                marginTop: 4
                            }}>{dayjs(d.date).format("MM-DD")}</Text>
                            <Text style={{
                                fontSize: 24,
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                                marginTop: 12
                            }}>{weatherIconCodeToUnicode(d.weatherIconCode)}</Text>
                            <Text style={{
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                                marginTop: 4
                            }}>{d.weatherDescription}</Text>
                        </View>
                    ))}
        </View>
    )
}

function getBottomLabel(data: SevenDaysWeatherForcastData[]) {
    return (
        <View style={{
            flexDirection: "row",
            width: 600,
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: -200
        }}>
            {
                data
                    .map((d, index) => (
                        <View key={d.date}>
                            <Text style={{
                                fontSize: 24,
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                                marginTop: 12
                            }}>{weatherIconCodeToUnicode(d.weatherIconCode)}</Text>
                            <Text style={{
                                color: "white",
                                fontFamily: "qweather-icons",
                                textAlign: "center",
                                marginTop: 4
                            }}>{d.weatherDescription}</Text>
                            <View style={{
                                flexDirection: "row",
                                gap: 8,
                                alignItems: "center"
                            }}>
                                <Icon name="location-arrow" color="white" size={8} style={{
                                    position: "absolute",
                                    top: 8,
                                    transform: [{ rotate: `${parseInt(d.windDirectionDegree ?? "0", 10) - 45 - 180}deg`}]
                                }}/>
                                <Text style={{
                                    color: "white",
                                    fontFamily: "qweather-icons",
                                    textAlign: "center",
                                    marginTop: 4,
                                    marginLeft: 12
                                }}>{d.windScale.split("-")[0]} 级</Text>
                            </View>
                        </View>
                    ))}
        </View>
    )
}
