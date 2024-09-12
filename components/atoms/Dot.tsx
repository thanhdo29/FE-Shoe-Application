import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type Props = {
    title?: string
} & ViewProps

const Dot = (props: Props): React.ReactElement => {
    return (
        <View
            {...props}
            style={styles.dot}
        />
    )
}

const styles = StyleSheet.create({
    dot: {
      position: "absolute",
      height: 16,
      width: 16,
      backgroundColor: '5B9EE1',
      borderRadius:  9
    }
})

export default Dot
