import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import getColors from '~/constants/Colors';

interface PriceSectionProps {
  inStock: boolean;
}

const PriceSection: React.FC<PriceSectionProps> = ({ inStock }) => {
  const colorScheme = useColorScheme();
  const currentColors = getColors(colorScheme);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: currentColors.white }]}>
      <View style={styles.priceContainer}>
        <Text style={[styles.label, { color: currentColors.darkGray }]}>
          {t('details.price')}
        </Text>
        <Text style={styles.price}>
          {'$987.800'}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: inStock ? currentColors.blue : currentColors.gray,
          },
        ]}
        disabled={!inStock}
      >
        <Text style={[styles.buttonText, { color: currentColors.white }]}>
          {t(inStock ? 'details.addToCart' : 'details.outOfStock')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  button: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PriceSection;