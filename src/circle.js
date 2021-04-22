import "./circle.css"

export function Circle(props) {
  return (
      <div className={"circle"} onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget)}>
      </div>
  )
}
