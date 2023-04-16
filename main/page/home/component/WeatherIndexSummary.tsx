import * as React from "react";
import {View} from "react-native"
import {Coordinate, WeatherIndex} from "../../../model/app-model"
import {Text} from "react-native-paper"
import Fontisto5Icon from "react-native-vector-icons/Fontisto"
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import {useEffect, useState} from "react";
import {getWeatherIndices} from "../../../network/weather-api";

export declare type WeatherIndexSummaryProps = React.ComponentPropsWithRef<typeof View> & {
    coordinate?: Coordinate
}

export function WeatherIndexSummary(props: WeatherIndexSummaryProps) {
    const [weatherIndices, setWeatherIndices] = useState<WeatherIndex[]>([])

    useEffect(() => {
        if (props.coordinate) {
            fetchWeatherIndices(props.coordinate.longitude, props.coordinate.latitude).then((response) => {
                if (response.daily) {
                    setWeatherIndices(response.daily?.map((daily) => ({
                        name: daily.name,
                        category: daily.category,
                        description: daily.text,
                    })))
                }
            })
        }
    }, [props.coordinate])

    const fetchWeatherIndices = (longitude: number, latitude: number) => getWeatherIndices(longitude, latitude)

    return (
        <View {...props} style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderWidth: 0,
            flex: 1,
            justifyContent: "center",
            borderRadius: 12,

            ...props.style
        }}>
            <View style={{
                flexDirection: "row",
                flex: 1,
                borderBottomColor: "rgba(255,255,255,0.1)",
                borderBottomWidth: 1,
            }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.1)",
                    padding: 24
                }}>
                    <IoniconsIcon name="shirt-outline" size={36} color="white"/>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        marginTop: 8
                    }}>{weatherIndices[2]?.name?.replace("指数", "")}{weatherIndices[2]?.category}</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.1)",
                    padding: 24
                }}>
                    <IoniconsIcon name="shield-outline" size={36} color="white"/>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        marginTop: 8
                    }}>{weatherIndices[3]?.name?.replace("指数", "")}{weatherIndices[3]?.category}</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 24
                }}>
                    <IoniconsIcon name="basketball-outline" size={36} color="white"/>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        marginTop: 8
                    }}>{weatherIndices[0]?.category}{weatherIndices[0]?.name?.replace("指数", "")}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.1)",
                    padding: 24
                }}>
                    <IoniconsIcon name="car-sport-outline" size={36} color="white"/>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        marginTop: 8
                    }}>{weatherIndices[1]?.category}{weatherIndices[1]?.name?.replace("指数", "")}</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.1)",
                    padding: 24
                }}>
                    <Fontisto5Icon name="pills" size={26} color="white" style={{
                        padding: 6
                    }}/>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        marginTop: 8
                    }}>{weatherIndices[4]?.category}{weatherIndices[4]?.name?.replace("指数", "")}</Text>
                </View>
                <View style={{
                    flex: 1,
                    padding: 24
                }} />
            </View>
        </View>
    )
}
