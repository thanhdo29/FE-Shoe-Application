import getColors from '~/constants/Colors'
import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native'

type Props = {
  title: string
} & TouchableOpacityProps

export const PositiveButton = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  return (
    <TouchableOpacity
      {...props}
      style={[{ backgroundColor: colors.cornflowerBlue, borderRadius: 50 }, props.style]}
    >
      <Text style={{ fontWeight: '500', color: colors.white, fontSize: 18 }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
