import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Switch, SwitchProps, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme, View } from 'react-native'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

type Props = {
    leftIcon?: React.ReactElement
    rightIcon?: React.ReactElement
    nameMethod: string
    useSwitch?: boolean
} & TouchableOpacityProps & SwitchProps

export const ChooseMethod = (props: Props): React.ReactElement => {
    const { t } = useTranslation()
    const [isChecked, setIsChecked] = useState(false)
    const colors = getColors(useColorScheme())
    const isDarkMode = useColorScheme() === 'dark'
    const renderIcon = (icon: React.ReactElement): React.ReactElement => {
        return icon
    }

    const handleSwitchChange = (checked: boolean): void => {
        setIsChecked(checked)
        props.onValueChange?.(checked)
    }

    return (
        <TouchableOpacity style={{ gap: 16, marginTop: 16 }} onPress={props.onPress}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{ flex: 1, alignItems: "center", gap: 16 , flexDirection:"row"}}>

                    {!isNil(props.leftIcon) && renderIcon(props.leftIcon)}

                    <Text style={{ fontSize: 16, fontWeight: 400 }}>
                        {t('account.' + props.nameMethod)}</Text>

                </View>

                {props.useSwitch === true
                    ? (
                        <Switch
                            thumbColor={colors.white}
                            trackColor={isChecked? colors.cornflowerBlue: colors.softSilver}
                            onValueChange={handleSwitchChange}

                        >
                        </Switch>)

                    : (!isNil(props.rightIcon) && renderIcon(props.rightIcon))}

            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: colors.silverGray }} />
        </TouchableOpacity>
    )
}
