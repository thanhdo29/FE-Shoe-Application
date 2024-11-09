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
import axios from 'axios';
import { API_URL } from "~/API/ipconfig";

const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg";

const ProfileTemplate = () => {
  const colors = getColors(useColorScheme());
  const router = useRouter();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  const [avatar, setAvatar] = useState(DEFAULT_IMAGE); 
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken'); // Lấy token từ AsyncStorage
        const response = await axios.get(`${API_URL}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Cập nhật trạng thái với dữ liệu nhận được
        setName1(response.data.name);
        setEmail1(response.data.email);

        setdata(response.data)
      
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Lỗi", "Không thể lấy thông tin người dùng.");
      }
    };

    fetchUserData();
  }, []);

  const handleImagePicked = (imageUri: string) => {
    console.log("Image picked:", imageUri);
    setAvatar(imageUri); // Cập nhật avatar khi người dùng chọn ảnh
  };

  const handleBack = (): void => {
    router.back();
  };

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
            await AsyncStorage.removeItem("authToken"); // Xóa token
            router.replace("/authentication/SignIn");
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
          defaultImage={avatar} // Sử dụng avatar từ state
          onImagePicked={handleImagePicked}
          apiUrl={API_URL} // Truyền API URL tại đây
        />
        <Text style={{ color: "#1A2530", fontSize: 20, fontWeight: "500" }}>
          {name1}
        </Text>
      </View>

      <View>
        <InputProfile
          positiveButtonTitle="Submit"
          negativeButtonTitle="Log out"
          onChangeEmailText={setEmail}
          onChangeNameText={setName}
          nameDefault={name1} // Sử dụng name từ state
          emailDressDefault={email1} // Sử dụng email từ state
          onLogoutPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileTemplate;
