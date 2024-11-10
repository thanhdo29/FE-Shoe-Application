import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "~/API/ipconfig";

const NotificationTemplate = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); // Để hiển thị loading khi đang fetch dữ liệu

  // Lấy userId từ AsyncStorage
  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const userResponse = await axios.get(`${API_URL}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(userResponse.data._id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Lấy đơn hàng của user
  const getOrders = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_URL}order/${userId}`);
      setOrders(response.data.orders);
      setLoading(false); // Đặt loading = false khi đã lấy dữ liệu thành công
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getOrders(); // Khi có userId, mới fetch đơn hàng
    }
  }, [userId]);

  
  // Render từng đơn hàng
  const renderOrderItem = ({ item }: { item: any }) => {

    const orderDate = new Date(item.createdAt).toLocaleString("vi-VN", {
      weekday: "long", // Thứ trong tuần (optional)
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric", 
      second: "numeric",
    });
    return (
      <View style={styles.orderContainer}>
         <Text style={styles.orderText}>
          <Text style={styles.bold}>Order Date: </Text>{orderDate}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Total Price: </Text>
          {item.totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Payment Method: </Text>{item.paymentMethod}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Shipping Address: </Text>{item.shippingAddress}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Phone Number: </Text>{item.phoneNumber}
        </Text>
       

        <Text style={[styles.orderText, styles.bold]}>Products:</Text>
        <FlatList
          data={item.products}
          renderItem={({ item: productItem }) => {
            return (
              <View style={styles.productContainer}>
                <Image
                  source={{ uri: productItem.productId.images[0] }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{productItem.productId.name}</Text>
                  <Text style={styles.productPrice}>
                    {productItem.productId.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Quantity: {productItem.quantity}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Size: {productItem.size}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(productItem) => productItem._id.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(order) => order._id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:100,
    paddingTop:40,
    backgroundColor: "#f8f8f8",

  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    borderWidth:1,
    borderRadius:10,
    borderColor:'gray',
    padding:10
  },
  productImage: {
    width: 80,
    height: 100,
    marginRight: 15,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#ff4500",
  },
  productQuantity: {
    fontSize: 14,
    color: "#555",
  },
});

export default NotificationTemplate;
