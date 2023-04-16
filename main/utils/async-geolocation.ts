import {Geolocation, ILocation} from "react-native-s-baidumap";

const {geolocation} = Geolocation

export declare type GeolocationResult = ILocation & {
    addrStr: string
    locationType: string
}

export function getCurrentPositionAsync(continuous = false): Promise<GeolocationResult> {
    return new Promise((resolve, reject) => {
        // noinspection JSVoidFunctionReturnValueUsed
        const geolocationListener: any = geolocation.addListener(result => {
            if (result) {
                const actualResult = result as GeolocationResult
                const isSuccessful = actualResult.locationType == "61" || actualResult.locationType == "161" // 61 - GPS, 161 - Network
                if (isSuccessful) {
                    resolve(actualResult)
                } else {
                    reject(actualResult)
                }

                if (!continuous) {
                    geolocationListener.remove()
                    geolocation.stop()
                }
            }
        })
        geolocation.start()
    })
}
