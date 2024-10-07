import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'
import Header from '~/components/molecules/Header'
import InputForm from '~/components/molecules/InputForm'
import Footer from '~/components/molecules/Footer'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '~/API/ipconfig'


// const API_URL = "http://192.168.1.11:3000/"

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const SignInTemplate: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const router = useRouter()

  useEffect((): void => {
  }, [email, password])

  const handleBack = (): void => {
    router.back()
  }

  const redirectToSignUp = (): void => {
    router.push('/authentication/SignUp')
  }

  const redirectToForgot = (): void => {
    router.push('/authentication/Forgot')

  }



  const handleLogin = async (): Promise<void> => {
    // Kiểm tra thông tin đầu vào
    if (!isValidEmail(email) || !password) {
      alert(t('login.invalidCredentials')); // Hiển thị thông báo lỗi
      return;
    }
  
    // Tạo payload để gửi lên server
    const payload = {
      email: email,
      password: password,
    };
  
    try {
      // Gửi yêu cầu POST tới API đăng nhập
      const response = await axios.post(`${API_URL}signin`, payload);
  
      // Xử lý phản hồi thành công
      if (response.status === 200) {
        const { token, user } = response.data;
        alert(t('login.success')); // Hiển thị thông báo thành công
  
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('authToken', token);
  
        // Chuyển hướng sau khi đăng nhập thành công
        router.replace('/(tabs)/home'); // hoặc trang mong muốn
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu hoặc phản hồi từ server
      alert("Đăng nhập thất bại")
      console.error('Đăng nhập thất bại:', error);
    }
  };
  
  
  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: colors.lightSilver
    }}>

      <Header
        title={t('signIn.helloAgain')}
        subtitle={t('signIn.welcomeBackYouHaveBeenMissed')}
        subtitleColor={colors.slateGray}
        backIcon={
          <AntDesign name="left" size={18}
            color={colors.black} onPress={handleBack}/>
        } />

      <InputForm
        visibleRecoveryPassword={true}
        visibleFormInputWithLabel={false}
        onChangeEmailText={setEmail}
        onChangePasswordText={setPassword}
        onLoginPress={handleLogin}
        onRecoveryPasswordPress={redirectToForgot}
        buttonTitle={t('signIn.signIn')}
        googleButtonTitle={t('signIn.signInWithGoogle')}/>

      <Footer
        onPressAuthScreen={redirectToSignUp}
        title={t('signIn.doNotHaveAnAccount')}
        subtitle={t('signIn.signUpForFree')} />

    </SafeAreaView>
  )
}
export default SignInTemplate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
})
