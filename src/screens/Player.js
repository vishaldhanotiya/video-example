import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function Player() {
  const songs = [
    {
      title: 'death bed',
      artist: 'Powfu',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      id: '1',
    },
    {
      title: 'bad liar',
      artist: 'Imagine Dragons',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      id: '2',
    },
    {
      title: 'faded',
      artist: 'Alan Walker',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      id: '3',
    },
    {
      title: 'hate me',
      artist: 'Ellie Goulding',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      id: '4',
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      id: '5',
    },
    {
      title: 'without me',
      artist: 'Halsey',
      image:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      id: '6',
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({value}) => {
      const val = Math.round(value / width);

      setSongIndex(val);

      // little buggy
      //if previous index is not same then only update it
      // if (val !== songIndex) {
      //   setSongIndex(val);
      //   console.log(val);
      // }
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderItem = ({index, item}) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100,
              ),
            },
          ],
        }}>
        <Animated.Image
          source={{uri: item.image}}
          style={{width: 320, height: 320, borderRadius: 5}}
        />
        <Animated.Image
          source={{uri: item.image}}
          style={{width: 320, height: 320, borderRadius: 5}}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{height: 320}}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        <Text style={styles.title}>{songs[songIndex + 1].title}</Text>
        <Text style={styles.artist}>{songs[songIndex + 1].artist}</Text>
      </View>

      {/* <Controller onNext={goNext} onPrv={goPrv} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  container: {
    justifyContent: 'space-evenly',
    height: height,
    maxHeight: 500,
  },
});
