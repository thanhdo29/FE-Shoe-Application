import React from 'react'
import { Image, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native'


import Dot from '../atoms/Dot'
import getColors from '~/constants/Colors'
import { ContentOnboarding } from './ContentOnboarding'

interface Props {
  item: {
    img: number
    title: string
    des: string
  }
}

export const OnboardingItem = (props: Props): React.ReactElement => {
  const { item } = props
  const colorlight = getColors(useColorScheme())
  const { width, height } = useWindowDimensions()

  return (
    <View style={[styles.containerItem, { width }]}>
      <View style={styles.containerTop}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[styles.nikeText,
            {
              color: colorlight.lightGray,
              marginTop: height * 0.10,
              fontSize: 154
            }]}>
            NIKE
          </Text>
        </View>
        <Image
          style={{ marginTop: height * 0.08 }}
          source={item.img}
        />
      </View>
      <View style={styles.containerContent}>
        <ContentOnboarding style={{flex:4}} title={item.title} des={item.des} />
        <View style={{flex:0.5}}></View>
      </View>
      <Dot style={{ position: "absolute", top: '53%', right: 40 }} />
      <Dot style={{ position: "absolute", top: '20%', left: 47 }} />
      <Dot style={{ position: "absolute", top: '60%', left: 20 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    flex: 1
  },
  nikeText: {
    fontWeight: 'bold',
    position: 'absolute'
  },
  containerTop: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  containerContent:{
    flexDirection: "row", 
    marginLeft: 20, 
    flex: 1.5
  }
})
