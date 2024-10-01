import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import getColors from "~/constants/Colors";
import Header from "~/components/molecules/Header";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import PayProduct from "~/components/atoms/PayProduct";
import ContactInfo from "~/components/molecules/ContactInfo";
import PaymentSuccessModal from "~/components/atoms/PaymentSuccessModal"; // Đảm bảo đường dẫn đúng

const CheckoutTemplate = () => {
  const colors = getColors(useColorScheme());
  const router = useRouter();

  const handleBack = (): void => {
    router.back();
  };

  const [isModalVisible, setModalVisible] = useState(false); // State để quản lý modal

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View  style={styles.container}>

      
      <Header
        style={{ fontWeight:"bold"}}
        leftIcon={
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: colors.white,
            }}
          >
            <Entypo name="chevron-left" size={20} color={colors.midnightBlue} />
          </TouchableOpacity>
        }
        subtitle="Checkout"
      />

      <View style={styles.infor}>
        <ContactInfo />
      </View>

      <PayProduct
        subtotal="$1250.00"
        shipping="$40.90"
        totalCost="$1690.99"
        onCheckout={() => {
          setModalVisible(true);
        }}
      />

      <PaymentSuccessModal 
        isVisible={isModalVisible} 
        onClose={() => {
          setModalVisible(false)
          router.replace('/(tabs)/home')
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
