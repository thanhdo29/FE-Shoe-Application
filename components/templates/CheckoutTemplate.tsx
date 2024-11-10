import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import getColors from "~/constants/Colors";
import Header from "~/components/molecules/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import PayProduct from "~/components/atoms/PayProduct";
import ContactInfo from "~/components/molecules/ContactInfo";
import PaymentSuccessModal from "~/components/atoms/PaymentSuccessModal"; // Đảm bảo đường dẫn đúng
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "~/API/ipconfig";
const shipping = 40000
const CheckoutTemplate = () => {
  const colors = getColors(useColorScheme());
  const router = useRouter();
  const handleBack = (): void => {
    router.back();
  };

  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const getUser = async() => {
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const user = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserId(user.data._id)
    setEmail(user.data.email)
  }

  useEffect(() => {
    getUser()

   
  }, []);

  const data = useLocalSearchParams();
  const CartData = data.item ? JSON.parse(data.item as string) : null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash');
  const [isModalVisible, setModalVisible] = useState(false); // State để quản lý modal


  const btn_checkout = async () => {
    try {
      // Kiểm tra nếu chưa chọn phương thức thanh toán
      if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
      }
  
      // Kiểm tra các trường thông tin người dùng (email, phone, address) đã đầy đủ chưa
      if (!email || !phone || !address) {
        alert('vui long nhap thong tin');
        return;
      }
  
      // Kiểm tra thông tin giỏ hàng (CartData)
      if (!CartData || CartData.length === 0) {
        alert('Your cart is empty');
        return;
      }

      // const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
      // const userId = await axios.get(`${API_URL}user`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
  
      // Tạo dữ liệu gửi tới API
      const payload = {
        userId: userId, // Giả sử bạn lấy được userId từ state hoặc context
        totalPrice: CartData.totalPrice, // Giả sử bạn lấy tổng giá trị từ CartData
        paymentMethod: selectedPaymentMethod,
        shippingAddress: address,
        phoneNumber: phone,
        cartId: CartData._id, // Giả sử bạn lấy cartId từ CartData
      };
  
      // Gửi yêu cầu POST đến API để tạo đơn hàng
      const response = await axios.post(`${API_URL}order`, payload);
  
      // Nếu yêu cầu thành công
      if (response.status === 201) {
        console.log('Order created successfully:', response.data);
        setModalVisible(true);  // Mở modal thành công (hoặc thực hiện hành động khác)
        // Chuyển hướng hoặc thông báo cho người dùng biết đơn hàng đã được tạo
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
              }}
            >
              <Entypo
                name="chevron-left"
                size={20}
                color={colors.midnightBlue}
              />
            </TouchableOpacity>
          }
          subtitle="Checkout"
        />

        <View style={styles.infor}>
          <ContactInfo
            mentThod={selectedPaymentMethod}
            onChangeMenthod={setSelectedPaymentMethod}
            onChangeEmail={(text: string) => setEmail(text)}
            onChangeNumberphone={(text: string) => setPhone(text)}
            onChangeAdress={(text: string) => setAddress(text)} 
            email={email} />
        </View>

        <PayProduct
           subtotal={(CartData.totalPrice ? CartData.totalPrice : 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          shipping={shipping.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          totalCost={(CartData.totalPrice ? CartData.totalPrice + shipping : shipping).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          onCheckout={() => {
            btn_checkout()

        
          }}
        />

        <PaymentSuccessModal
          isVisible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            router.replace("/(tabs)/home");
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infor: {
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
});

export default CheckoutTemplate;
