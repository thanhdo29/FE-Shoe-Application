import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../molecules/Header'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import dataBranch from '~/constants/DataBranch'
import ListShoeFavouriteItem from '../organisms/ListShoeFavouriteItem'
import ButtonRenderIcon from '../atoms/ButtonRenderIcon'

const FavouriteTemplate = () => {

  return (
    <View style={{ flex: 1, marginBottom: 120 }}>
      <Header
        style={{ fontWeight: "bold" }}
        title='Favourite'
        rightIcon={<ButtonRenderIcon
          icon={<FontAwesome6 name="heart" size={18} color="black" />} />}
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={dataBranch}
          renderItem={({ item, index }) => <ListShoeFavouriteItem index={index} />}
          keyExtractor={(item) => item.name}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  )
}

export default FavouriteTemplate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:20
  },
  columnWrapper: {
    justifyContent: 'space-between', 
  },
})