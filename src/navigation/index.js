import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './NavigationService';
import Home from '../screens/Home';
import Player from '../screens/Player';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Home1" component={Player} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
