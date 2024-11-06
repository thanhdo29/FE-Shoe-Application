import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import FooterComponent from '~/components/molecules/Footer'
import Header from '~/components/molecules/Header'
import InputForm from '~/components/molecules/InputForm'
import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'
import axios from 'axios'
import { API_URL } from '~/API/ipconfig'

// const API_URL = "http://192.168.1.11:3000/"

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPassword = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}

const SignUpTemplate: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const router = useRouter()

  const validateForm = (): void => {
    const emailError = isValidEmail(email) ? '' : t('invalidEmail')
    const passwordError = isValidPassword(password) ? '' : t('invalidPassword')
    const confirmPasswordError = password === confirmPassword
      ? ''
      : t('passwordsDoNotMatch')

    setEmailError(emailError)
    setPasswordError(passwordError)
    setConfirmPasswordError(confirmPasswordError)
  }

  useEffect(() => {
    validateForm()
  }, [email, password, confirmPassword])

  const handleBack = (): void => {
    router.back()
  }

  const redirectToSignIn = (): void => {
    router.push('/authentication/SignIn')
  }


const handleSignUp = async (): Promise<void> => {


  let name = "sds sd"

  try {
    // Xác thực lại form
    validateForm()

    // Nếu có lỗi trong form thì không gửi yêu cầu
    if (emailError || passwordError || confirmPasswordError) {
      return
    }

    // Tạo payload để gửi lên server
    const payload = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    // Gửi yêu cầu POST tới API đăng ký
    const response = await axios.post(`${API_URL}signup`, payload)

    // Xử lý phản hồi thành công từ server
  
      alert(t('signUp.success'))
      router.push('/authentication/SignIn')
    
  } catch (error) {
    // Xử lý lỗi khi gửi yêu cầu hoặc phản hồi từ server
    alert(t('Đăng ký thất bại'))
    console.error('Đăng ký thất bại:', error)
  }
}


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightSilver }]}>
      <Header
        title={t('signUp.createAccount')}
        subtitle={t('signUp.letsCreateAccountTogether')}
        subtitleColor={colors.slateGray}
        backIcon={<AntDesign name="left" size={18} color={colors.black} onPress={handleBack} />}
      />

      <InputForm
        visibleFormInputWithLabel
        visibleRecoveryPassword={false}
        onChangeEmailText={setEmail}
        onChangePasswordText={setPassword}
        onChangeConfirmPasswordText={setConfirmPassword}
        buttonTitle={t('signUp.signUp')}
        googleButtonTitle={t('signUp.signInWithGoogle')}
        emailError={emailError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        onLoginPress={handleSignUp}
      />

      <FooterComponent
        onPressAuthScreen={redirectToSignIn}
        title={t('signUp.alreadyHaveAnAccount')}
        subtitle={t('signUp.signIn')}
      />
    </SafeAreaView>
  )
}

export default SignUpTemplate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
})
