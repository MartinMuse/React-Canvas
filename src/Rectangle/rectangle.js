import "./rectangle.css"

export function Rectangle(props){
  const onClickHandler = () => {
    props.setCurrentZIndex((prev) => ++prev)
    props.setCurrentActiveEl(props.id)
  }
  return(
      <div className={'rectangle'} onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget, 'rectangle', props.id)}
           onDragStart={(e)=>e.preventDefault()} style={props.isActive
          ? {
            borderColor: 'blue',
            borderWidth: '2px',
            zIndex: props.currentZIndex
          }
          : {
            zIndex: props.order
          }}
           onClick={onClickHandler}>
        <div className={'red-stripe'}>
        </div>
      </div>
  )
}
