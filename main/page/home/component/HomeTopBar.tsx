import {Appbar, Text} from "react-native-paper"
import * as React from "react"
import {View} from "react-native"

export declare type HomeTopBarProps = React.ComponentPropsWithRef<typeof View> & {
    district?: string,
    street?: string,
}

export default function HomeTopBar(props: HomeTopBarProps) {
    const fullRegionName = props.district && props.street ? `${props.district} ${props.street}`
        : (props.district ?? props.street)

    return (
        <Appbar.Header mode="center-aligned" style={{
            backgroundColor: "transparent",
        }}>
            <Appbar.Content title={<Text style={{
                fontFamily: "sans-serif-medium",
                color: "white",
                fontSize: 22
            }}>{fullRegionName}</Text>} color={"white"}/>
        </Appbar.Header>
    )
}
