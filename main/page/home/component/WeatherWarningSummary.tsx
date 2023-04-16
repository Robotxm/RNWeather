import * as React from "react";
import {View} from "react-native";
import {Coordinate, WeatherWarning} from "../../../model/app-model";
import {Text} from "react-native-paper";
import {weatherWarningSeverityColorNameToDescription, weatherWarningSeverityColorNameToRGBColor, weatherIconCodeToUnicode} from "../../../utils/q-weather";
import {useEffect, useState} from "react";
import {getWeatherWarnings} from "../../../network/weather-api";

export declare type WeatherWarningSummaryProps = React.ComponentPropsWithRef<typeof View> & {
    coordinate?: Coordinate
}

export function WeatherWarningSummary(props: WeatherWarningSummaryProps) {
    const [weatherWarnings, setWeatherWarnings] = useState<WeatherWarning[]>([])

    useEffect(() => {
        if (props.coordinate) {
            fetchWeatherWarning(props.coordinate.longitude, props.coordinate.latitude).then((response) => {
                if (response.warning) {
                    setWeatherWarnings(response.warning.map((warning) => ({
                        id: warning.id,
                        title: warning.title,
                        typeCode: warning.type,
                        typeName: warning.typeName,
                        severity: warning.severity,
                        severityColorName: warning.severityColor,
                        content: warning.text
                    })))
                }
            })
        }
    }, [props.coordinate])

    const fetchWeatherWarning = (longitude: number, latitude: number) => getWeatherWarnings(longitude, latitude)

    return (
        <View style={{marginBottom: weatherWarnings.length > 0 ? 8 : 0, ...props.style}}>
            {
                weatherWarnings.map((weatherWarning) => (
                    <WeatherWarningItem key={weatherWarning.id} weatherWarning={weatherWarning}/>
                ))
            }
        </View>
    )
}

declare type WeatherWarningItemProps = React.ComponentPropsWithRef<typeof View> & {
    weatherWarning: WeatherWarning
}

function WeatherWarningItem(props: WeatherWarningItemProps) {
    return (
        <View {...props} style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderWidth: 0,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 16,
            gap: 6
        }}>
            <Text style={{
                fontFamily: "qweather-icons",
                color: weatherWarningSeverityColorNameToRGBColor(props.weatherWarning.severityColorName),
                fontSize: 24
            }}>{weatherIconCodeToUnicode(props.weatherWarning.typeCode)}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{
                color: "white",
                fontSize: 18,
                width: "100%",
                fontFamily: "sans-serif-medium",
                flex: 1
            }}>
                {
                    `${props.weatherWarning.typeName}${weatherWarningSeverityColorNameToDescription(props.weatherWarning.severityColorName)}：${props.weatherWarning.title}`
                }
            </Text>
        </View>
    )
}
