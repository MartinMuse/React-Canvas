import {DELETE_RECT, SET_RECT, SET_RECT_XY} from "../types";

const initialState = {
  rectangles: [],
}
export const rectanglesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECT:
      return {
        rectangles: [...state.rectangles, {
          id: action.payload.id,
          order: action.payload.order,
          rectangleX: 0,
          rectangleY: 0,
        }]
      }
    case DELETE_RECT:
      return {
        rectangles: state.filter((el) => el.id !== action.id)
      }
    case SET_RECT_XY: {
      let rectangles = state.rectangles
      const element = rectangles.find((el) => el.id === action.id)
      const index = rectangles.indexOf(element)
      if (index !== -1)
        rectangles[index] = {
          ...rectangles[index],
          rectangleX: action.action.rectangleX,
          rectangleY: action.action.rectangleY
        }
      return { rectangles: rectangles}
    }
    default:
      return state
  }

}
