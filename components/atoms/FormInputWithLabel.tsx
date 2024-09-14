import { isNil, isUndefined } from 'lodash'
import React from 'react'
import { useColorScheme, View, TextInput, Text, StyleSheet } from 'react-native'

import getColors from '~/constants/Colors'

type props = {
  label?: string
  icon?: JSX.Element
  iconLeft?: JSX.Element
  errorMessage?: string
} & React.ComponentProps<typeof TextInput>

const FormInputWithLabel: React.FC<props> = (props: props) => {
  const colors = getColors(useColorScheme())

  return (
    <View style={styles.container}>
      {!isNil(props.label) && (
        <Text style={styles.label}>
          {props.label}
        </Text>
      )}

      <View style={[styles.inputContainer, { backgroundColor: colors.white }]}>
        {!isNil(props.iconLeft) && props.iconLeft}
        <TextInput
          style={[styles.input, { color: colors.black }]}
          {...props}
        />
        {!isNil(props.icon) && props.icon}
      </View>

      {!isUndefined(props.errorMessage) && props.errorMessage !== '' && (
        <Text style={[styles.errorMessage, { color: colors.red }]}>
          {props.errorMessage}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 50,
    height: 48,
  },
  input: {
    flex: 1,
    borderWidth: 0,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 5,
  },
})

export default FormInputWithLabel
