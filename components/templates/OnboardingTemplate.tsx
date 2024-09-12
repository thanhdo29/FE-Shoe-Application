import getColors from '~/constants/Colors'
import dataOnboarding from '~/constants/DataOnboarding'
import { Href, useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Animated, FlatList, StyleSheet, useColorScheme, useWindowDimensions, View, type ViewToken } from 'react-native'

import useTranslation from '~/hooks/useTranslation'
import { OnboardingItem } from '../molecules/OnboardingItem'
import { PositiveButton } from '../atoms/PositiveButton'

const OnboardingTemplate = (): JSX.Element => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const [buttonText, setButtonText] = useState<string>('Get Started')
  const router = useRouter()

  const viewableItemsChanged = useRef(({ viewableItems }:
    { viewableItems: ViewToken[] }) => {
    setCurrentIndex(viewableItems[0].index ?? 0)

    if (viewableItems[0]?.index === 1 || viewableItems[0]?.index === 2) {
      setButtonText(t('next'))
    } else {
      setButtonText(t('getStarted'))
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const slideRef = useRef<FlatList<number>>(null)

  const Paginator = (data: any): any => {
    return (
      <View style={styles.containerPaginator}>
        {
          data.map((_: any, i: number) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

            const dotWidth = scrollX.interpolate({
              extrapolate: 'clamp',
              inputRange,
              outputRange: [8, 35, 8]
            })

            const opacity = scrollX.interpolate({
              extrapolate: 'clamp',
              inputRange,
              outputRange: [0.3, 1, 0.3]
            })
            return (
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: colors.cornflowerBlue,
                    opacity,
                    width: dotWidth
                  }
                ]}
                key={i.toString()}
              >
              </Animated.View>
            )
          })
        }

      </View>
    )
  }

  const scrollToNext = (): any => {
    if (slideRef.current != null && currentIndex < dataOnboarding.length - 1) {
      slideRef
        .current
        .scrollToIndex({ animated: true, index: currentIndex + 1 })
    }
  }
  const colors = getColors(useColorScheme())
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={dataOnboarding}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated
            .event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <View style={styles.footer}>
        {Paginator(dataOnboarding)}
        <PositiveButton
          style={{paddingHorizontal:32, paddingVertical:16}}
          title={buttonText}
          onPress={() => {
            currentIndex === 2
              ? router.replace('/(tabs)/home' as Href)
              : scrollToNext()
          }} />
      </View>
    </View>
  )
}

export default OnboardingTemplate

const styles = StyleSheet.create({
  dot: {
    borderRadius: 16,
    height: 5,
    marginHorizontal: 8
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 41,
    marginHorizontal: 20
  },
  containerPaginator: {
    flexDirection: "row"
  },
  container: {
    flex: 1
  }
})
