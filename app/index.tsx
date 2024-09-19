import React from 'react'
import _layout from './(tabs)/_layout'
import OnboardingTemplate from '~/components/templates/OnboardingTemplate'
import { useInitializeI18n } from '~/hooks/useTranslation'
import SignInTemplate from '~/components/templates/SignInTemplate'

const index = () => {

  const { isI18nInitialized } = useInitializeI18n();

  if (!isI18nInitialized) {
    return null;
  }
  return (
    // <OnboardingTemplate/>
    <SignInTemplate/>
  )
}

export default index
