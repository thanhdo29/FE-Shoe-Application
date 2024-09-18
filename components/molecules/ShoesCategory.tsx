import React from 'react'
import { Text, TextProps, TouchableOpacity, useColorScheme, View, ViewProps, StyleSheet } from 'react-native'
import getColors from '~/constants/Colors'

type Props = {
    leftText: string
    rightText?: string
    containerStyle?: ViewProps['style']
    leftTextStyle?: TextProps['style']
    rightTextStyle?: TextProps['style']
} & ViewProps

export const ShoesCategory = ({ 
    leftText, 
    rightText, 
    containerStyle, 
    leftTextStyle, 
    rightTextStyle, 
    ...rest 
}: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())

    return (
        <View
            {...rest}
            style={[styles.container, containerStyle]} // Áp dụng style cho View
        >
            <Text
                style={[styles.leftText, leftTextStyle]} // Áp dụng style riêng cho Text
            >
                {leftText}
            </Text>
            {rightText && (
                <TouchableOpacity>
                    <Text
                        style={[styles.rightText, rightTextStyle, { color: colors.cornflowerBlue }]} // Áp dụng style cho rightText
                    >
                        {rightText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftText: {
        fontWeight: '500',
        lineHeight: 24,
    },
    rightText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 16,
    },
})
