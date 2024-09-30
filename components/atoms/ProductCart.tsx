import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import getColors from '~/constants/Colors';
import type Shoes from '~/interfaces/Shoes';

interface ProductCardProps extends Shoes {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  images,
  name,
  price,
  sizes,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const [iconColor, setIconColor] = useState(colors.gray);

  const handlePress = (): void => {
    setIconColor((prevColor: string): string =>
      prevColor === colors.gray ? colors.red : colors.gray
    );
  };

  const imageUri = images[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.whiteSmoke }]}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.white }]}
            onPress={onDecrease}
          >
            <AntDesign name="minus" size={15} color={colors.whiteSmoke} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#5B9EE1' }]}
            onPress={onIncrease}
          >
            <AntDesign name="plus" size={15} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sizeTrashContainer}>
        <Text style={styles.sizes}>{sizes}</Text>
        <TouchableOpacity onPress={handlePress}>
          <AntDesign name="delete" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    marginRight: 10,
  },
  quantity: {
    marginRight: 10,
    fontSize: 15,
  },
  sizeTrashContainer: {
    alignItems: 'center',
    gap:22
  },
  sizes: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  },
});

export default ProductCard;
