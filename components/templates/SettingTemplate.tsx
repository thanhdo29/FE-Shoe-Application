import React from 'react'
import { ScrollView, useColorScheme, View } from 'react-native'

import { ShoesCategory } from '~/components/molecules/ShoesCategory'
import getColors from '~/constants/Colors'
import dataMethodSetting from '~/constants/DataMethodSetting'
import useTranslation from '~/hooks/useTranslation'
import Header from '../molecules/Header'
import { ChooseMethod } from '../molecules/ChooseMethod'
import { RenderIcon } from '../atoms/RenderIcon'

const SettingTemplate: React.FC = () => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()

  const handleSwitchChange = (checked: boolean): void => {
    console.log('Switch state :', checked)
    
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        flex: 1,
        paddingBottom: 120,
        paddingHorizontal: 20
      }}>

        <Header title={t('account.account&Settings')} />

        <ShoesCategory
          leftText={t('account.account')}
          leftTextStyle={{
            fontSize: 20,
            marginVertical: 10
          }}
        />
        {dataMethodSetting.map((method) => (
          <ChooseMethod key={method.id} nameMethod={method.nameMethod}
            leftIcon={
              <RenderIcon
                iconComponent={method.typeIconLeft}
                name={method.leftIconName}
                size={25}
                color={colors.slateGray as string}
              />
            }
            rightIcon={
              <RenderIcon
                iconComponent={method.typeIconRight}
                name={method.rightIconName}
                size={16}
                color={colors.slateGray as string}
              />
            } />
        ))}

        <ShoesCategory
          leftText={t('account.appSettings')}
          leftTextStyle={{
            fontSize: 20,
            marginVertical: 10
          }}
        />

        {dataMethodSetting.map((methodSetting) => (
          <ChooseMethod
            key={methodSetting.id}
            nameMethod={methodSetting.nameMethod}
            useSwitch
            onValueChange={handleSwitchChange} />
        ))}
      </View>
    </ScrollView >
  )
}
export default SettingTemplate
