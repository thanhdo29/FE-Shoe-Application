import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'

import FormInputWithLabel from '~/components/atoms/FormInputWithLabel'
import getColors from '~/constants/Colors'
import dataBranch from '~/constants/DataBranch'
import useTranslation from '~/hooks/useTranslation'
import { ButtonRenderBranch } from '~/components/atoms/ButtonRenderBranch'
import Header from '~/components/molecules/Header'
import { ShoesCategory } from '~/components/molecules/ShoesCategory'
import { ListShoesItem } from '~/components/organisms/ListShoeItem'
import { BannerShoesItem } from '~/components/molecules/BannerShoesItem'
import { useRouter } from 'expo-router'
import ButtonRenderIcon from '../atoms/ButtonRenderIcon'
import axios from 'axios'
import { API_URL } from '~/API/ipconfig'

const HomeTemplate: React.FC = () => {
  const color = getColors(useColorScheme())
  const router = useRouter()

  const [data, setdata] = useState([]);

  const [selectedBranch, setSelectBranch] = useState<{
    logo: number
    name: string
  }>()
  const { t } = useTranslation()

  const redirectToProfile =() => {
    router.push('/authentication/Profile')
  }

  const leftIconOfHeader = (
    <Entypo name="grid" size={25} color={color.midnightBlue} onPress={redirectToProfile} />
  )
  const rightIconOfHeader = (
    <Ionicons name="bag-handle-outline" size={25} color={color.midnightBlue} onPress={()=>redirectToCart()}/>
  )

  const redirectToCart = (): void => {
    router.push('/product/Cart')
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}product`); // Đảm bảo URL chính xác
        setdata(response.data); // Cập nhật trạng thái với danh sách sản phẩm
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts(); 
  }, []); 
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          leftIcon={<ButtonRenderIcon icon={leftIconOfHeader}/>}
          rightIcon={<ButtonRenderIcon icon={rightIconOfHeader}/>}

        />

        <View style={{ marginBottom: 32, marginTop: 30 }}>
          <FormInputWithLabel
            iconLeft={
              <Feather name="search" size={23} color={color.slateGray} />
            }
          />
        </View>

        <FlatList
          data={dataBranch}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const isSelected = selectedBranch?.name === item.name
            const transitionStyle = isSelected
              ? [styles.selectItem, { backgroundColor: color.cornflowerBlue }]
              : styles.unSelectItem
            return (
              <MotiView
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 200 }}
                style={transitionStyle}
              >
                <ButtonRenderBranch
                  icon={item.logo}
                  onPress={() => {
                    if (isSelected) {
                      setSelectBranch(undefined)
                    } else {
                      setSelectBranch(item)
                    }
                  }}
                  isSelected={isSelected}
                />
                {isSelected && (
                  <MotiView
                    from={{
                      opacity: 0,
                      translateX: -50
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0
                    }}
                    transition={{ duration: 350, type: 'timing' }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: color.white,
                        marginLeft: 8
                      }}
                    >
                      {item.name}
                    </Text>
                  </MotiView>
                )}
              </MotiView>
            )
          }}
          keyExtractor={(item) => item.name}
        />

        <ShoesCategory
          leftText={t('home.popularShoes')}
          rightText={t('home.seeAll')}
          containerStyle={{
            marginBottom: 16,
            marginTop: 24
          }}
          leftTextStyle={{
            fontSize: 16
          }}
        />

        <ListShoesItem dataShoes={data} />

        <ShoesCategory
          leftText={t('home.newArrivals')}
          rightText={t('home.seeAll')}
          containerStyle={{
            marginBottom: 16,
            marginTop: 24
          }}
          leftTextStyle={{
            fontSize: 16
          }}
        />

        <BannerShoesItem
          label={t('bestChoice')}
          nameShoes="Nike Air Jordan"
          price="849.69"
        />

        <ShoesCategory
          leftText={t('home.topSeller')}
          rightText={t('home.seeAll')}
          containerStyle={{
            marginBottom: 16,
            marginTop: 24
          }}
          leftTextStyle={{
            fontSize: 16
          }}

        />
        <ListShoesItem dataShoes={data} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 130,
    paddingTop: 30
  },
  selectItem: {
    alignItems: 'center',
    borderRadius: 40,
    flexDirection: 'row',
    marginRight: 16,
    padding: 8,

  },
  unSelectItem: {
    marginRight: 16
  }
})

export default HomeTemplate