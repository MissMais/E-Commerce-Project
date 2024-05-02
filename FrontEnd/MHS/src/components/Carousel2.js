import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === CarouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
        setActiveIndex(0);
      } else {
        flatlistRef.current.scrollToIndex({
          animated: true,
          index: activeIndex + 1,
        });
        setActiveIndex(activeIndex + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const [CarouselData, setCarouselData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://192.168.22.137:8000/collection/"
      );
      // console.log(response.data);
      setCarouselData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: item.collection_image }} />
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicator = () => {
    return CarouselData.map((dot, index) => (
      <View
        key={index}
        style={
          index === activeIndex
            ? styles.activedotindicator
            : styles.dotindicator
        }
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CarouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      <View style={styles.dot}>{renderDotIndicator()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 20, // Space from the top of the screen
    paddingBottom: 20, // Space from the bottom of the screen
  },
  contentContainer: {},
  itemContainer: {},
  image: {
    height: 300,
    width: screenWidth,
  },
  dotindicator: {
    backgroundColor: "grey",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dot: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  activedotindicator: {
    backgroundColor: "black",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    marginBottom: 90,
  },
});
