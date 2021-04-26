import React, {useState, useRef} from 'react'
import {Circle} from "./Circle/circle";
import {Rectangle} from "./Rectangle/rectangle";
import "./App.css"

function App() {
  const [circles, setCircles] = useState([Date.now()]) // array of circles' id's
  const [rectangles, setRectangles] = useState([Date.now() + 1]) // array of rectangles' id's
  const [orderOfElementsInCanvas,setOrderOfElementsInCanvas]=useState([])

  const [currentActiveEl, setCurrentActiveEl] = useState()
  const [currentZIndex, setCurrentZIndex] = useState(100)

  const secondColumnRef = useRef(null);
  const firstColumnRef = useRef(null);
  const firstColumnContentCircleRef = useRef(null);
  const firstColumnContentRectRef = useRef(null);


  const onMouseDownHandler = (e, element, type, id) => {
    let shiftX = e.clientX - element.getBoundingClientRect().left;
    let shiftY = e.clientY - element.getBoundingClientRect().top;

    const canvasFieldX1 = secondColumnRef.current.getBoundingClientRect().left
    const canvasFieldX2 = secondColumnRef.current.getBoundingClientRect().right
    const canvasFieldY1 = secondColumnRef.current.getBoundingClientRect().top
    const canvasFieldY2 = secondColumnRef.current.getBoundingClientRect().bottom
    const figuresFieldX1 = firstColumnRef.current.getBoundingClientRect().left

    const figureWidth = 100;
    const figureHeight = 65;


    setCurrentZIndex((prev)=>++prev)
    setCurrentActiveEl(id)

    if (element.getBoundingClientRect().left < canvasFieldX1) {

      element.style.position = 'absolute';
      element.style.zIndex = currentZIndex;
      setOrderOfElementsInCanvas((prev)=>[...prev,id])
      if (type === "circle") {
        firstColumnContentCircleRef.current.appendChild(element);
        setCircles((prev) => [...prev, Date.now()])
      } else if (type === "rectangle") {
        firstColumnContentRectRef.current.appendChild(element);
        setRectangles((prev) => [...prev, Date.now()])
      }
    }
    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      //checking of being inside the canvas
      if ((e.pageY >= canvasFieldY2 + shiftY - figureHeight) && (e.pageX >= canvasFieldX2 + shiftX - figureWidth)
          && (e.pageX < canvasFieldX2)) {
        moveAt(canvasFieldX2 + shiftX - figureWidth, canvasFieldY2 + shiftY - figureHeight)
      } else if ((e.pageY <= canvasFieldY1 + shiftY) && (e.pageX >= canvasFieldX2 + shiftX - figureWidth)
          && (e.pageY > canvasFieldY1) && (e.pageX < canvasFieldX2)) {
        moveAt(canvasFieldX2 + shiftX - figureWidth, canvasFieldY1 + shiftY)
      } else if ((e.pageY <= canvasFieldY1 + shiftY) && (e.pageX <= figuresFieldX1 + shiftX) && (e.pageX > figuresFieldX1)) {
        moveAt(figuresFieldX1 + shiftX, canvasFieldY1 + shiftY)
      } else if ((e.pageY >= canvasFieldY2 - figureHeight + shiftY) && (e.pageX <= figuresFieldX1 + shiftX) && (e.pageX > figuresFieldX1)) {
        moveAt(figuresFieldX1 + shiftX, canvasFieldY2 + shiftY - figureHeight)
      } else if ((e.pageY <= canvasFieldY1 + shiftY) && (e.pageY > canvasFieldY1) && (e.pageX < canvasFieldX2)) {
        moveAt(e.pageX, canvasFieldY1 + shiftY)
      } else if ((e.pageY >= canvasFieldY2 + shiftY - figureHeight) && (e.pageY < canvasFieldY2) && (e.pageX < canvasFieldX2)) {
        moveAt(e.pageX, canvasFieldY2 + shiftY - figureHeight)
      } else if ((e.pageX >= canvasFieldX2 + shiftX - figureWidth) && (e.pageX < canvasFieldX2)) {
        moveAt(canvasFieldX2 + shiftX - figureWidth, e.pageY);
      } else if ((e.pageX <= figuresFieldX1 + shiftX) && (e.pageX > figuresFieldX1)) {
        moveAt(figuresFieldX1 + shiftX, e.pageY);
      } else moveAt(e.pageX, e.pageY)
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function () {

      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
      //if element is situated in the first column and mouse button is up
      if (element.getBoundingClientRect().left < canvasFieldX1 && element.getBoundingClientRect().left >= figuresFieldX1) {
        moveAt(canvasFieldX1 + shiftX + 2, element.getBoundingClientRect().top + shiftY);
      }
      //if element is out of the canvas then delete it
      if ((element.getBoundingClientRect().left < figuresFieldX1) || (element.getBoundingClientRect().right > canvasFieldX2)
          || (element.getBoundingClientRect().top < canvasFieldY1) || (element.getBoundingClientRect().bottom > canvasFieldY2)) {
        if (type === "circle") {
          setCircles((prev) => {
            return prev.filter((el) => el !== id)
          })
        } else if (type === "rectangle") {
          setRectangles((prev) => {
            return prev.filter((el) => el !== id)
          })
        }
      }
    };
  }


  return (

      <table className={'main-table'}>
        <thead>
        <tr>
          <th>Figures</th>
          <th>Canvas</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className={'first-column'} ref={firstColumnRef}>
            <div className={'first-column__content'}>
              <div className={'first-column__content-circle'} ref={firstColumnContentCircleRef}>
                {circles.map((id) => <Circle onMouseDownHandler={onMouseDownHandler} id={id} key={id}
                                             setCurrentActiveEl={setCurrentActiveEl}
                                             isActive={currentActiveEl === id}
                                             setCurrentZIndex={setCurrentZIndex}
                                             currentZIndex={currentZIndex}
                                             order={()=>orderOfElementsInCanvas.indexOf(id)}

                />)}
              </div>
              <div className={'first-column__content-rectangle'} ref={firstColumnContentRectRef}>
                {rectangles.map((id) => <Rectangle onMouseDownHandler={onMouseDownHandler} id={id} key={id}
                                                   setCurrentActiveEl={setCurrentActiveEl}
                                                   isActive={currentActiveEl === id}
                                                   setCurrentZIndex={setCurrentZIndex}
                                                   currentZIndex={currentZIndex}
                                                   order={()=>orderOfElementsInCanvas.indexOf(id)}/>) }
              </div>
            </div>
          </td>
          <td className={"second-column"} ref={secondColumnRef}>
          </td>
        </tr>
        </tbody>
      </table>);
}

export default App;
