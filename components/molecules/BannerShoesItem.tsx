import React from 'react'
import { Image, useColorScheme, View, ViewProps } from 'react-native'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'
import { InforShoes } from './InforShoes'

type Props = {
    label: string
    nameShoes: string
    price: string
} & ViewProps

export const BannerShoesItem = (props: Props): React.ReactElement => {
    const colors = getColors(useColorScheme())
    const { t } = useTranslation()

    return (
        <View
            style={{
                alignItems: "center",
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: colors.white
            }}>
            <InforShoes
                style={{
                    gap: 8,
                    flex: 1
                }}
                label={t('home.' + props.label)}
                nameShoes={props.nameShoes}
                priceShoes={props.price} />
            <Image
                source={require('~/assets/images/shoes2.png')}
                style={
                    {
                        flex: 1,
                        aspectRatio: 1,
                        maxHeight: 90,
                        maxWidth: 120,
                        resizeMode: "contain"
                    }} />
        </View>
    )
}