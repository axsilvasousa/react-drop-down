import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as C from "./components"

const listComponent = [
  "Entrevista",
  "Data",
  "Hora"
]


function App() {
  const [selected,setSelected] = useState([])
  const allowDrop = ev => {
    ev.preventDefault()
  }

  const onDragStart = (e,item,type)=>{
    console.log("onDragStart",e,item)
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.setData("text/plain", JSON.stringify({item,type}))
  }

  const onDropExclude = (e)=>{
    e.preventDefault()
    let textPlain = e.dataTransfer.getData("text/plain")
    let data = JSON.parse(textPlain);
    const newSelected = selected.filter(item=>item != data.item)
    setSelected(newSelected || [])
  }

  const onDrop = e => {
    let textPlain = e.dataTransfer.getData("text/plain")
    let data = JSON.parse(textPlain);
    if(data.type !== "preview"){
      const newSelected = selected.filter(item=>item != data.item)
      setSelected([...newSelected,data.item])
    }
  }


  const RenderComponent = (component)=>{
    const Cmp = C[component]
    return <div data-type="component" style={{border:"solid 1px #e1e1e1", padding:"10px",cursor:"move"}} 
      draggable="true" 
      onDragStart={e => onDragStart(e,component,"preview")} >
      <Cmp />
    </div>
  }
  return (
    <div className="App">
     <div id="previewComponent" className="previewComponent" 
      onDragOver={allowDrop}
      onDrop={onDrop}
     >
       {selected.map(Component=>RenderComponent(Component) )}

     </div>

     <div className="listComponent"
      onDragOver={allowDrop}
      onDrop={onDropExclude}
     >
        <ul>
          {listComponent.map(item=>(
            <li 
            draggable="true"
            onDragStart={e => onDragStart(e,item,"selected")}
            >
              {item}
            </li>
          ))}
        </ul>
     </div>

    </div>
  );
}

export default App;
