import {Text} from "react-native-paper"
import * as React from "react"
import {View} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'

export declare type WindSummaryProps = {
    windDirection?: string,
    windScale?: string,
    windDirectionDegree?: string,
}

export function WindSummary(props: WindSummaryProps) {
    return (
        <View {...props} style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderWidth: 0,
            flex: 1,
            justifyContent: "center",
            borderRadius: 12,

            paddingVertical: 12,
            paddingHorizontal: 18
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
            }}>
                <View style={{
                    flex: 1,
                    gap: 4
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: "white",
                        fontFamily: "sans-serif-medium",
                    }}>{props.windDirection}</Text>
                    <Text style={{
                        fontSize: 18,
                        color: "white",
                        fontFamily: "sans-serif-medium",
                    }}>{`${props.windScale} 级`}</Text>
                </View>
                <View style={{
                    borderColor: "rgba(230,232,234, 0.3)",
                    borderWidth: 2,
                    borderRadius: 1024,
                    height: 64,
                    width: 64,
                    paddingVertical: 1,
                    paddingHorizontal: 2,

                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 12,
                        color: "rgba(230,232,234, 0.8)"
                    }}>北</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "rgba(230,232,234, 0.8)"
                        }}>西</Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "rgba(230,232,234, 0.8)"
                        }}>东</Text>
                    </View>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 12,
                        color: "rgba(230,232,234, 0.8)"
                    }}>南</Text>
                    <Icon name="location-arrow" color="white" size={20} style={{
                        position: "absolute",
                        marginTop: 20,
                        marginLeft: 20,
                        transform: [{ rotate: `${parseInt(props.windDirectionDegree ?? "0", 10) - 45 - 180}deg`}]
                    }}/>
                </View>
            </View>
        </View>
    )
}
