/**
 * All configuration example
 * google api key, agora api key etc.
 */

import {Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

export const baseURL = 'http://demo9818737.mockable.io/videos';

export const cardPerSlide = 2;
export const cardPadding = 15;
export const paddingAround = cardPadding * 2; // slide horizontal padding
export const cardBetweenPadding = cardPadding * (cardPerSlide - 1);
export const totalPadding = paddingAround + cardBetweenPadding;
export const imageWidth = (screenWidth - totalPadding) / cardPerSlide;
export const imageHeight = imageWidth / (2 / 3);
