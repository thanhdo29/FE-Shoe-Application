import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native'

import getColors from '~/constants/Colors'

export const ButtonAdd = (props: TouchableOpacityProps): React.ReactElement => {
    const colors = getColors(useColorScheme())

    return (
        <TouchableOpacity
            {...props}
            style={{
                backgroundColor: colors.cornflowerBlue,
                borderBottomEndRadius: 20,
                borderTopStartRadius: 20,
                padding: 12
            }}
        >
            <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
    )
}