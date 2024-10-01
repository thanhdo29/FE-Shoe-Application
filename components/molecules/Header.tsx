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
  subtitleColor?: string
  style?: object; 
}

export default function Header (props: Props): React.ReactElement {
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
      {!isNil(props.backIcon) && (
        <TouchableOpacity
          style={[styles.backIconButton, { backgroundColor: colors.white }]}
        >
          {props.backIcon}
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>

        {renderIcon(props.leftIcon, 'left')}

        <View style={styles.centerContainer}>
          {!isUndefined(props.title) && (
            <Text style={[styles.title]}>
              {props.title}
            </Text>
          )}
          {!isUndefined(props.subtitle) && (
            <Text style={[styles.subtitle, { color: props.subtitleColor}, props.style]}>
              {props.subtitle}
            </Text>
          )}
        </View>

        {renderIcon(props.rightIcon, 'right')}

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
    fontSize: 22,
    
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16
  },
  iconContainer: {
    position: 'absolute',
  },
  leftIcon: {
    left: 0,
  },
  rightIcon: {
    right: 0,
  },
})
