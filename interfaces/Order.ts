import type OrderStatus from '~/interfaces/OrderStatus'
import type PaymentMethod from '~/interfaces/PaymentMethod'
import type Shoes from '~/interfaces/Shoes'
import type User from '~/interfaces/User'

export default interface Order {
  id: string
  user: User
  totalPrice: number
  orderStatus: OrderStatus
  paymentMethod: PaymentMethod
  shippingAddress: string
  products: Shoes[]
  userNote: string
  note: string
}
