import "./parallelogramm.css"
export function Parallelogramm(props){
  return(
      <div className={'parallelogramm'} onMouseDown={(e) => props.onMouseDownHandler(e, e.currentTarget, 'parallelogramm')}
           onClick={(e)=>props.onClickHandler(e)}>
        <div className={'red-stripe'}>
        </div>
      </div>
  )
}
