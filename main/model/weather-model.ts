// ================================ Weather Model ================================
export interface WeatherResponse {
    code: string
    updateTime: string
    fxLink: string
    now?: WeatherNow
    refer?: Refer
}

export interface WeatherNow {
    obsTime: string
    temp: string
    feelsLike: string
    icon: string
    text: string
    wind360: string
    windDir: string
    windScale: string
    windSpeed: string
    humidity: string
    precip: string
    pressure: string
    vis: string
    cloud: string
    dew: string
}

export interface Refer {
    sources: string[]
    license: string[]
}

// ================================ AQI Model ================================

export interface AQIResponse {
    code: string
    updateTime: string
    fxLink: string
    now?: AQINow
    refer?: Refer
}

export interface AQINow {
    pubTime: string
    aqi: string
    level: string
    category: string
    primary: string
    pm10: string
    pm2p5: string
    no2: string
    so2: string
    co: string
    o3: string
}

// ================================ Precipitation Model ================================

export interface PrecipitationResponse {
    code: string
    updateTime: string
    fxLink: string
    summary?: string
    minutely?: Minutely[]
    refer?: Refer
}

export interface Minutely {
    fxTime: string
    precip: string
    type: string
}

// ================================ Future Weather Model ================================
export interface FutureWeatherResponse {
    code: string
    updateTime: string
    fxLink: string
    daily?: DailyWeatherResponse[]
    refer?: Refer
}

export interface DailyWeatherResponse {
    fxDate: string
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moonPhase: string
    moonPhaseIcon: string
    tempMax: string
    tempMin: string
    iconDay: string
    textDay: string
    iconNight: string
    textNight: string
    wind360Day: string
    windDirDay: string
    windScaleDay: string
    windSpeedDay: string
    wind360Night: string
    windDirNight: string
    windScaleNight: string
    windSpeedNight: string
    humidity: string
    precip: string
    pressure: string
    vis: string
    cloud: string
    uvIndex: string
}

// ================================ Future AQI Model ================================

export interface FutureAQIResponse {
    code: string
    updateTime: string
    fxLink: string
    daily?: DailyAQIResponse[]
    refer: Refer
}

export interface DailyAQIResponse {
    fxDate: string
    aqi: string
    level: string
    category: string
    primary: string
}

// ================================ Hourly Weather Model ================================

export interface HourlyWeatherResponse {
    code: string
    updateTime: string
    fxLink: string
    hourly?: HourlyWeatherDetailsResponse[]
    refer: Refer
}

export interface HourlyWeatherDetailsResponse {
    fxTime: string
    temp: string
    icon: string
    text: string
    wind360: string
    windDir: string
    windScale: string
    windSpeed: string
    humidity: string
    pop: string
    precip: string
    pressure: string
    cloud: string
    dew: string
}

// ================================ Weather Indices Model ================================

export interface WeatherIndicesResponse {
    code: string
    updateTime: string
    fxLink: string
    daily?: DailyWeatherIndex[]
    refer: Refer
}

export interface DailyWeatherIndex {
    date: string
    type: string
    name: string
    level: string
    category: string
    text: string
}

// ================================ Weather Alerts Model ================================

export interface WeatherWarningResponse {
    code: string
    updateTime: string
    fxLink: string
    warning?: WeatherWarning[]
    refer: Refer
}

export interface WeatherWarning {
    id: string
    sender: string
    pubTime: string
    title: string
    startTime: string
    endTime: string
    status: string
    level: string
    severity: string
    severityColor: string
    type: string
    typeName: string
    urgency: string
    certainty: string
    text: string
    related: string
}
