import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [localData, setLocalData] = useState([]) //not used yet

  function setDataToState(key){
    const dataFromLs = localStorage.getItem(key);
    const parsedData = JSON.parse(dataFromLs);
    setLocalData(parsedData);
  }
  return (
    <div>
      <Navbar handleLoad = {setDataToState}/>
      
      <Hero LsData = {localData}/>
      
    </div>
  );
}

export default App;
