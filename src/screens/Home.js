// import libraries
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {cardPerSlide, imageHeight} from '../constants/Config';
import CarouselSlide from './CarouselSlide';
const {width: screenWidth} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {getVideoApi} from '../actions/GetVideoAction';
import {baseURL} from '../constants/Config';
// create a component
const Home = () => {
  const stepCarousel = useRef(null);
  const [listOfVideo, setListOfVideo] = useState([]);
  const [totalSlide, setTotalSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const dispatch = useDispatch();
  const videoList = useSelector(state => state.videoListReducer.videoList);
  useEffect(() => {
    //console.log('videoList======>', JSON.stringify(videoList));

    if (videoList?.length === 0) {
      dispatch(getVideoApi('GET', baseURL, {}));
    } else {
      const newArr = videoList.videos.map((item, index) => {
        item.paused = null;
        item.index = index;
        // console.log('====', (item.paused = true), index);
        return item;
      });
      setListOfVideo([...newArr]);
    }
  }, []);

  useEffect(() => {
    setListOfVideo(videoList.videos);

    const newArr = videoList.videos.map((item, index) => {
      item.paused = null;
      item.index = index;
      // console.log('====', (item.paused = true), index);
      return item;
    });
    console.log('New Arr', JSON.stringify(newArr));

    setListOfVideo([...newArr]);
  }, [videoList]);

  // function will find out total no of slide and set to state
  const setTotalSlides = contentWidth => {
    // contentWidth received from onContentSizeChange
    if (contentWidth !== 0) {
      const approxSlide = contentWidth / screenWidth;
      if (totalSlide !== parseInt(approxSlide)) {
        setTotalSlide(parseInt(Math.ceil(approxSlide.toFixed(2))));
        calculateNextPrev(parseInt(approxSlide), currentSlide);
      }
    }
  };

  const calculateNextPrev = (totalPage, currentPage) => {
    if (totalPage > currentPage) {
      setNext(true);
    }
    if (currentPage === 1) {
      setPrev(false);
    }
    if (currentPage === totalPage) {
      setNext(false);
    }
    if (currentPage > 1) {
      setPrev(true);
    }
  };

  // function will identify current slide visible on screen
  // Also maintaining current slide on carousel swipe.
  const handleScrollEnd = e => {
    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      let currentSlide = 1;
      if (nativeEvent.contentOffset.x === 0) {
        setCurrentSlide(currentSlide);
      } else {
        const approxCurrentSlide = nativeEvent.contentOffset.x / screenWidth;
        currentSlide = parseInt(Math.ceil(approxCurrentSlide.toFixed(2)) + 1);
        setCurrentSlide(currentSlide);
      }
      calculateNextPrev(totalSlide, currentSlide);
    }
  };

  const goToNext = () => {
    // console.log('===>', JSON.stringify(stepCarousel));
    if (stepCarousel?.current) {
      const scrollPoint = currentSlide * screenWidth;
      stepCarousel.current.scrollTo({x: scrollPoint, y: 0, animated: true});
      // following condition is for android only because in android onMomentumScrollEnd doesn't
      // call when we scrollContent with scroll view reference.
      if (Platform.OS === 'android') {
        handleScrollEnd({
          nativeEvent: {contentOffset: {y: 0, x: scrollPoint}},
        });
      }
    }
  };

  const goToPrev = () => {
    if (stepCarousel?.current) {
      const pageToGo = currentSlide - 2;
      const scrollPoint = pageToGo * screenWidth;
      stepCarousel.current.scrollTo({x: scrollPoint, y: 0, animated: true});
      // following condition is for android only because in android onMomentumScrollEnd doesn't
      // call when we scrollContent with scrollview reference.
      if (Platform.OS === 'android') {
        handleScrollEnd({
          nativeEvent: {contentOffset: {y: 0, x: scrollPoint}},
        });
      }
    }
  };

  const setNext = status => {
    if (status !== isNext) {
      setIsNext(status);
    }
  };

  const setPrev = status => {
    if (status !== isPrev) {
      setIsPrev(status);
    }
  };
  const videoOnClick = (value, index) => {
    listOfVideo[index].paused = value;
    setListOfVideo([...listOfVideo]);

    console.log('>>>>>>>', index);
  };
  const noOfSlides = Math.ceil(listOfVideo.length / cardPerSlide);
  console.log('noOfSlides', noOfSlides);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={stepCarousel}
        contentContainerStyle={styles.scrollViewContainerStyle}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        onContentSizeChange={setTotalSlides}
        onMomentumScrollEnd={handleScrollEnd}
        snapToAlignment={'center'}>
        {[...Array(noOfSlides)].map((e, i) => {
          const startIndex = i + 1;
          const startPosition = startIndex + (startIndex - 1) - 1;
          const endPosition = startIndex * 2;
          return (
            <CarouselSlide
              key={i}
              videoOnClick={videoOnClick}
              cards={listOfVideo.slice(startPosition, endPosition)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isPrev && styles.disable]}
          onPress={goToPrev}
          disabled={!isPrev}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isNext && styles.disable]}
          onPress={goToNext}
          disabled={!isNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  scrollViewContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: '#0D0D0D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  disable: {
    opacity: 0.5,
  },
});
// make this component available to the app
export default Home;
