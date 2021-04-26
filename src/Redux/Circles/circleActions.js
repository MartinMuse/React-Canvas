import {DELETE_CIRCLE, SET_CIRCLE, SET_CIRCLE_XY} from "../types";

export const setCircles = (id, order) => {
  return {
    type: SET_CIRCLE,
    payload: {
      id: id
    }
  }
}
export const deleteCircle = (id) => {
  return {
    type: DELETE_CIRCLE,
    payload: {
      id: id
    }
  }
}
export const setCircleXY = (id, circleX, circleY, order) => {
  return {
    type: SET_CIRCLE_XY,
    payload: {
      id: id,
      circleX: circleX,
      circleY: circleY,
      order: order
    }
  }
}
