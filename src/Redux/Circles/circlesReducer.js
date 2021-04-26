import {DELETE_CIRCLE, SET_CIRCLE, SET_CIRCLE_XY} from "../types";

const initialState = {
  circles: [{
    id: 0,
    order: 0,
    circleX: 0,
    circleY: 0
  }],
}
export const circlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLE:
      return {
        circles: [...state.circles, {
          id: action.payload.id,
          circleX: 0,
          circleY: 0,
        }]
      }
    case DELETE_CIRCLE:
      const result = state.circles.filter((el) => el.id !== action.payload.id)
      return {
        circles: result
      }
    case SET_CIRCLE_XY: {
      let {circles} = state
      const element = circles.find((el) => el.id === action.payload.id)
      const index = circles.indexOf(element)
      if (index !== -1)
        circles[index] = {
          ...circles[index],
          circleX: action.payload.circleX,
          circleY: action.payload.circleY,
          order: action.payload.order
        }
      return {circles: circles}
    }
    default:
      return state
  }

}
