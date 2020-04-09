import React, { useState, useEffect } from 'react';
import './App.css';
import CheckedList from './CheckedList';

function App() {
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState("")
  const [obj, setobj] = useState({})
  const [checkedItems, setcheckedItems] = useState([])
  let copyval = value;
  
  
  const ChangeHandler = e => {
    setvalue(
      e.target.value
    )
  }

  const clickHandler = (e) => {
    let refer = { ...obj };
    let arr = [...data];
    refer.label = value;
    refer.checked = false;
    setobj( refer)
    arr.push(refer)
    setdata(
      arr
    )
    e.preventDefault();
  }

  const deleteHandler = (index) => {
   let newdata = [...data]
   let found = newdata.findIndex(elem => newdata.indexOf(elem) == index )
  let updated = newdata.splice(found, 1)
    setdata(
      newdata
    )
  }

const updateHandler = e => {
copyval = e.target.value


}

const update = index => {
  let updData = [...data];
let got = updData.findIndex(i => updData.indexOf(i) == index );
updData[got]['label'] = copyval
setdata(
  updData
)

}

let checkarr = [...data];
const checkHandler = ( e, index) => {
 let elem = checkarr.findIndex(i => checkarr.indexOf(i) == index)
 checkarr[elem]['checked'] = e.target.checked;
 
 
 setobj( checkarr )
let check = checkarr.filter(ch => ch.checked === true )
console.log(check);
setcheckedItems( check )


}

let items_checked = checkedItems.map( ch =>  <CheckedList checkedlist ={ch.label} /> )

  return (
    <div className="App">
      <h1> Your todos</h1>
      <form>
        <input className="input" value={value} onChange={e => { ChangeHandler(e) }} />
        <button onClick={e => { clickHandler(e) }}  >Click</button>
      </form>
      <form className="todos">
        <ul>
          {data.map((todo, index) => {
            return <>
              <li> <input className="checkbox" type="checkbox" onChange={e => {checkHandler(e, index)}} /> 
              <label> {todo.label} </label> </li> <input className="updateinput"  onChange={e => {updateHandler(e)}} />
              <span onClick={e => {update(index)}  }> Update</span>
              <span onClick= {() => {deleteHandler(index) }}> Delete</span>
            </>
          })}
        </ul>
      </form>
      <div id="checked">
    {items_checked}
    </div>
     
    </div>
  );
}

export default App;
