import * as React from "react"
import {View} from "react-native"
import {Coordinate, HourlyWeatherForecast} from "../../../model/app-model"
import {getFutureWeatherIn24Hours} from "../../../network/weather-api"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {Card, Text} from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {ScrollableHourslyTempratureChart} from "./ScrollableHourslyTempratureChart";

export declare type HourlyWeatherSummaryProps = React.ComponentPropsWithRef<typeof View> & {
    coordinate?: Coordinate
}

export function HourlyWeatherSummary(props: HourlyWeatherSummaryProps) {
    const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherForecast[]>([])

    useEffect(() => {
        if (props.coordinate?.longitude && props.coordinate?.latitude) {
            fetchHourlyWeather(props.coordinate?.longitude, props.coordinate?.latitude)
                .then((response) => {
                    if (response.hourly) {
                        setHourlyWeather(response.hourly.map(h => ({
                            time: dayjs(h.fxTime).format("HH:mm"),
                            temperature: h.temp,
                            weatherIconCode: h.icon,
                            windScaleRange: h.windScale
                        })))
                    }
                })
        }
    }, [props.coordinate?.latitude, props.coordinate?.latitude])

    const fetchHourlyWeather = (longitude: number, latitude: number) => getFutureWeatherIn24Hours(longitude, latitude)


    return (
        <View {...props}>
            <Card mode="contained" style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderWidth: 0
            }}>
                <Card.Title title={
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8
                    }}>
                        <MaterialCommunityIcons name="clock-time-nine" size={18} color="rgba(230,232,234, 0.8)"/>
                        <Text style={{
                            fontFamily: "sans-serif-medium",
                            fontSize: 16,
                            color: "rgba(230,232,234, 0.8)"
                        }}>24 小时预报</Text>
                    </View>
                } style={{
                    marginTop: 4
                }}/>
                <Card.Content style={{
                    gap: 32,
                    paddingVertical: 24,
                    paddingHorizontal: 0
                }}>
                    <ScrollableHourslyTempratureChart hourlyWeather={hourlyWeather}/>
                </Card.Content>
            </Card>
        </View>
    )
}
