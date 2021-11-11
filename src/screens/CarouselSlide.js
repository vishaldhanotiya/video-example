import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
const {width: screenWidth} = Dimensions.get('window');

const CarouselSlide = props => {
  const {cards} = props;
  const [loadVideo, setLoadVideo] = useState(true);
  const [paused, setPaused] = useState(null);
  console.log('====>', JSON.stringify(props));
  return (
    <View style={styles.slide}>
      {cards.map((card, index) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1, margin: 30}}
            onPress={() => {
              if (card.paused == null) {
                console.log('paused if', card.paused, card.index);
                props.videoOnClick(false, card.index);
              } else {
                console.log('paused else', card.paused, card.index);
                props.videoOnClick(!card.paused, card.index);
              }
            }}>
            <View style={{flex: 1, backgroundColor: 'black'}}>
              {card.paused == null ? (
                <ImageBackground
                  resizeMode={'cover'}
                  source={{uri: card.thumbnail_url}}
                  style={styles.imageCard}
                  key={index}>
                  <Image
                    resizeMode={'center'}
                    source={
                      card.paused == null
                        ? require('../assets/play_button.png')
                        : require('../assets/pause.png')
                    }
                    style={styles.imageCard}
                    key={index}
                  />
                </ImageBackground>
              ) : (
                <View
                  style={{
                    flex: 1,
                  }}>
                  {loadVideo && (
                    <ActivityIndicator
                      animating
                      color={'white'}
                      size="large"
                      style={{
                        flex: 1,
                        position: 'absolute',
                        top: '50%',
                        left: '45%',
                      }}
                    />
                  )}

                  <Video
                    source={{
                      uri: card.video_url,
                    }}
                    onLoadStart={() => setLoadVideo(true)}
                    onReadyForDisplay={() => setLoadVideo(false)}
                    paused={card.paused}
                    style={{flex: 1}}
                    resizeMode={'cover'}
                    posterResizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      left: '45%',
                      top: '45%',
                    }}>
                    <Image
                      source={
                        card.paused
                          ? require('../assets/play_button.png')
                          : require('../assets/pause.png')
                      }
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
// onPress={() => {
//   if (paused == null) {
//     console.log('paused else', paused);
//     setTimeout(() => {
//       setPaused(false);
//     }, 1000);
//   } else {
//     console.log('paused if', paused);
//     setPaused(!paused);
//   }
// }}
const styles = StyleSheet.create({
  slide: {
    flexDirection: 'column',
    width: screenWidth,
  },
  imageCard: {
    width: '100%',
    height: '100%',
  },
});

export default CarouselSlide;
