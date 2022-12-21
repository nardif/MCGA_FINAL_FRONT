import { combineReducers } from "redux";
import productsReducer from "./reducer";
import reducerLogin from "./reducerLogin";

const rootReducer = combineReducers({
  products: productsReducer,
  login: reducerLogin
});

export default rootReducer;