import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";

interface PaymentSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide" // Có thể dùng 'slide', 'fade', hoặc 'none'
      onRequestClose={onClose} // Đóng modal khi nhấn nút quay lại
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image source={require("../../assets/images/succes.png")} />
          <Text style={styles.title}>{t("Your Payment Is Successful")}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{t("Back To Shopping")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Đổ màu nền mờ cho overlay
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    gap: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%", // Chiều rộng của modal
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5B9EE1",
    padding: 16,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PaymentSuccessModal;
