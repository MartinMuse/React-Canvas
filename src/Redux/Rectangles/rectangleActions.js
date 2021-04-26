import {DELETE_RECT, SET_RECT, SET_RECT_XY} from "../types";

export const setRect = (id, order) => {
  return {
    type: SET_RECT,
    payload: {
      id: id
    }
  }
}
export const deleteRect = (id) => {
  return {
    type: DELETE_RECT,
    payload: {
      id:id
    }
  }
}
export const setRectXY = (id, rectangleX, rectangleY,order) => {
  return {
    type: SET_RECT_XY,
    payload: {
      id: id,
      rectangleX: rectangleX,
      rectangleY: rectangleY,
      order: order
    }
  }
}
