import type Brand from '~/interfaces/Brand'
import type Category from '~/interfaces/Category'
import type Discount from '~/interfaces/Discount'

export default interface Shoes {
  id: string
  name: string
  brand: Brand
  price: string
  categories: Category[]
  discount: Discount
  description: string
  colors: string[]
  sizes: string[]
  images: string[]
  thumbnail: string[]
  userGender: string[]
}
