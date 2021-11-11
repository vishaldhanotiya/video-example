import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { AppConstants } from "../../constants";

let unsubscribe = "";

export default function NoInternetConnectionUI() {
  let [isConnected, closeModal] = useState(false);
  let [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isConnected ? 1 : 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1 * 500, -1 * 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        AppConstants.NETWORK_CHECK = true;
        closeModal(false);
      } else {
        AppConstants.NETWORK_CHECK = false;
        closeModal(true);
      }
    });
  }, []);

  return (
    <Animated.View style={[styles.mainContainer, slideUp]}>
      <Text allowFontScaling={false} style={styles.offlineTextStyle}>
        {"Please check your internet connection"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#de3731",
    width: "100%",
    height: 65,
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
  },
  offlineTextStyle: {
    color: "white",
    fontSize: 15,
    justifyContent: "center",
  },
});
