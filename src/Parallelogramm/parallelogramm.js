import "./parallelogramm.css"
export function Parallelogramm(props){
  return(
      <div className={'parallelogramm'} onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget, 'parallelogramm')}
           onDragStart={(e)=>e.preventDefault()}>
        <div className={'red-stripe'}>
        </div>
      </div>
  )
}
