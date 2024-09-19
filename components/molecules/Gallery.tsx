import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme, ImageSourcePropType } from 'react-native';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';

interface GalleryProps {
  images: ImageSourcePropType[];
  scrollToIndex: (index: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, scrollToIndex }) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.black }]}>
        {t('details.gallery')}
      </Text>
      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
            <Image
              source={img}
              style={[styles.image, { backgroundColor: colors.whiteSmoke }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 10,  // React Native không hỗ trợ 'gap', sử dụng margin để thay thế
    justifyContent: 'flex-start',
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
    width: 60,
  },
});

export default Gallery;
