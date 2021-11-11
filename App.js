/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Routes from './src/navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import NoInternetConnectionUI from './src/components/noInternet';

const App = () => {
  const state = store.getState();
  //console.log('=======>', JSON.stringify(state));
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <NoInternetConnectionUI />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
