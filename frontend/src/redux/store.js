import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import jobReducer from "./jobSlice";
import companyReducer from "./companySlice"
import applicationReducer from "./applicationSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";



const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth:authReducer,
  job:jobReducer,
  company:companyReducer,
  application:applicationReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store=configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export default store;