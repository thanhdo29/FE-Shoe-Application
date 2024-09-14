import getColors from '~/constants/Colors'
import React from 'react'
import { Image, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native'


type Props = {
  title: string,
  icon?: JSX.Element
} & TouchableOpacityProps

export const NegativeButton = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  return (
    <TouchableOpacity
      {...props}
      style={[{  borderRadius: 50, flexDirection: 'row', gap: 10 }, props.style]}
    >
      {props.icon}
      <Text style={{ fontWeight: '500', color: colors.black, fontSize: 18 }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
