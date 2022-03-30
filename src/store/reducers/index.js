import { combineReducers } from "redux";

import category from "./Category";
import currency from "./Currency";
import cart from "./Cart";

export default combineReducers({
  category,
  currency,
  cart,
});
