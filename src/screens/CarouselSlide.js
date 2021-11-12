import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import { Images } from "../constants/Images";
const { width: screenWidth } = Dimensions.get("window");

const CarouselSlide = (props) => {
  const { cards } = props;
  const [loadVideo, setLoadVideo] = useState(true);

  const changePlayback = (value, index) => {
    if (value == null) {
      props.playPauseOnClick(false, index);
    } else {
      props.playPauseOnClick(!value, index);
    }
  };
  return (
    <View style={styles.slide}>
      {cards.map((card, index) => {
        return (
          <View style={styles.container} key={index}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.touchableStyle}
              onPress={() => {
                changePlayback(card.paused, card.index);
              }}
            >
              {card.paused == null ? (
                <ImageBackground
                  style={styles.imageCard}
                  source={{ uri: card.thumbnail_url }}
                >
                  <Image
                    style={styles.thumbnailImage}
                    source={
                      card.paused == null ? Images.play_button : Images.pause
                    }
                  />
                </ImageBackground>
              ) : (
                <View style={styles.container}>
                  {loadVideo && (
                    <ActivityIndicator
                      animating
                      color={"black"}
                      size="large"
                      style={styles.activityIndicatorStyle}
                    />
                  )}

                  <Video
                    source={{
                      uri: card.video_url,
                    }}
                    onEnd={() => {
                      changePlayback(false, card.index);
                    }}
                    onLoadStart={() => setLoadVideo(true)}
                    onReadyForDisplay={() => setLoadVideo(false)}
                    paused={card.paused}
                    style={{ flex: 1 }}
                    resizeMode={"cover"}
                    posterResizeMode="cover"
                  />
                  <View style={styles.playView}>
                    <Image
                      source={
                        card.paused
                          ? Images.play_button
                          : loadVideo == false && Images.pause
                      }
                      style={styles.playIcon}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flexDirection: "column",
    width: screenWidth,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  imageCard: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  playView: {
    position: "absolute",
    left: "45%",
    top: "45%",
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  touchableStyle: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    margin: 30,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    top: "50%",
    left: "45%",
  },
});

export default CarouselSlide;
