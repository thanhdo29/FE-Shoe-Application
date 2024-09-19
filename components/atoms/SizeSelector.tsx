import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  outOfStockSizes: string[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  setSelectedSize,
  outOfStockSizes
}) => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.black }]}>{t('details.size')}</Text>
        <View style={styles.sizeLabels}>
          <Text style={[styles.sizeLabel, { color: colors.darkGray }]}>EU</Text>
          <Text style={[styles.sizeLabel, { color: colors.darkGray }]}>US</Text>
          <Text style={[styles.sizeLabel, { color: colors.darkGray }]}>UK</Text>
        </View>
      </View>

      <View style={styles.sizeButtons}>
        {sizes.map((size) => {
          const isOutOfStock = outOfStockSizes.includes(size);
          return (
            <TouchableOpacity
              key={size}
              style={[styles.button,
                {
                  backgroundColor: isOutOfStock ? colors.lightGray : size === selectedSize ? colors.blue : colors.white,
                },
                isOutOfStock && { borderColor: colors.whiteSmoke }
              ]}
              onPress={() => {
                if (!isOutOfStock) {
                  setSelectedSize(size);
                }
              }}
              disabled={isOutOfStock}
            >
              <Text
                style={[styles.buttonText,
                  {
                    color: isOutOfStock ? colors.darkGray : size === selectedSize ? colors.whiteSmoke : colors.black 
                  }
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizeLabels: {
    flexDirection: 'row',
  },
  sizeLabel: {
    marginHorizontal: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginTop: 8,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    width: 40,
    height: 40,
    padding: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SizeSelector;
