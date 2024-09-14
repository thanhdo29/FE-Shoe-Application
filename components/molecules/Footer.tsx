import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native'
import getColors from '~/constants/Colors'

interface Props {
  title: string
  subtitle?: string
  onPressAuthScreen?: () => void
}

const Footer: React.FC<Props> = ({ title, subtitle, onPressAuthScreen }) => {
  const colors = getColors(useColorScheme())

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colors.slateGray }]}>
          {title}
        </Text>
        {subtitle && (
          <TouchableOpacity onPress={onPressAuthScreen}>
            <Text style={[styles.subtitle, { color: colors.black }]}>
              {subtitle}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Footer
