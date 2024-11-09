import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import getColors from "~/constants/Colors";

interface ProductCardProps {
  name?: string
  price?: number
  images: string
  size?: string
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

const ProductCard= (props:ProductCardProps):React.ReactElement => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const [iconColor, setIconColor] = useState(colors.gray);


 


  return (
    <View style={[styles.container, { backgroundColor: colors.whiteSmoke }]}>
      <Image source={{ uri: props.images }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.price}>{props.price}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.white }]}
            onPress={props.onDecrease}
          >
            <AntDesign name="minus" size={15} color={colors.whiteSmoke} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{props.quantity}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5B9EE1" }]}
            onPress={props.onIncrease}
          >
            <AntDesign name="plus" size={15} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sizeTrashContainer}>
        <Text style={styles.sizes}>{props.size}</Text>
        <TouchableOpacity onPress={props.onRemove}>
          <AntDesign name="delete" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    marginRight: 10,
  },
  quantity: {
    marginRight: 10,
    fontSize: 15,
  },
  sizeTrashContainer: {
    alignItems: "center",
    gap: 22,
  },
  sizes: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default ProductCard;
