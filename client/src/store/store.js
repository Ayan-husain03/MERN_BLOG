import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sessionStorage from "redux-persist/es/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: authReducer,
});
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
