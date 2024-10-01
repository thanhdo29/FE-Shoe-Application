import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
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
} from "react-native";

import PriceSection from "~/components/atoms/PriceSection";
import ProductInfo from "~/components/atoms/ProductInfo";
import SizeSelector from "~/components/atoms/SizeSelector";
import Gallery from "~/components/molecules/Gallery";
import getColors from "~/constants/Colors";

import Header from "~/components/molecules/Header";
import useTranslation from "~/hooks/useTranslation";
import { useRouter } from "expo-router";

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
  const sizes = ["38", "39", "40", "41", "42", "43"];
  const [selectedSize, setSelectedSize] = useState<string>("40");
  const outOfStockSizes = ["42", "43"];
  const router = useRouter();

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
      style={[styles.iconButton, { backgroundColor: colors.white, left:10 }]}
    >
      <Entypo name="chevron-left" size={18} color={colors.midnightBlue} />
    </TouchableOpacity>
  );

  const rightIconOfHeader = (
    <TouchableOpacity
      style={[styles.iconButton, { backgroundColor: colors.white, right:10 }]}
    >
      <Ionicons
        name="bag-handle-outline"
        size={18}
        color={colors.midnightBlue}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          style={{ fontWeight:"bold"}}
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
            data={images}
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
              <Image source={item} style={styles.image} />
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
          <ProductInfo name="Nike Air Jordan" price="$967.800" />
          <Gallery images={images} scrollToIndex={scrollToIndex} />
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            outOfStockSizes={outOfStockSizes}
          />
          <PriceSection inStock={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
