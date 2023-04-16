export interface GeolocationResult {
    city: string
    district: string
    street: string
    longitude: number
    latitude: number
}

export interface Coordinate {
    longitude: number
    latitude: number
}

export interface RealTimeWeather {
    description: string
    temperature: string
    apparentTemperature: string
    windDirection: string
    windDirectionDegree: string
    windScale: string
    windSpeed: string
    humidity: string
    precipitation: string
    pressure: string
    visibility: string
}

export interface RealTimeAQI {
    aqiNumber: string
    pollutionLevel: string
    airQuality: string
    primaryPollutant: string
    pm10: string
    pm2p5: string
    no2: string
    so2: string
    /**
     * mg/m3
     */
    co: string
    o3: string
    updatedTime: string
}

export interface Precipitation {
    description?: string
}

export interface DailyWeatherForecast {
    date: string
    sunriseTime: string
    sunsetTime: string
    moonriseTime: string
    moonsetTime: string
    maxTemperature: string
    minTemperature: string
    dayWeatherDescription: string
    nightWeatherDescription: string
    uvIndex: string
    dayWeatherIconCode: string
    nightWeatherIconCode: string
    dayWindDirection: string
    dayWindDirectionDegree: string
    dayWindScale: string
    nightWindDirection: string
    nightWindDirectionDegree: string
    nightWindScale: string
}

export interface DailyAQIForecast {
    aqiNumber: string
    pollutionLevel: string
    airQuality: string
    date: string
}

export interface HourlyWeatherForecast {
    temperature: string
    weatherIconCode: string
    time: string
    windScaleRange: string
}

export interface WeatherIndex {
    name: string
    category: string
    description: string
}

export interface WeatherWarning {
    id: string
    title: string
    typeCode: string
    typeName: string
    severity: string
    severityColorName: string
    content: string
}
