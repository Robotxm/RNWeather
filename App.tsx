import React, {useEffect} from 'react'
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native'

import Home from './main/page/home/Home'
import {Geolocation} from 'react-native-s-baidumap'
import {baiduGeolocationApiKey} from './main/network/api-config'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Toast from "react-native-toast-message"
import {AirQuality} from "./main/page/air-quality/AirQuality"
import {Button, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Text} from "react-native-paper"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {SevenDaysWeatherForcast} from "./main/page/seven-days-weather-forcast/SevenDaysWeatherForcast";

const {geolocation} = Geolocation;

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
    const colorScheme = useColorScheme()

    const paperTheme =
        colorScheme === "dark"
            ? MD3DarkTheme
            : MD3LightTheme;

    useEffect(() => {
        console.log('init Baidu SDK')
        geolocation.initSDK(baiduGeolocationApiKey)
        geolocation.setOptions({
            scanSpan: 2000,
            coorType: 3
        });
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <PaperProvider theme={paperTheme}>
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Home"
                                      component={Home}
                                      options={() => ({
                                          headerShown: false
                                      })}/>
                        <Stack.Screen name="AirQuality" component={AirQuality}/>
                        <Stack.Screen name="SevenDaysWeatherForcast" component={SevenDaysWeatherForcast}/>
                    </Stack.Navigator>
                    <Toast/>
                </PaperProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
