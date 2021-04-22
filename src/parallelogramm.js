import "./parallelogramm.css"
export function Parallelogramm(props){
  return(
      <div className={'parallelogramm'} onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget)}>
        <div className={'red-stripe'}>
        </div>
      </div>
  )
}
