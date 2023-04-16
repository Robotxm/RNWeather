import * as React from 'react'
import {useCallback, useEffect, useState} from 'react'
import {getFutureAQIInFiveDays, getFutureWeather, getPrecipitation, getRealTimeAQI, getRealTimeWeather} from '../../network/weather-api'
import {
    DailyAQIForecast,
    DailyWeatherForecast,
    GeolocationResult, Precipitation,
    RealTimeAQI,
    RealTimeWeather,
} from '../../model/app-model'
import {RefreshControl, ScrollView, StatusBar, View} from 'react-native'
import HomeTopBar from './component/HomeTopBar'
import WeatherSummary from './component/WeatherSummary'
import {getCurrentPositionAsync} from "../../utils/async-geolocation"
import Toast from "react-native-toast-message"
import {ThreeDaysWeatherForecast} from "./component/ThreeDaysWeatherForecast"
import {WindSummary} from "./component/WindSummary"
import {SunriseSunsetSummary} from "./component/SunriseSunsetSummary"
import {MoreWeatherDetails} from "./component/MoreWeatherDetails"
import LinearGradient from 'react-native-linear-gradient'
import {Text} from "react-native-paper"
import {HourlyWeatherSummary} from "./component/HourlyWeatherSummary"
import {WeatherIndexSummary} from "./component/WeatherIndexSummary"
import {WeatherWarningSummary} from "./component/WeatherWarningSummary"

