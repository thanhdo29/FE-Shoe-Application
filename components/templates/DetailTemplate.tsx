import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  SafeAreaView,
  Text,
} from "react-native";

import PriceSection from "~/components/atoms/PriceSection";
import ProductInfo from "~/components/atoms/ProductInfo";
import SizeSelector from "~/components/atoms/SizeSelector";
import Gallery from "~/components/molecules/Gallery";
import getColors from "~/constants/Colors";

import Header from "~/components/molecules/Header";
import useTranslation from "~/hooks/useTranslation";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "~/API/ipconfig";

const images = [
  require("~/assets/images/shoes5.png"),
  require("~/assets/images/shoes6.png"),
  require("~/assets/images/shoes7.png"),
];

const DetailTemplate: React.FC = (): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { t } = useTranslation();
  const colors = getColors(useColorScheme());
  const flatListRef = useRef<FlatList>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const outOfStockSizes = [""];
  const router = useRouter();

  const data = useLocalSearchParams();
  const parsedItem = data.item ? JSON.parse(data.item as string) : null;

  const scrollToIndex = (index: number): void => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
    setCurrentImageIndex(index);
  };

  const handleBack = (): void => {
    router.back();
  };

  const leftIconOfHeader = (
    <TouchableOpacity
      onPress={handleBack}
      style={[styles.iconButton, { backgroundColor: colors.white, left: 10 }]}
    >
      <Entypo name="chevron-left" size={18} color={colors.midnightBlue} />
    </TouchableOpacity>
  );

  const rightIconOfHeader = (
    <TouchableOpacity
      style={[styles.iconButton, { backgroundColor: colors.white, right: 10 }]}
    >
      <MaterialIcons name="favorite" size={18} color={colors.midnightBlue} />
    </TouchableOpacity>
  );

  const btn_add = async () => {
    if(selectedSize == '' || selectedSize == null){
      alert("chưa chọn size")
      return
    }
    
    const itemId = parsedItem._id; // Lấy ID sản phẩm
    const quantity = 1; // Hoặc lấy giá trị từ data nếu có trường quantity
    const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
    const userId = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("UserId: " + userId.data._id);
    console.log("ProductId: " + itemId);

    const payload = {
      userId: userId.data._id,
      productId: itemId,
      quantity: quantity,
      size: selectedSize
    };
    try {
      const response = await axios.post(`${API_URL}cart`, payload);

      // Kiểm tra kết quả từ server
      console.log("Product added to cart:", response.data);
      alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error adding product to cart:", error);
      alert("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          style={{ fontWeight: "bold" }}
          leftIcon={leftIconOfHeader}
          rightIcon={rightIconOfHeader}
          subtitle={t("details.mensShoes")}
        />
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: colors.whiteSmoke },
          ]}
        >
          <FlatList
            ref={flatListRef}
            data={parsedItem.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const index = Math.round(
                nativeEvent.contentOffset.x / Dimensions.get("window").width
              );
              setCurrentImageIndex(index);
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentImageIndex
                        ? colors.darkGray
                        : "rgba(0, 0, 0, 0.3)",
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <View style={[styles.infoContainer, { backgroundColor: colors.white }]}>
          <ProductInfo
            name={parsedItem.name}
            price={parsedItem.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
            desc={parsedItem.description}
          />
          <Gallery images={parsedItem.images} scrollToIndex={scrollToIndex} />
          <SizeSelector
            sizes={parsedItem.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            outOfStockSizes={outOfStockSizes}
          />
          <PriceSection
            total={parsedItem.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
            inStock={true}
            addCartPress={btn_add}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#FFF",
  },
  imageContainer: {
    height: 270,
    marginTop: 30,
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width,
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
    marginHorizontal: 4,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    alignSelf: "baseline",
  },
  infoContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});

export default DetailTemplate;
