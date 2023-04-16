import {Card, Divider, Text} from "react-native-paper";
import {View} from "react-native";
import * as React from "react";

export declare type MoreWeatherDetailsProps = {
    humidity?: string,
    apparentTemperature?: string,
    uvIndex?: string,
    pressure?: string,
}

export function MoreWeatherDetails(props: MoreWeatherDetailsProps) {
    return (
        <Card mode="contained" {...props} style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderWidth: 0,
            flex: 1,
            justifyContent: "center"
        }}>
            <Card.Content>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View style={{
                        flexDirection: "row",
                        marginVertical: 8,
                        alignItems: "center",
                        marginTop: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "white"
                        }}>湿度</Text>
                        <Text style={{
                            fontSize: 18,
                            textAlign: "right",
                            color: "white",
                            fontFamily: "sans-serif-medium",
                        }}>{`${props.humidity}%`}</Text>
                    </View>
                    <View style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        marginTop: -6
                    }} />
                    <View style={{
                        flexDirection: "row",
                        marginVertical: 8,
                        alignItems: "center",
                        marginTop: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "white"
                        }}>体感</Text>
                        <Text style={{
                            fontSize: 18,
                            color: "white",
                            fontFamily: "sans-serif-medium",
                        }}>{`${props.apparentTemperature}℃`}</Text>
                    </View>
                    <View style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        marginTop: -6
                    }} />
                    <View style={{
                        flexDirection: "row",
                        marginVertical: 8,
                        alignItems: "center",
                        marginTop: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "white"
                        }}>紫外线</Text>
                        <Text style={{
                            fontSize: 18,
                            color: "white",
                            fontFamily: "sans-serif-medium",
                        }}>{props.uvIndex}</Text>
                    </View>
                    <View style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        marginTop: -6
                    }} />
                    <View style={{
                        flexDirection: "row",
                        marginVertical: 8,
                        alignItems: "center",
                        marginTop: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "white"
                        }}>气压</Text>
                        <Text style={{
                            fontSize: 18,
                            color: "white",
                            fontFamily: "sans-serif-medium",
                        }}>{`${props.pressure} hPa`}</Text>
                    </View>
                    <View style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        marginTop: -6
                    }} />
                </View>
            </Card.Content>
        </Card>
    )
}
