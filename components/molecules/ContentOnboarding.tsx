import getColors from '~/constants/Colors'
import React from 'react'
import { StyleSheet, Text, useColorScheme, View, ViewProps } from 'react-native'

type Props = {
    title: string
    des: string
} & ViewProps

export const ContentOnboarding = (props: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())
    return (
        <View
            {...props}
        >
            <Text style={[styles.title, { color: colors.midnightBlue }]}>{props.title}</Text>
            <View style={{ marginTop: 8 }} />
            <Text style={[styles.des, { color: colors.slateGray }]}>{props.des}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: '500',
        lineHeight: 56,
    },
    des: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 32,
    }
})
