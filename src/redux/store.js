import { createStore, combineReducers } from "redux";
import burgerReducer from "./BurgerReducer";


const rootReducer = combineReducers({ burgerReducer })
export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())