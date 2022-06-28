import reducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
//import { StorefrontRounded } from "@mui/icons-material";

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware())
);
//const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))

const persistor = persistStore(store);
export default store;
export { persistor };
