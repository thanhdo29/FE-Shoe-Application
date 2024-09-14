import { isNil, isUndefined } from 'lodash'
import React from 'react'
import { useColorScheme, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import getColors from '~/constants/Colors'

interface Props {
  backIcon?: React.ReactElement
  title?: string
  subtitle?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export default function Header ({
  backIcon,
  title,
  subtitle,
  leftIcon,
  rightIcon
}: Props): React.ReactElement {
  const colors = getColors(useColorScheme())

  const renderIcon = (
    icon: React.ReactElement | undefined,
    position: 'left' | 'right'
  ): React.ReactElement | null => {
    if (isNil(icon)) return null
    const style = position === 'left' ? styles.leftIcon : styles.rightIcon
    return (
      <View style={[styles.iconContainer, style]}>
        {icon}
      </View>
    )
  }

  return (
    <View style={styles.headerContainer}>
      {!isNil(backIcon) && (
        <TouchableOpacity
          style={[styles.backIconButton, { backgroundColor: colors.white }]}
        >
          {backIcon}
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>

        {renderIcon(leftIcon, 'left')}

        <View style={styles.centerContainer}>
          {!isUndefined(title) && (
            <Text style={[styles.title]}>
              {title}
            </Text>
          )}
          {!isUndefined(subtitle) && (
            <Text style={[styles.subtitle, { color: colors.slateGray }]}>
              {subtitle}
            </Text>
          )}
        </View>

        {renderIcon(rightIcon, 'right')}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
  },
  backIconButton: {
    padding: 10,
    borderRadius: 50,
    alignSelf: 'baseline',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    
  },
  subtitle: {
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
  },
  leftIcon: {
    left: 10,
  },
  rightIcon: {
    right: 10,
  },
})
