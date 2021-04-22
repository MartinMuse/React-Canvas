import React, {useState} from 'react'
import {Circle} from "./Circle/circle";
import {Parallelogramm} from "./Parallelogramm/parallelogramm";
import "./App.css"

function App() {
  const [circles, setCircles] = useState([0])
  const [parallels, setParallels] = useState([0])


  const onMouseDownHandler = (e, element, type) => {
    let shiftX = e.clientX - element.getBoundingClientRect().left;
    let shiftY = e.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    if (type==="circle"){
      setCircles((prev) => [...prev, circles.length + 1])
      console.log(circles)
    }
    else if(type==="parallelogramm"){
      setParallels((prev) => [...prev, parallels.length + 1])
      console.log(parallels)
    }
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(e.pageX, e.pageY);


    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
///Вынести в пропсы

    element.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
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
          <td className={'first-column'}>
            <div className={'first-column__content'}>
              <div className={'first-column__content-circle'}>
                {circles.map((c)=><Circle onMouseDownHandler={onMouseDownHandler} id={c} />)}
              </div>
              <div>
                {parallels.map((p)=><Parallelogramm onMouseDownHandler={onMouseDownHandler} id={p} />)}
              </div>
            </div>
                </td>
                <td className={"second-column"}>
                </td>
                </tr>
                </tbody>
                </table>
                );
                }

                export default App;
