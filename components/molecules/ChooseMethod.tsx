import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Switch, SwitchProps, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme, View, StyleSheet } from 'react-native'

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
    const scheme = useColorScheme()
    const colors = getColors(scheme)
    const renderIcon = (icon: React.ReactElement): React.ReactElement => {
        return icon
    }

    const handleSwitchChange = (checked: boolean): void => {
        setIsChecked(checked)
        props.onValueChange?.(checked)
    }

    return (
        <TouchableOpacity style={styles.touchableContainer} onPress={props.onPress}>
            <View style={styles.iconContainer}>
                <View style={styles.leftContainer}>

                    {!isNil(props.leftIcon) && renderIcon(props.leftIcon)}

                    <Text style={styles.methodText}>
                        {t('account.' + props.nameMethod)}
                    </Text>

                </View>

                {props.useSwitch
                    ? (
                        <Switch
                            value={isChecked}
                            thumbColor={colors.white}
                            trackColor={{ true: colors.cornflowerBlue, false: colors.softSilver }}
                            onValueChange={handleSwitchChange}
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        />
                    )
                    : (!isNil(props.rightIcon) && renderIcon(props.rightIcon))
                }
            </View>
            <View style={[styles.separator, { backgroundColor: colors.silverGray }]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableContainer: {
        gap: 16,
        marginTop: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 16,
        flexDirection: 'row',
    },
    methodText: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    separator: {
        height: 1,
        width: '100%',
    },
})
