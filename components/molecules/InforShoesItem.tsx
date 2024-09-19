import React from 'react'
import { Text, useColorScheme, View, ViewProps } from 'react-native'
import useTranslation from '~/hooks/useTranslation'

import getColors from '~/constants/Colors'

type Props = {
    label?: string
    nameShoes?: string
    priceShoes?: string
} & ViewProps

export const InforShoesItem = (props: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())
    const { t } = useTranslation()

    return (
        <View style={{ gap: 8, paddingRight: 21, paddingBottom: 12 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: colors.cornflowerBlue
              }}>{t('home.bestSeller')}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: colors.midnightBlue
              }}>Nike Jordan</Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: colors.midnightBlue
              }}>$493.00</Text>
        </View >
    )
}