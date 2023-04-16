import {
    AQIResponse,
    FutureAQIResponse,
    FutureWeatherResponse,
    HourlyWeatherResponse,
    PrecipitationResponse,
    WeatherIndicesResponse,
    WeatherResponse, WeatherWarningResponse
} from '../model/weather-model'
import {qWeatherApiKey, qWeatherBaseUrl} from "./api-config";

export function getRealTimeWeather(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/weather/now?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as WeatherResponse)
}

export function getRealTimeAQI(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/air/now?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as AQIResponse)
}

export function getPrecipitation(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/minutely/5m?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as PrecipitationResponse)
}

export function getFutureWeather(longitude: number, latitude: number, days: 3 | 7 | 10 | 15 | 30) {
    return fetch(`${qWeatherBaseUrl}/weather/${days}d?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as FutureWeatherResponse)
}

export function getFutureAQIInFiveDays(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/air/5d?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as FutureAQIResponse)
}

export function getFutureWeatherIn24Hours(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/weather/24h?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as HourlyWeatherResponse)
}

export function getWeatherIndices(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/indices/1d?type=3,5,1,2,9&location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as WeatherIndicesResponse)
}

export function getWeatherWarnings(longitude: number, latitude: number) {
    return fetch(`${qWeatherBaseUrl}/warning/now?location=${longitude},${latitude}&key=${qWeatherApiKey}`)
        .then(response => response.json() as any as WeatherWarningResponse)
}
