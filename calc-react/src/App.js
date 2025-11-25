import logo from './logo.svg';
import './App.css';
import {c} from "react/compiler-runtime";
import {useState} from "react";
function App() {
    let [input, setInput] = useState('');

    let elements = [];
    for (let i = 1; i < 10; i++) {
        elements.push(<button className={'btn'} key={i} onClick={(e) => getState(i, e)}>{i}</button>);
    }
    function getState(value) {
        setInput(input+=value);
    }

    function plusV(){
        setInput(input+"+");
    }
    function minusV(){
        setInput(input+"-")
    }
    function multiplyV(){
        setInput(input+"*")
    }
    function dividingV(){
        setInput(input+"/")
    }

    function setZero(){
        setInput(input+"0");
    }

    function equal(){
        try {
            setInput(eval(input));
        }
        catch(err){
           clear();
        }
    }
    function clear(){
        setInput('');
    }

  return (
      <div className="App">
          <header className="App-header">
          </header>
          <div className="App">
              <div className="Container">
                  <input className="calc-result" value={input} readOnly />
                  <div className="calc-wrapper">
                      <div className="calc-list" >
                          {elements}
                          <button className="btn clear" onClick={clear}>C</button>
                          <button className="btn 0" onClick={setZero}>0</button>
                          <button className="btn equal" onClick={equal}>=</button>
                      </div>

                      <div className="opButton">
                          <button className="btn op" onClick={plusV}>+</button>
                          <button className="btn op" onClick={minusV}>-</button>
                          <button className="btn op" onClick={multiplyV}>*</button>
                          <button className="btn op" onClick={dividingV}>/</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
)
    ;

}

export default App;