export default function Home() {
    const [geolocationResult, setGeolocationResult] = useState<GeolocationResult>()
    const [realTimeWeather, setRealTimeWeather] = useState<RealTimeWeather>()
    const [realTimeAQI, setRealTimeAQI] = useState<RealTimeAQI>()
    const [precipitation, setPrecipitation] = useState<Precipitation>()
    const [futureWeatherForecast, setFutureWeatherForecast] = useState<DailyWeatherForecast[]>()
    const [refreshing, setRefreshing] = useState(false)
    const [futureAQIForecast, setFutureAQIForecast] = useState<DailyAQIForecast[]>()

    const onRefresh = useCallback(() => {
        refreshData()
    }, [])

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = () => {
        setRefreshing(true)
        getCurrentPositionAsync().then(result => {
            console.log(result)
            setGeolocationResult(result)

            return Promise.all([
                fetchWeather(result.longitude, result.latitude),
                fetchAQI(result.longitude, result.latitude),
                fetchPrecipitation(result.longitude, result.latitude),
                fetchFutureWeatherInThreeDays(result.longitude, result.latitude),
                fetchFutureAQIForecast(result.longitude, result.latitude)
            ])
        }).then(([weatherResponse, aqiResponse, precipitationResponse, futureWeatherResponse, futureAQIResponse]) => {
            console.log(weatherResponse, aqiResponse, precipitationResponse, futureWeatherResponse)

            if (weatherResponse.now) {
                setRealTimeWeather({
                    apparentTemperature: weatherResponse.now.feelsLike,
                    description: weatherResponse.now.text,
                    humidity: weatherResponse.now.humidity,
                    precipitation: weatherResponse.now.precip,
                    pressure: weatherResponse.now.pressure,
                    temperature: weatherResponse.now.temp,
                    visibility: weatherResponse.now.vis,
                    windDirection: weatherResponse.now.windDir,
                    windScale: weatherResponse.now.windScale,
                    windSpeed: weatherResponse.now.windSpeed,
                    windDirectionDegree: weatherResponse.now.wind360
                })
            }

            if (aqiResponse.now) {
                setRealTimeAQI({
                    airQuality: aqiResponse.now.category,
                    aqiNumber: aqiResponse.now.aqi,
                    co: aqiResponse.now.co,
                    primaryPollutant: aqiResponse.now.primary,
                    no2: aqiResponse.now.no2,
                    o3: aqiResponse.now.o3,
                    pm10: aqiResponse.now.pm10,
                    pm2p5: aqiResponse.now.pm2p5,
                    pollutionLevel: aqiResponse.now.level,
                    so2: aqiResponse.now.so2,
                    updatedTime: aqiResponse.now.pubTime
                })
            }

            if (precipitationResponse.minutely) {
                setPrecipitation({
                    description: precipitationResponse.summary
                })
            }

            if (futureWeatherResponse.daily) {
                setFutureWeatherForecast(futureWeatherResponse.daily.map(dailyWeather => ({
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

            if (futureAQIResponse.daily) {
                setFutureAQIForecast(futureAQIResponse.daily.map((daily) => ({
                    aqiNumber: daily.aqi,
                    pollutionLevel: daily.level,
                    airQuality: daily.category,
                    date: daily.fxDate
                })))
            }

            setRefreshing(false)
        }).catch(reason => {
            Toast.show({
                type: "error",
                text1: "获取天气失败"
            })
            setRefreshing(false)
            console.error(reason)
        })
    }

    const fetchWeather = (longitude: number, latitude: number) => getRealTimeWeather(longitude, latitude)

    const fetchAQI = (longitude: number, latitude: number) => getRealTimeAQI(longitude, latitude)

    const fetchPrecipitation = (longitude: number, latitude: number) => getPrecipitation(longitude, latitude)

    const fetchFutureWeatherInThreeDays = (longitude: number, latitude: number) => getFutureWeather(longitude, latitude, 3)

    const fetchFutureAQIForecast = (longitude: number, latitude: number) => getFutureAQIInFiveDays(longitude, latitude)

    return (
        <LinearGradient colors={["#89C4FF", "#2395FF"]} useAngle={true} angle={135} style={{
            flex: 1
        }}>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <HomeTopBar
                    district={geolocationResult?.district}
                    street={geolocationResult?.street}
                />
                <WeatherSummary
                    currentTemperature={realTimeWeather?.temperature}
                    currentWeatherDescription={realTimeWeather?.description}
                    minTemperature={futureWeatherForecast?.[0]?.minTemperature}
                    maxTemperature={futureWeatherForecast?.[0]?.maxTemperature}
                    realTimeAQI={realTimeAQI}
                    coordinate={geolocationResult}
                    precipitationDescription={precipitation?.description}
                    futureAQIForecast={futureAQIForecast ?? []}
                    style={{
                        marginBottom: 270
                    }}
                />
                <WeatherWarningSummary coordinate={geolocationResult} style={{
                    marginHorizontal: 18
                }}/>
                <ThreeDaysWeatherForecast coordinate={geolocationResult}
                                          futureWeatherForecast={futureWeatherForecast ?? []}
                                          futureAQIForecast={futureAQIForecast ?? []}
                                          style={{
                                              marginHorizontal: 18
                                          }}/>
                <HourlyWeatherSummary coordinate={geolocationResult} style={{
                    marginTop: 8,
                    marginHorizontal: 18,
                }}/>
                <View style={{
                    flexDirection: "row",
                    marginTop: 8,
                    marginHorizontal: 18,
                    gap: 8
                }}>
                    <View style={{
                        flex: 1,
                        gap: 8
                    }}>
                        <WindSummary
                            windDirectionDegree={realTimeWeather?.windDirectionDegree}
                            windDirection={realTimeWeather?.windDirection}
                            windScale={realTimeWeather?.windScale}/>
                        <SunriseSunsetSummary
                            sunriseTime={futureWeatherForecast?.[0]?.sunriseTime}
                            sunsetTime={futureWeatherForecast?.[0]?.sunsetTime}/>
                    </View>
                    <MoreWeatherDetails
                        apparentTemperature={realTimeWeather?.apparentTemperature}
                        humidity={realTimeWeather?.humidity}
                        pressure={realTimeWeather?.pressure}
                        uvIndex={futureWeatherForecast?.[0]?.uvIndex}
                    />
                </View>
                <WeatherIndexSummary coordinate={geolocationResult} style={{
                    marginHorizontal: 18,
                    marginTop: 8
                }}/>
                {/*<List.Section title="基本天气">*/}
                {/*    <List.Item*/}
                {/*        title="当前小时累计降水量"*/}
                {/*        description={`${realTimeWeather?.precipitation} mm`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="能见度"*/}
                {/*        description={`${realTimeWeather?.visibility} km`}*/}
                {/*    />*/}
                {/*</List.Section>*/}
                {/*<List.Section title="空气质量">*/}
                {/*    <List.Item*/}
                {/*        title="污染等级"*/}
                {/*        description={`${realTimeAQI?.pollutionLevel} 级`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="主要污染物"*/}
                {/*        description={realTimeAQI?.primaryPollutant}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="PM10"*/}
                {/*        description={`${realTimeAQI?.pm10} μg/m³`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="PM2.5"*/}
                {/*        description={`${realTimeAQI?.pm2p5} μg/m³`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="二氧化氮"*/}
                {/*        description={`${realTimeAQI?.no2} μg/m³`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="二氧化硫"*/}
                {/*        description={`${realTimeAQI?.so2} μg/m³`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="一氧化碳"*/}
                {/*        description={`${realTimeAQI?.co} mg/m³`}*/}
                {/*    />*/}
                {/*    <List.Item*/}
                {/*        title="臭氧"*/}
                {/*        description={`${realTimeAQI?.o3} μg/m³`}*/}
                {/*    />*/}
                {/*</List.Section>*/}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 20
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: "rgba(230,232,234, 0.5)",
                    }}>气象数据来自</Text>
                    <Text style={{
                        fontFamily: "qweather-icons",
                        color: "rgba(230,232,234, 0.5)",
                        fontSize: 12,
                        marginLeft: 4
                    }}>{"\uf20b"}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: "rgba(230,232,234, 0.5)",
                    }}>和风天气</Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
