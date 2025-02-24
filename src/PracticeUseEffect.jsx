import { useState, useEffect,} from "react";

function PracticeUseEffect(){

    const [count, setCount] = useState(0);
    const [color, setColor] = useState("red");

    function handleCount(){
        setCount(c=>c+1);
    }

    function subtract(){
        setCount(c=>c-1);
    }
    function changeColor(){
        setColor(c=> c==="red"? "blue":"red");
    }
    useEffect(()=>{
        document.title = `Count: ${count}  ${color}`;
        
    },[count,color]);
    
    return(
        <>
        <div className="container">
            <p style={{color:color}} id="text">{count}</p>
            <button onClick={handleCount}>Add</button>
            <button onClick={subtract}>Subract</button>
            <button onClick={changeColor}>Change Color</button>
        </div>
        </>
    );
}

export default PracticeUseEffect