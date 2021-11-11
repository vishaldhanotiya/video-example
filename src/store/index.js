import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import videoListReducer from "../reducers";

import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["videoListReducer"],
};
const reducers = combineReducers({
  videoListReducer: videoListReducer,
});
const pReducer = persistReducer(persistConfig, reducers);
// Connect our store to the reducers
const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };
