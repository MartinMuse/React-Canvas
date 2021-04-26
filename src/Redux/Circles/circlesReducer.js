import {DELETE_CIRCLE, SET_CIRCLE, SET_CIRCLE_XY} from "../types";

const initialState = {
  circles: [],
}
export const circlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLE:
      return {
        circles: [...state.circles, {
          id: action.payload.id,
          order: action.payload.order,
          circleX: 0,
          circleY: 0,
        }]
      }
    case DELETE_CIRCLE:
      return {
        circles: state.filter((el) => el.id !== action.id)
      }
    case SET_CIRCLE_XY: {
      let {circles} = state
      const element = circles.find((el) => el.id === action.id)
      const index = circles.indexOf(element)
      if (index !== -1)
        circles[index] = {
          ...circles[index],
          circleX: action.payload.circleX,
          circleY: action.payload.circleY
        }
      return {circles: circles}
    }
    default:
      return state
  }

}
