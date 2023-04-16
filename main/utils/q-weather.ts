const weatherIconCodes: {
    [key: string]: string
} = {
    "100": "\uf101",
    "101": "\uf102",
    "102": "\uf103",
    "103": "\uf104",
    "104": "\uf105",
    "150": "\uf106",
    "151": "\uf107",
    "152": "\uf108",
    "153": "\uf109",
    "300": "\uf10a",
    "301": "\uf10b",
    "302": "\uf10c",
    "303": "\uf10d",
    "304": "\uf10e",
    "305": "\uf10f",
    "306": "\uf110",
    "307": "\uf111",
    "308": "\uf112",
    "309": "\uf113",
    "310": "\uf114",
    "311": "\uf115",
    "312": "\uf116",
    "313": "\uf117",
    "314": "\uf118",
    "315": "\uf119",
    "316": "\uf11a",
    "317": "\uf11b",
    "318": "\uf11c",
    "350": "\uf11d",
    "351": "\uf11e",
    "399": "\uf11f",
    "400": "\uf120",
    "401": "\uf121",
    "402": "\uf122",
    "403": "\uf123",
    "404": "\uf124",
    "405": "\uf125",
    "406": "\uf126",
    "407": "\uf127",
    "408": "\uf128",
    "409": "\uf129",
    "410": "\uf12a",
    "456": "\uf12b",
    "457": "\uf12c",
    "499": "\uf12d",
    "500": "\uf12e",
    "501": "\uf12f",
    "502": "\uf130",
    "503": "\uf131",
    "504": "\uf132",
    "507": "\uf133",
    "508": "\uf134",
    "509": "\uf135",
    "510": "\uf136",
    "511": "\uf137",
    "512": "\uf138",
    "513": "\uf139",
    "514": "\uf13a",
    "515": "\uf13b",
    "800": "\uf13c",
    "801": "\uf13d",
    "802": "\uf13e",
    "803": "\uf13f",
    "804": "\uf140",
    "805": "\uf141",
    "806": "\uf142",
    "807": "\uf143",
    "900": "\uf1a1",
    "901": "\uf1a8",
    "999": "\uf146",
    "1001": "\uf147",
    "1002": "\uf148",
    "1003": "\uf149",
    "1004": "\uf14a",
    "1005": "\uf14b",
    "1006": "\uf14c",
    "1007": "\uf1fe",
    "1008": "\uf19a",
    "1009": "\uf14f",
    "1010": "\uf150",
    "1011": "\uf151",
    "1012": "\uf152",
    "1013": "\uf153",
    "1014": "\uf154",
    "1015": "\uf155",
    "1016": "\uf156",
    "1017": "\uf1ad",
    "1018": "\uf158",
    "1019": "\uf1fb",
    "1020": "\uf199",
    "1021": "\uf15b",
    "1022": "\uf193",
    "1023": "\uf15d",
    "1024": "\uf15e",
    "1025": "\uf1af",
    "1026": "\uf1c5",
    "1027": "\uf161",
    "1028": "\uf162",
    "1029": "\uf163",
    "1030": "\uf164",
    "1031": "\uf165",
    "1032": "\uf166",
    "1033": "\uf167",
    "1035": "\uf169",
    "1036": "\uf16a",
    "1037": "\uf16b",
    "1038": "\uf16c",
    "1039": "\uf16d",
    "1040": "\uf16e",
    "1041": "\uf16f",
    "1042": "\uf170",
    "1043": "\uf1b9",
    "1044": "\uf172",
    "1045": "\uf173",
    "1046": "\uf1bb",
    "1047": "\uf175",
    "1048": "\uf176",
    "1049": "\uf177",
    "1050": "\uf1b8",
    "1052": "\uf17a",
    "1053": "\uf17b",
    "1054": "\uf17c",
    "1055": "\uf17d",
    "1056": "\uf17e",
    "1057": "\uf17f",
    "1058": "\uf180",
    "1059": "\uf181",
    "1060": "\uf182",
    "1061": "\uf183",
    "1062": "\uf184",
    "1063": "\uf185",
    "1064": "\uf186",
    "1065": "\uf187",
    "1066": "\uf188",
    "1067": "\uf18f",
    "1068": "\uf18a",
    "1069": "\uf18b",
    "1071": "\uf18c",
    "1072": "\uf18d",
    "1073": "\uf1a6",
    "1075": "\uf190",
    "1079": "\uf19c",
    "1080": "\uf1a2",
    "1081": "\uf196",
    "1082": "\uf197",
    "1089": "\uf19d",
    "1302": "\uf19f",
    "1402": "\uf1a0",
    "1603": "\uf1a3",
    "1604": "\uf1a4",
    "1605": "\uf1a5",
    "1702": "\uf1a9",
    "1703": "\uf1b0",
    "2001": "\uf1ab",
    "2002": "\uf1ac",
    "2004": "\uf1ae",
    "2007": "\uf1b1",
    "2008": "\uf1b2",
    "2009": "\uf1b3",
    "2010": "\uf1b4",
    "2011": "\uf1c4",
    "2012": "\uf1b6",
    "2013": "\uf1b7",
    "2016": "\uf1ba",
    "2018": "\uf1bc",
    "2019": "\uf1bd",
    "2020": "\uf1be",
    "2021": "\uf1bf",
    "2022": "\uf1c0",
    "2023": "\uf1c1",
    "2024": "\uf1c2",
    "2025": "\uf1c3",
    "2028": "\uf1c6",
    "2052": "\uf1c7",
    "2053": "\uf1c8",
    "2054": "\uf1c9",
    "9998": "\uf1ca",
    "9999": "\uf1cb",
    "100-fill": "\uf1cc",
    "101-fill": "\uf1cd",
    "102-fill": "\uf1ce",
    "103-fill": "\uf1cf",
    "104-fill": "\uf1d0",
    "150-fill": "\uf1d1",
    "151-fill": "\uf1d2",
    "152-fill": "\uf1d3",
    "153-fill": "\uf1d4",
    "300-fill": "\uf1d5",
    "301-fill": "\uf1d6",
    "302-fill": "\uf1d7",
    "303-fill": "\uf1d8",
    "304-fill": "\uf1d9",
    "305-fill": "\uf1da",
    "306-fill": "\uf1db",
    "307-fill": "\uf1dc",
    "308-fill": "\uf1dd",
    "309-fill": "\uf1de",
    "310-fill": "\uf1df",
    "311-fill": "\uf1e0",
    "312-fill": "\uf1e1",
    "313-fill": "\uf1e2",
    "314-fill": "\uf1e3",
    "315-fill": "\uf1e4",
    "316-fill": "\uf1e5",
    "317-fill": "\uf1e6",
    "318-fill": "\uf1e7",
    "350-fill": "\uf1e8",
    "351-fill": "\uf1e9",
    "399-fill": "\uf1ea",
    "400-fill": "\uf1eb",
    "401-fill": "\uf1ec",
    "402-fill": "\uf1ed",
    "403-fill": "\uf1ee",
    "404-fill": "\uf1ef",
    "405-fill": "\uf1f0",
    "406-fill": "\uf1f1",
    "407-fill": "\uf1f2",
    "408-fill": "\uf1f3",
    "409-fill": "\uf1f4",
    "410-fill": "\uf1f5",
    "456-fill": "\uf1f6",
    "457-fill": "\uf1f7",
    "499-fill": "\uf1f8",
    "500-fill": "\uf1f9",
    "501-fill": "\uf1fa",
    "503-fill": "\uf1fc",
    "504-fill": "\uf1fd",
    "508-fill": "\uf1ff",
    "509-fill": "\uf200",
    "510-fill": "\uf201",
    "511-fill": "\uf202",
    "512-fill": "\uf203",
    "513-fill": "\uf204",
    "514-fill": "\uf205",
    "515-fill": "\uf206",
    "900-fill": "\uf207",
    "901-fill": "\uf208",
    "999-fill": "\uf209",
    "qweather-fill": "\uf20a",
    "qweather": "\uf20b"
}

