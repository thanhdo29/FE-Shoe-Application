import React from 'react'
import Icon from './Icon'

interface Props {
  iconComponent: any
  name: string
  size: number
  color: string
}
export const RenderIcon = (props: Props): React.ReactElement => {
  return (
    <Icon
      type={props.iconComponent}
      name={props.name}
      size={props.size}
      color={props.color} />
  )
}
