import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  FlatList,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PayProduct from "~/components/atoms/PayProduct";
import ProductCard from "~/components/atoms/ProductCart";
import Header from "~/components/molecules/Header";
import getColors from "~/constants/Colors";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "~/API/ipconfig";
import axios from "axios";

const CartTemplate: React.FC = () => {
  const colors = getColors(useColorScheme());
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const shipping = 40000

  const getDataCart = async () => {
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const userId = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const cartResponse = await axios.get(`${API_URL}cart/${userId.data._id}`);
      setData(cartResponse.data);
    } catch (error) {
      console.error("Error cart:", error);
    }
  };

  useEffect(() => {
    getDataCart();
  }, []);

  const handleBack = (): void => {
    router.back();
  };

  const redirectToCheckout = (): void => {
    router.push("/product/Checkout");
  };


  const handleIncreaseQuantity = async (itemId: string) => {
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const userId = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    try {
      await axios.post(`${API_URL}cart/increase/${userId.data._id}`, {itemId });
      getDataCart(); // Cập nhật giỏ hàng sau khi thay đổi
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (itemId: string) => {
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const userId = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      await axios.post(`${API_URL}cart/decrease/${userId.data._id}`, { itemId });
      getDataCart(); // Cập nhật giỏ hàng sau khi thay đổi
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleDelete = async (itemId: string) => {
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const userId = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Alert.alert('Bạn chắc chắn muốn xóa', '', [
      {
        text: 'Không',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => {
        try {
          await axios.post(`${API_URL}cart/remove/${userId.data._id}`, { itemId });
          getDataCart(); // Cập nhật giỏ hàng sau khi thay đổi
        } catch (error) {
          console.error("Error decreasing quantity:", error);
        }
      }},
    ]);
    
  };
  
  return (
    <View style={styles.container}>
      <Header
        style={{ fontWeight: "bold" }}
        leftIcon={
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: colors.white,
              left: 10,
            }}
          >
            <Entypo name="chevron-left" size={20} color={colors.midnightBlue} />
          </TouchableOpacity>
        }
        subtitle="Cart"
      />

      <View style={styles.productCardContainer}>
        <FlatList
          data={data.items || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <ProductCard
                name={item.product.name}
                images={item.product.images[0]}
                price={item.product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                size={item.size}
                quantity={item.quantity}
                onIncrease={() => {
                  handleIncreaseQuantity(item._id);
                }}

                onDecrease={() => {
                  handleDecreaseQuantity(item._id);
          
          
                }}
            
                onRemove={() => {
                  handleDelete(item._id)
                }}
              />
            </View>
          )}
        />
      </View>

      <PayProduct
       subtotal={(data.totalPrice ? data.totalPrice : 0).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}
      shipping={shipping.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}
      totalCost={(data.totalPrice ? data.totalPrice + shipping : shipping).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}
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
