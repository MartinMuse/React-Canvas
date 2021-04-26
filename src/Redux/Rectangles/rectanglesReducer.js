import {DELETE_RECT, SET_RECT, SET_RECT_XY} from "../types";

const initialState = {
  rectangles: [{
    id: 1,
    order: 0,
    circleX: 0,
    circleY: 0
  }],
}
export const rectanglesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECT:
      return {
        rectangles: [...state.rectangles, {
          id: action.payload.id,
          rectangleX: 0,
          rectangleY: 0,
        }]
      }
    case DELETE_RECT:
      const result = state.rectangles.filter((el) => el.id !== action.payload.id)
      return {
        rectangles: result
      }
    case SET_RECT_XY: {
      let rectangles = state.rectangles
      const element = rectangles.find((el) => el.id === action.id)
      const index = rectangles.indexOf(element)
      if (index !== -1)
        rectangles[index] = {
          ...rectangles[index],
          rectangleX: action.payload.rectangleX,
          rectangleY: action.payload.rectangleY,
          order: action.payload.order
        }
      return {rectangles: rectangles}
    }
    default:
      return state
  }

}
