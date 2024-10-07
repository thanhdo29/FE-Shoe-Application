import { Feather } from '@expo/vector-icons'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useColorScheme, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import FormInputWithLabel from '~/components/atoms/FormInputWithLabel'
import { NegativeButton } from '~/components/atoms/NegativeButton'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

interface Props {
  positiveButtonTitle: string
  negativeButtonTitle: string
  onSubmitPress?: () => void
  onLogoutPress?: () => void
  onChangeEmailText: (text: string) => void
  onChangeNameText: (text: string) => void
  nameDefault:string
  emailDressDefault: string
  emailError?: string
}

const InputProfile: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())


  return (
    <View>
      <View style={styles.formContainer}>
        <FormInputWithLabel
          label={t('Full name')}
          placeholder={t('Enter name')}
          onChangeText={props.onChangeEmailText}
          defaultValue={props.nameDefault}
        />
        <FormInputWithLabel
          label={t('emailAddress')}
          placeholder={t('enterEmail')}
          onChangeText={props.onChangeNameText}
          errorMessage={props.emailError}
          defaultValue={props.emailDressDefault}
        />
        
      </View>

      <PositiveButton
        onPress={props.onSubmitPress}
        title={props.positiveButtonTitle}
        style={[{ backgroundColor: colors.cornflowerBlue},styles.customButton]}
      />

      <NegativeButton
        onPress={props.onLogoutPress}
        title={props.negativeButtonTitle}
        style={[{ backgroundColor: colors.white, borderColor:'red', borderWidth:1, }, styles.customButton]}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 68
  },
  recoveryPassword: {
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'right',
    marginTop: 10,
  },
  customButton: {
    height: 54,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },


})

export default InputProfile
