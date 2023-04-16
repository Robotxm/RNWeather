import {Card, Text} from "react-native-paper";
import {View} from "react-native";
import * as React from "react";

export declare type SunriseSunsetSummaryProps = {
    sunriseTime?: string,
    sunsetTime?: string,
}

export function SunriseSunsetSummary(props: SunriseSunsetSummaryProps) {
    return (
        <Card mode="contained" {...props} style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderWidth: 0,
            flex: 1,
            justifyContent: "center"
        }}>
            <Card.Content>
                <View style={{
                    flexDirection: "row",
                }}>
                    <View style={{
                        flex: 1,
                        gap: 4
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                fontFamily: "sans-serif-medium",
                                flex: 0.9
                            }}>{props.sunriseTime}</Text>
                            <Text style={{
                                color: "white",
                            }}>日出</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                fontFamily: "sans-serif-medium",
                                flex: 0.9
                            }}>{props.sunsetTime}</Text>
                            <Text style={{
                                color: "white"
                            }}>日落</Text>
                        </View>
                    </View>
                    <View  style={{
                        flex: 1
                    }}>

                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}
