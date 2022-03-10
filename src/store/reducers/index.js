import { combineReducers } from "redux";


import category from "./Category";
import currency from './Currency'

export default combineReducers({
    category,
    currency
})