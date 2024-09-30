import React from 'react'
import _layout from './(tabs)/_layout'
import OnboardingTemplate from '~/components/templates/OnboardingTemplate'
import { useInitializeI18n } from '~/hooks/useTranslation'
import CheckoutTemplate from '~/components/templates/CheckoutTemplate'
import Cart from './product/Cart'
import CartTemplate from '~/components/templates/CartTemplate'

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
