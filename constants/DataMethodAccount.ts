import { Icons } from "~/components/atoms/Icon"

interface DataMethodAccount {
  id: string
  nameMethod: string
  typeIconLeft: any
  typeIconRight: any
  leftIconName: string
  rightIconName: string
}

const dataMethodAccount: DataMethodAccount[] = [
  {
    id: '1',
    leftIconName: 'bell-ring-outline',
    nameMethod: 'notificationSetting',
    rightIconName: 'right',
    typeIconLeft: Icons.MaterialCommunityIcons,
    typeIconRight: Icons.AntDesign
  },
  {
    id: '2',
    leftIconName: 'bag-handle-outline',
    nameMethod: 'shippingAddress',
    rightIconName: 'right',
    typeIconLeft: Icons.Ionicons,
    typeIconRight: Icons.AntDesign
  },
  {
    id: '3',
    leftIconName: 'wallet',
    nameMethod: 'paymentInfo',
    rightIconName: 'right',
    typeIconLeft: Icons.AntDesign,
    typeIconRight: Icons.AntDesign
  },
  {
    id: '4',
    leftIconName: 'delete',
    nameMethod: 'deleteAccount',
    rightIconName: 'right',
    typeIconLeft: Icons.AntDesign,
    typeIconRight: Icons.AntDesign
  }
]

export default dataMethodAccount
