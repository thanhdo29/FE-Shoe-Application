import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import _layout from './(tabs)/_layout'
import OnboardingTemplate from '~/components/templates/OnboardingTemplate'
import { useInitializeI18n } from '~/hooks/useTranslation'

const index = () => {

  const { isI18nInitialized } = useInitializeI18n();

  if (!isI18nInitialized) {
    return null;
  }
  return (
    <OnboardingTemplate/>
  )
}

export default index

const styles = StyleSheet.create({})