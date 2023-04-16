import {Appbar, Divider, Text, useTheme} from "react-native-paper"
import * as React from "react"
import {StatusBar, useColorScheme, View} from "react-native"
import dayjs from "dayjs"
import {useNavigation, useRoute} from "@react-navigation/native"
import {ScrollableDailyAQIChart} from "./component/ScrollableDailyAQIChart"
import {aqiNumberToColor, iaqiCalculate} from "../../utils/q-weather";

export function AirQuality() {
    const theme = useTheme()
    const colorScheme = useColorScheme()
    const route = useRoute()

    const navigation = useNavigation()

    const isDarkMode = colorScheme === "dark"

    return (
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
                    <View style={{
                        paddingTop: 16
                    }}>
                        <Text style={{
                            fontSize: 36,
                            fontWeight: "normal"
                        }}>
                            空气质量
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface,
                            fontSize: 16
                        }}>
                            {`${route.params.coordinate?.district} ${route.params.coordinate?.street} ${dayjs(route.params.realTimeAQI?.updatedTime).format("HH:mm")} 发布`}
                        </Text>
                    </View>
                }/>
            </Appbar.Header>
            <View style={{
                marginTop: 32
            }}>
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: 16,
                    alignItems: "baseline",
                    gap: 12
                }}>
                    <Text style={{
                        fontSize: 64,
                        color: aqiNumberToColor(route.params.realTimeAQI?.aqiNumber),
                    }}>
                        {route.params.realTimeAQI?.aqiNumber}
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: "sans-serif-medium",
                        color: aqiNumberToColor(route.params.realTimeAQI?.aqiNumber),
                    }}>
                        {route.params.realTimeAQI?.airQuality}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: 16,
                    alignItems: "center",
                    marginTop: 18
                }}>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.pm2p5, "pm2p5"))
                        }}>
                            {route.params.realTimeAQI?.pm2p5}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            PM2.5
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.pm10, "pm10"))
                        }}>
                            {route.params.realTimeAQI?.pm10}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            PM10
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.so2, "so2"))
                        }}>
                            {route.params.realTimeAQI?.so2}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            SO₂
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.no2, "no2"))
                        }}>
                            {route.params.realTimeAQI?.no2}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            NO₂
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.o3, "o3"))
                        }}>
                            {route.params.realTimeAQI?.o3}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            O₃
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "sans-serif-medium",
                            color: aqiNumberToColor(iaqiCalculate(route.params.realTimeAQI?.co, "co"))
                        }}>
                            {route.params.realTimeAQI?.co}
                        </Text>
                        <Text style={{
                            color: theme.colors.onSurface
                        }}>
                            CO
                        </Text>
                    </View>
                </View>
                <Divider style={{
                    marginHorizontal: 16,
                    marginTop: 24
                }}/>
                <Text style={{
                    marginHorizontal: 16,
                    fontFamily: "sans-serif-medium",
                    fontSize: 18,
                    marginTop: 24,
                    color: theme.colors.onSurfaceVariant
                }}>
                    5 天空气质量预报
                </Text>
                <ScrollableDailyAQIChart dailyAQIForecast={route.params.futureAQIForecast}/>
            </View>
        </View>
    )
}
