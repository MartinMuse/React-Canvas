import React, {useState, useRef} from 'react'
import {Circle} from "./Circle/circle";
import {Parallelogramm} from "./Parallelogramm/parallelogramm";
import "./App.css"

function App() {
  const [circles, setCircles] = useState([0])
  const [parallels, setParallels] = useState([0])
  const secondColumnRef = useRef(null);
  const firstColumnRef = useRef(null);


  const onMouseDownHandler = (e, element, type) => {
    let shiftX = e.clientX - element.getBoundingClientRect().left;
    let shiftY = e.clientY - element.getBoundingClientRect().top;
    const canvasFieldX1 = secondColumnRef.current.getBoundingClientRect().left
    const canvasFieldX2 = secondColumnRef.current.getBoundingClientRect().right
    const canvasFieldY1 = secondColumnRef.current.getBoundingClientRect().top
    const canvasFieldY2 = secondColumnRef.current.getBoundingClientRect().bottom
    const figuresFieldX1=firstColumnRef.current.getBoundingClientRect().left
    const figureWidth=100;
    const figureHeight=65;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    if (type === "circle") {
      setCircles((prev) => [...prev, circles.length + 1])
    } else if (type === "parallelogramm") {
      setParallels((prev) => [...prev, parallels.length + 1])
    }
    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      //check of the moving-out-of-boundary situations
      if (e.pageY >= canvasFieldY2 + shiftY - figureHeight && e.pageX >= canvasFieldX2 + shiftX - figureWidth){
        moveAt(canvasFieldX2 + shiftX - figureWidth, canvasFieldY2 + shiftY - figureHeight)
      }
      else if (e.pageY <= canvasFieldY1 + shiftY && e.pageX >= canvasFieldX2 + shiftX - figureWidth) {
        moveAt(canvasFieldX2 + shiftX - figureWidth, canvasFieldY1 + shiftY)
      }
      else if (e.pageY <= canvasFieldY1 + shiftY && e.pageX <= figuresFieldX1 + shiftX) {
        moveAt(figuresFieldX1 + shiftX, canvasFieldY1 + shiftY)
      }
      else if (e.pageY >= canvasFieldY2 - figureHeight + shiftY && e.pageX <= figuresFieldX1 + shiftX) {
        moveAt(figuresFieldX1 + shiftX, canvasFieldY2 + shiftY - figureHeight)
      }
      else if (e.pageY <= canvasFieldY1 + shiftY) {
        moveAt(e.pageX, canvasFieldY1 + shiftY)
      }
      else if (e.pageY >= canvasFieldY2 + shiftY - figureHeight) {
        moveAt(e.pageX, canvasFieldY2 + shiftY - figureHeight)
      }
      else if (e.pageX >= canvasFieldX2 + shiftX - figureWidth) {
        moveAt(canvasFieldX2 + shiftX - figureWidth, e.pageY);
      }
      else if (e.pageX <= figuresFieldX1 + shiftX) {
        moveAt(figuresFieldX1 + shiftX, e.pageY);
      } else moveAt(e.pageX, e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
      if (element.getBoundingClientRect().left <= canvasFieldX1) {
        moveAt(canvasFieldX1+shiftX+2,element.getBoundingClientRect().top+shiftY);
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
              <div className={'first-column__content-circle'}>
                {circles.map((c) => <Circle onMouseDownHandler={onMouseDownHandler} id={c}/>)}
              </div>
              <div>
                {parallels.map((p) => <Parallelogramm onMouseDownHandler={onMouseDownHandler} id={p}/>)}
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
