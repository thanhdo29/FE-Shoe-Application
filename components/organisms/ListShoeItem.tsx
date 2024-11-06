import { MotiView } from 'moti'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'
import { ButtonAdd } from '../atoms/ButtonAdd'
import { useRouter } from 'expo-router'
import { InforShoesItem } from '../molecules/InforShoesItem'

interface Props {
  dataShoes: any
}

export const ListShoesItem = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()

  const router = useRouter()

  const redirectToDetail = (item: any): void => {
    router.push({
      pathname: '/product/Detail',
      params: { item: JSON.stringify(item) }, 
    });
  }


  const renderItemList = (index: number, item: any): React.ReactElement => {
    return (
      <TouchableOpacity onPress={() => redirectToDetail(item)}>
        <MotiView
        style={[styles.container, { backgroundColor: colors.white }]}
        from={{ opacity: 0, translateX: 50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: index * 200 }}>
        <Image
          source={{uri: item.images[0]}}
          style={{
            height: 120,
            width: 120
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 12,
            alignItems: "flex-end"
          }}>
          <InforShoesItem
          nameShoes={item.name}
          priceShoes={item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          />
          <ButtonAdd style={{ alignSelf: "flex-end" }} />
        </View>
      </MotiView>
      </TouchableOpacity>
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