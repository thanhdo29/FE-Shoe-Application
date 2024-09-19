import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import getColors from '~/constants/Colors';

interface ProductInfoProps {
  name: string;
  price: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, price }) => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[styles.bestSeller, { color: colors.blue }]}>
        {t('details.bestSeller')}
      </Text>
      <Text style={styles.productName}>
        {name}
      </Text>
      <Text style={styles.productPrice}>
        {price}
      </Text>
      <Text style={[styles.productDescription,{color: colors.slateGray}]}>
        {t('details.productDescription')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  bestSeller: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 7,
  },
});

export default ProductInfo;
