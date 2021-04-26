import {DELETE_RECT, SET_RECT, SET_RECT_XY} from "../types";

export const setCircles=(id,order)=>{
  return{
    type:SET_RECT,
    payload:{
      id:id,
      order:order
    }
  }
}
export const deleteCircle=(id)=>{
  return{
    type:DELETE_RECT,
    payload:id
  }
}
export const setCircleXY=(id,rectangleX,rectangleY)=>{
  return{
    type:SET_RECT_XY,
    payload:{
      id:id,
      rectangleX:rectangleX,
      rectangleY:rectangleY
    }
  }
}
