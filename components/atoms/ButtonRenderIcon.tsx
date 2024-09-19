import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import getColors from '~/constants/Colors'

interface Props {
    icon: React.ReactElement,
    onPress?: void
}
const ButtonRenderIcon = (props: Props) => {
    const colors = getColors(useColorScheme())
    return (
        <TouchableOpacity
            onPress={()=>props.onPress}
            style={[styles.iconButton, { backgroundColor: colors.white }]}
        >
            {props.icon}
        </TouchableOpacity>
    )
}

export default ButtonRenderIcon

const styles = StyleSheet.create({
    iconButton: {
        padding: 10,
        borderRadius: 50,
        alignSelf: 'baseline',
    },
    infoContainer: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
})