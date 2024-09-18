import React from 'react'
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, useColorScheme, View } from 'react-native'

import getColors from '~/constants/Colors'

type Props = {
    isSelected?: boolean
    icon: number | React.ReactElement
} & TouchableOpacityProps

export const ButtonRenderBranch = (props: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.button, {
                backgroundColor: colors.white,
                height: props.isSelected === true ? 25 : null,
                width: props.isSelected === true ? 25 : null
            }]}

        >
            <View
                style={{ padding: typeof props.icon === 'number' ? 8 : 0 }}>

                {typeof props.icon === 'number'
                    ? (
                        <Image
                            source={props.icon}
                            style={{
                                height: props.isSelected === true ? 20 : 25,
                                width: props.isSelected === true ? 20 : 25
                            }}
                            resizeMode="contain"
                        />)
                    : (props.icon)}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    }
})