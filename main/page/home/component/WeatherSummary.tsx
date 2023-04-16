import * as React from "react"
import {TouchableOpacity, View} from "react-native"
import {Text} from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from "@react-navigation/native";
import {DailyAQIForecast, GeolocationResult, RealTimeAQI} from "../../../model/app-model";

export declare type WeatherSummaryProps = React.ComponentPropsWithRef<typeof View> & {
    currentTemperature?: string,
    currentWeatherDescription?: string,
    currentAirQuality?: string,
    currentAQI?: string,
    maxTemperature?: string,
    minTemperature?: string,
    precipitationDescription?: string,
    futureAQIForecast: DailyAQIForecast[],

    realTimeAQI?: RealTimeAQI,
    coordinate?: GeolocationResult
}
export default function WeatherSummary(props: WeatherSummaryProps) {
    const navigation = useNavigation()

    return (
        <View {...props}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 84
            }}>
                <Text style={{
                    fontSize: 128,
                    fontFamily: "sans-serif-medium",
                    color: "white"
                }}>{props.currentTemperature ?? "--"}</Text>
                <Text style={{
                    fontSize: 32,
                    fontFamily: "sans-serif-medium",
                    marginTop: 24,
                    marginLeft: 4,
                    display: props.currentTemperature ? "flex" : "none",
                    color: "white"
                }}>℃</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: -10
            }}>
                <Text style={{
                    fontFamily: "sans-serif-medium",
                    fontSize: 18,
                    color: "white"
                }}>{props.currentWeatherDescription}</Text>
                <Text style={{
                    fontFamily: "sans-serif-medium",
                    fontSize: 18,
                    marginLeft: 8,
                    color: "white",
                    display: props.maxTemperature ? "flex" : "none"
                }}>{`${props.maxTemperature}℃`}</Text>
                <Text style={{
                    fontFamily: "sans-serif-medium",
                    fontSize: 18,
                    display: props.minTemperature && props.maxTemperature ? "flex" : "none",
                    color: "rgba(255,255,255,0.5)"
                }}>/</Text>
                <Text style={{
                    fontFamily: "sans-serif-medium",
                    fontSize: 18,
                    color: "white",
                    display: props.minTemperature ? "flex" : "none"
                }}>{`${props.minTemperature}℃`}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 18,
                gap: 12
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("AirQuality", {
                        realTimeAQI: props.realTimeAQI,
                        coordinate: props.coordinate,
                        futureAQIForecast: props.futureAQIForecast
                    })
                }}>
                    <View style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 1024,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        display: props.realTimeAQI?.aqiNumber || props.realTimeAQI?.airQuality ? "flex" : "none",
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center"
                    }}>
                        <Icon name="leaf" color="white"/>
                        <Text style={{
                            color: "white",
                            fontFamily: "sans-serif-medium",
                            fontSize: 16
                        }}>
                            {props.realTimeAQI?.aqiNumber && props.realTimeAQI.airQuality ? `空气${props.realTimeAQI.airQuality} ${props.realTimeAQI.aqiNumber}` :
                                (props.realTimeAQI?.aqiNumber ? `空气${props.realTimeAQI.airQuality}` : `AQI ${props.realTimeAQI?.aqiNumber}`)}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 1024,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    display: props.precipitationDescription ? "flex" : "none",
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontFamily: "qweather-icons",
                        color: "white",
                    }}>{"\uf1ea"}</Text>
                    <Text style={{
                        color: "white",
                        fontFamily: "sans-serif-medium",
                        fontSize: 16
                    }}>{props.precipitationDescription}</Text>
                </View>
            </View>
        </View>
    );
}
