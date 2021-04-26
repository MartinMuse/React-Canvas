import React, {useState} from 'react'
import "./circle.css"

export function Circle(props) {
  const onClickHandler = () => {
    props.setCurrentZIndex((prev) => ++prev)
    props.setCurrentActiveEl(props.id)
  }

  return (
      <div className={"circle"} style={props.isActive
          ? {
            borderColor: 'blue',
            borderWidth: '2px',
            zIndex: props.currentZIndex
          }
          : {
            zIndex: props.order
          }}
           onClick={onClickHandler}
           onDragStart={(e) => e.preventDefault()}
           onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget, 'circle', props.id)}>
      </div>
  )
}
