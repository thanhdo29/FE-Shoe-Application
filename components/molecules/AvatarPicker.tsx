import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface định nghĩa các props cho component
interface AvatarPickerProps {
  defaultImage?: string; // Đường dẫn ảnh mặc định
  size?: number; // Kích thước của ảnh
  onImagePicked?: (imageUri: string) => void; // Hàm callback khi ảnh được chọn
  apiUrl: string; // API để upload ảnh
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  defaultImage,
  size = 90,
  onImagePicked,
  apiUrl,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hàm để lưu hình ảnh vào local storage
  const saveImageToLocal = async (imageUri: string) => {
    try {
      await AsyncStorage.setItem('avatar', imageUri); // Lưu URI hình ảnh
    } catch (error) {
      console.error("Failed to save image to local storage:", error);
    }
  };

  // Hàm để lấy hình ảnh từ local storage
  const loadImageFromLocal = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('avatar');
      if (savedImage) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error("Failed to load image from local storage:", error);
    }
  };

  useEffect(() => {
    loadImageFromLocal(); // Tải hình ảnh từ local khi component mount
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      if (onImagePicked) {
        onImagePicked(imageUri);
      }

    //   await uploadImage(imageUri); // Gọi hàm uploadImage sau khi ảnh đã được chọn
      await saveImageToLocal(imageUri); // Lưu hình ảnh vào local storage
    }
  };

  const uploadImage = async (imageUri: string) => {
    try {
      setLoading(true); // Bắt đầu trạng thái loading

      // Tạo FormData để gửi ảnh
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "avatar.jpg", // Có thể tùy chỉnh tên nếu muốn
        type: "image/jpeg", // Loại tệp
      } as any); // Sử dụng `as any` để giải quyết lỗi TypeScript với FormData

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Gửi tệp dưới dạng form-data
        },
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Upload Successful", "Your avatar has been uploaded.");
        console.log("Upload Success: ", data);
      } else {
        console.error("Upload failed: ", data);
        Alert.alert("Upload Failed", "Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      Alert.alert("Error", "There was an error uploading the avatar.");
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <View>
      <TouchableOpacity style={{ alignItems: "center" }}>
        {image || defaultImage ? (
          <Image
            source={{ uri: image || defaultImage }}
            style={[styles.avatar, { width: size, height: size }]}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={size} color="gray" />
        )}

        <TouchableOpacity
          onPress={pickImage}
          disabled={loading} // Khi loading thì disable button
          style={{
            backgroundColor: "#5B9EE1",
            bottom: 14,
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
          }}
        >
          <Feather
            name="camera"
            size={14}
            color="#FFF"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
  },
  cameraIcon: {
    // Các style khác nếu cần
  },
});

export default AvatarPicker;
