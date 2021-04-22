import {Circle} from "./circle";
import {Parallelogramm} from "./parallelogramm";
import "./App.css"

function App() {
  const onMouseDownHandler = (e, element) => {
    let shiftX = e.clientX - element.getBoundingClientRect().left;
    let shiftY = e.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
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
              <Circle onMouseDownHandler={onMouseDownHandler}/>
              <Parallelogramm onMouseDownHandler={onMouseDownHandler}/>
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
