import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PayProduct from '~/components/atoms/PayProduct';
import ProductCard from '~/components/atoms/ProductCart';
import Header from '~/components/molecules/Header';
import getColors from '~/constants/Colors';
import { useRouter } from 'expo-router';

const CartTemplate: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const colors = getColors(useColorScheme());
  const router = useRouter()
  

  const sampleShoe = {
    brand: {
      description: 'Leading sports brand',
      id: 'brand1',
      logo: 'https://example.com/',
      name: 'Nike'
    },
    categories: [],
    colors: ['red', 'blue'],
    description: 'A popular shoe model',
    discount: {
      _id: 'discount1',
      endTime: '2023-12-31T23:59:59Z',
      percents: '10',
      startTime: '2023-01-01T00:00:00Z'
    },
    id: '1',
    images: ['https://bom.so/1waW9k'],
    name: 'Nike Air Max',
    price: '$64.95',
    sizes: ['38'],
    thumbnail: ['https://example.com/thumb.jpg'],
    userGender: ['unisex']
  };


  const handleBack = (): void => {
    router.back()
  }

  const redirectToCheckout = (): void => {
    router.push('/product/Checkout')
  }


  return (
    
    <View style={styles.container}>
      
      <Header
        style={{ fontWeight:"bold"}}
        leftIcon={
          <TouchableOpacity onPress={handleBack} style={{padding: 10,borderRadius: 50,backgroundColor: colors.white, left:10}}>
            <Entypo name="chevron-left" size={20} color={colors.midnightBlue} />
          </TouchableOpacity>
        }
        subtitle="Cart"
      />

      <View style={styles.productCardContainer}>
        <ProductCard
          {...sampleShoe}
          quantity={quantity}
          onIncrease={() => setQuantity(quantity + 1)}
          onDecrease={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          onRemove={() => console.log('Remove item')}
        />
      </View>

      <PayProduct
        subtotal="$1250.00"
        shipping="$40.90"
        totalCost="$1690.99"
        onCheckout={() => redirectToCheckout()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productCardContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default CartTemplate;
