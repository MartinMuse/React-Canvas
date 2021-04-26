import {combineReducers, createStore} from "redux";
import {circlesReducer} from "./Circles/circlesReducer";
import {rectanglesReducer} from "./Rectangles/rectanglesReducer";

const rootReducer = combineReducers({
  circlesReducer, rectanglesReducer
})

const store = createStore(rootReducer)

export default store
