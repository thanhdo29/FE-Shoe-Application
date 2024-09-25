import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Header from '../molecules/Header'
import ButtonRenderIcon from '../atoms/ButtonRenderIcon'
import { Entypo } from '@expo/vector-icons'
import getColors from '~/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import dataBranch from '~/constants/DataBranch'
import ListShoeFavouriteItem from '../organisms/ListShoeFavouriteItem'

const BestSellerTemplate = () => {
    const colors = getColors(useColorScheme())
    return (
        <View style={{ flex: 1, gap: 20, marginTop: 20 }}>
            <Header
                subtitle='Best Selllers'
                leftIcon={<ButtonRenderIcon
                    icon={<Entypo name="chevron-left" size={20} color={colors.midnightBlue} />} />}
                rightIcon={
                    <ButtonRenderIcon icon={<AntDesign name="search1" size={24} color="black" />} />} />
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={dataBranch}
                    renderItem={(item) => <ListShoeFavouriteItem index={item.index} />}
                    keyExtractor={(item) => item.name} />
            </View>

        </View>
    )
}

export default BestSellerTemplate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 10
    }
})