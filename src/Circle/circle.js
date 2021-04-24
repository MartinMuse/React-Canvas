import "./circle.css"

export function Circle(props) {
  return (
      <div className={"circle"}  onDragStart={(e)=>e.preventDefault()}  onMouseDown={(e)=>props.onMouseDownHandler(e, e.currentTarget, 'circle')} >
      </div>
  )
}
