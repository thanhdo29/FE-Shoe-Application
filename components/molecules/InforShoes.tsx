import React from 'react'
import { Text, useColorScheme, View, ViewProps } from 'react-native'

import getColors from '~/constants/Colors'

type Props = {
    label: string
    nameShoes: string
    priceShoes: string
} & ViewProps

export const InforShoes = (props: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())
    return (
        <View {...props}>
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.cornflowerBlue
                }}>{props.label}</Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: colors.midnightBlue
                }}>{props.nameShoes}</Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: colors.midnightBlue
                }}>${props.priceShoes}</Text>
        </View >
    )
}