export function weatherIconCodeToUnicode(iconCode: string, isFilled = false): string | undefined {
    const actualIconCode = isFilled ? `${iconCode}-fill` : iconCode

    return weatherIconCodes[actualIconCode]
}

export function weatherWarningSeverityColorNameToRGBColor(alertSeverityColorName: string): string {
    switch (alertSeverityColorName.toLowerCase()) {
        case "white":
            return "#ffffff"
        case "blue":
            return "#3265fe"
        case "green":
            return "#2eb82e"
        case "yellow":
            return "#f9ec23"
        case "orange":
            return "#f78c21"
        case "red":
            return "#d63128"
        case "black":
            return "#000000"
        default:
            return "#ffffff"
    }
}

export function weatherWarningSeverityColorNameToDescription(alertSeverityColorName: string): string {
    switch (alertSeverityColorName.toLowerCase()) {
        case "white":
            return "白色预警"
        case "blue":
            return "蓝色预警"
        case "green":
            return "绿色预警"
        case "yellow":
            return "黄色预警"
        case "orange":
            return "橙色预警"
        case "red":
            return "红色预警"
        case "black":
            return "黑色预警"
        default:
            return "预警"
    }
}

export function aqiNumberToColor(aqiNumber: string | number): string {
    const aqi = typeof aqiNumber === "string" ? parseInt(aqiNumber, 10) : aqiNumber

    if (aqi > 300) {
        return "#7e0022"
    } else if (aqi > 200) {
        return "#660099"
    } else if (aqi > 150) {
        return "#cc0133"
    } else if (aqi > 100) {
        return "#ff7e00"
    } else if (aqi > 50) {
        return "#ffde33"
    } else {
        return "#009966"
    }
}

export function iaqiCalculate(iaqiNumber: string | number, pollutantName: "so2" | "no2" | "pm10" | "co" | "o3" | "pm2p5"): number {
    const iaqi = typeof iaqiNumber === "string" ? parseInt(iaqiNumber, 10) : iaqiNumber
    const iaqiTable = [500, 400, 300, 200, 150, 100, 50, 0]
    const pollutantTables = {
        "so2": [2620, 2100, 1600, 800, 650, 500, 150, 0],
        "no2": [3840, 3090, 2340, 1200, 700, 200, 100, 0],
        "pm10": [600, 500, 420, 350, 250, 150, 50, 0],
        "co": [150, 120, 90, 60, 35, 10, 5, 0],
        "o3": [1200, 1000, 800, 400, 300, 200, 160, 0],
        "pm2p5": [500, 350, 250, 150, 115, 75, 35, 0]
    }

    const targetTable = pollutantTables[pollutantName]
    const targetIndex = targetTable.findIndex(n => iaqi >= n)

    return iaqiTable[targetIndex]
}
