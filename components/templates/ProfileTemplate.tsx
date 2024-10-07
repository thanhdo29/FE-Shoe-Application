import React, { useEffect, useState } from "react";
import {
    Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Header from "../molecules/Header";
import { Entypo } from "@expo/vector-icons";
import getColors from "~/constants/Colors";
import { useRouter } from "expo-router";
import ButtonRenderIcon from "../atoms/ButtonRenderIcon";
import { useTranslation } from "react-i18next";
import AvatarPicker from "../molecules/AvatarPicker";
import InputProfile from "../molecules/InputProfile";
import User from './../../interfaces/User';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg";
const API_URL = "http://192.168.1.11:3000/"

const ProfileTemplate = () => {
  const colors = getColors(useColorScheme());
  const router = useRouter();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleImagePicked = (imageUri: string) => {
    console.log("Image picked:", imageUri);
    // Xử lý thêm nếu cần (ví dụ lưu đường dẫn ảnh vào state hoặc context)
  };

  const user: User = {
    id: "1",
    email: "example@gmail.com",
    password: "securePassword123",
    name: "Nguyễn Văn A",
    address: ["123 Đường ABC", "Phường XYZ", "Quận 1", "TP. Hồ Chí Minh"],
    phone: "0123456789",
    avatar: "https://example.com/avatar.jpg",
    role: "user", 
  };

  const handleBack = (): void => {
    router.back()
  }

  const handleLogout = async (): Promise<void> => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: async () => {
          try {
            // Xóa thông tin người dùng khỏi AsyncStorage
            await AsyncStorage.removeItem("avatar"); // Thay đổi key nếu cần
            // Chuyển hướng về màn hình đăng nhập
            router.replace("/authentication/SignIn"); // Thay đổi đường dẫn đến màn hình đăng nhập của bạn
          } catch (error) {
            console.error("Error during logout: ", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình đăng xuất.");
          }
        },
      },
    ]);
  };

  


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        <Header
          style={{ fontWeight: "bold" }}
          leftIcon={
            <ButtonRenderIcon
              icon={
                <Entypo
                  name="chevron-left"
                  size={20}
                  color={colors.midnightBlue}
                  onPress={handleBack}
                />
              }
            />
          }
          subtitle="Profile"
        />
      </View>

      <View style={{ alignItems: "center", marginTop: 40 }}>
        <AvatarPicker
          defaultImage={user.avatar || DEFAULT_IMAGE} // Sử dụng avatar từ user
          onImagePicked={handleImagePicked}
          apiUrl={API_URL} // Truyền API URL tại đây
        />
        <Text style={{ color: "#1A2530", fontSize: 20, fontWeight: "500" }}>
          {user.name}
        </Text>
      </View>

      <View>
        <InputProfile
          positiveButtonTitle="Submit"
          negativeButtonTitle="Log out"
          onChangeEmailText={setEmail}
          onChangeNameText={setName}
          nameDefault={user.name} // Sử dụng name từ state
          emailDressDefault={user.email} // Cần thêm nếu InputProfile có trường email
          onLogoutPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileTemplate;
