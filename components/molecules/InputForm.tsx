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
  visibleRecoveryPassword?: boolean
  visibleFormInputWithLabel?: boolean
  buttonTitle: string
  googleButtonTitle: string
  onRecoveryPasswordPress?: () => void
  onLoginPress?: () => void
  onChangeEmailText: (text: string) => void
  onChangePasswordText: (text: string) => void
  onChangeConfirmPasswordText?: (text: string) => void
  emailError?: string
  passwordError?: string
  confirmPasswordError?: string
}

const InputForm: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)
  const colors = getColors(useColorScheme())

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <View>
      <View style={styles.formContainer}>
        <FormInputWithLabel
          label={t('emailAddress')}
          placeholder={t('enterEmail')}
          onChangeText={props.onChangeEmailText}
          errorMessage={props.emailError}
        />

        <FormInputWithLabel
          label={t('password')}
          placeholder="•••••••••••••"
          secureTextEntry={showPassword}
          onChangeText={props.onChangePasswordText}
          errorMessage={props.passwordError}
          icon={
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          }
        />

        {!isNil(props.visibleFormInputWithLabel) && props.visibleFormInputWithLabel && (
          <FormInputWithLabel
            label={t('confirmpassword')}
            placeholder="•••••••••••••"
            secureTextEntry={showConfirmPassword}
            onChangeText={props.onChangeConfirmPasswordText}
            errorMessage={props.confirmPasswordError}
            icon={
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} />
              </TouchableOpacity>
            }
          />
        )}
      </View>

      {!isNil(props.visibleRecoveryPassword) && props.visibleRecoveryPassword && (
        <Text
          onPress={props.onRecoveryPasswordPress}
          style={[styles.recoveryPassword, { color: colors.slateGray }]}
        >
          {t('signIn.recoveryPassword')}
        </Text>
      )}

      <PositiveButton
        title={props.buttonTitle}
        style={[{ backgroundColor: colors.cornflowerBlue},styles.customButton]}
      />

      <NegativeButton
        icon={<Image source={require('~/assets/images/icon_google.png')} />}
        title={props.googleButtonTitle}
        style={[{ backgroundColor: colors.white }, styles.customButton]}
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

export default InputForm
