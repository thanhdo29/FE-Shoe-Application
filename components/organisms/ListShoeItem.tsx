import { MotiView } from 'moti'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, useColorScheme, View } from 'react-native'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'
import { ButtonAdd } from '../atoms/ButtonAdd'

interface Props {
  dataShoes: any
}

export const ListShoesItem = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()

  const renderItemList = (index: number, item: any): React.ReactElement => {
    return (
      <MotiView
        style={[styles.container, { backgroundColor: colors.white }]}
        from={{ opacity: 0, translateX: 50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: index * 200 }}>
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
          </View>
          <ButtonAdd style={{ alignSelf: "flex-end" }} />
        </View>
      </MotiView>
    )
  }

  return (
    <FlatList
      horizontal
      data={props.dataShoes}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => renderItemList(index, item)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    marginRight: 12
  }
})