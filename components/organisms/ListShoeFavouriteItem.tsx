import { MotiView } from 'moti'
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { InforShoesItem } from '../molecules/InforShoesItem'
import getColors from '~/constants/Colors'

interface Props {
    index:number
}
const ListShoeFavouriteItem = (props: Props) => {
    const colors=getColors(useColorScheme())
    return (
        <MotiView
            style={[styles.container, { backgroundColor: colors.white }]}
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: props.index * 200 }}>
            <Image
                source={require('~/assets/images/shoes3.png')}
                style={{
                    height: 100,
                    maxWidth: 120
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 12,
                    alignItems: "flex-end"
                }}>
                <InforShoesItem label='' />
            </View>
        </MotiView>
    )
}

export default ListShoeFavouriteItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 10,
        margin:10
      }
})