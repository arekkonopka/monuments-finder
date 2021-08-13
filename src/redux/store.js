import { createStore, combineReducers } from "redux";
import burgerReducer from "./BurgerReducer";
import MapReducer from "./MapReducer";


const rootReducer = combineReducers({ burgerReducer, MapReducer })
export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())