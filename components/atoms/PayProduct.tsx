import React from 'react';

import { useColorScheme, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';

interface CheckoutSummaryProps {
  subtotal: string;
  shipping: string;
  totalCost: string;
  onCheckout: () => void;
}

const PayProduct: React.FC<CheckoutSummaryProps> = ({
  subtotal,
  shipping,
  totalCost,
  onCheckout
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.gray }]}>{t('Subtotal')}</Text>
        <Text style={styles.value}>{subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.gray }]}>{t('Shipping')}</Text>
        <Text style={styles.value}>{shipping}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>{t('TotalCost')}</Text>
        <Text style={styles.totalValue}>{totalCost}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#5B9EE1'}]}
        onPress={onCheckout}
      >
        <Text style={[styles.buttonText, { color: colors.white }]}>{t('Checkout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 25,
  

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PayProduct;
