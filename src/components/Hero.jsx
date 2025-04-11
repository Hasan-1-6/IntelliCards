import React, { useEffect, useState } from "react";
import Card from "./Card";
import { model } from "./gemini";
import { IoIosSend } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

//just use setData to set saved localstorage array as Data
function Hero(props) { //props dena hai 
  
  useEffect(() =>{
    setCardsNum(props.LsData.length)
   setData(props.LsData)
  },[props.LsData])

  //use useEffect here and make it eye the prop ill be passing to setData = prop.lsData to cause a re render
  const [cardsNum, setCardsNum] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [resetSignal, setResetSignal] = useState(false);
  const [Data, setData] = useState([]); //data that maps our q&a

async function GenerateAiText(){
  if(!inputVal){
    alert('Enter prompt')
    return;
  }
  toast.loading('Loading Cards...',{
    style: {
      borderRadius: '10px',
      background: '#1e3a8a',
      color: '#fff',
    },
  })
  const prompt = `Make ${cardsNum} flashcards on ${inputVal} under 30 words`
  const result = await model.generateContent(prompt);
  setResetSignal((prev) => !prev)
  const data = JSON.parse(result.response.text())
  
  setData(data)
  toast.dismiss();
  }

  const buttonsArr = [1, 2, 3,4 ,5, 6, 7, 8];
  const buttonsElems = buttonsArr.map((id) => {
    return (
      <button
        className="hover:bg-gray-900 rounded-lg"
        key={id}
        onClick={() => {
          setCardsNum(id);
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {id}
      </button>
    );
  });

  function storeDataLS(){
    if(inputVal && Data.length > 0){
      const arrData = JSON.stringify(Data)
      localStorage.setItem(inputVal, arrData);
      toast.success('Saved!', {
        style: {
          borderRadius: '10px',
          background: '#1e3a8a',
          color: '#fff',
        },
      })
    }
  }




  //use animate-pulse for cards
  return (
    
    <div className="">
      <div><Toaster/></div>
      <div className="min-h-[86vh]  flex justify-center  backdrop-opacity-20">
        <div className="flex justify-center items-center shrink-0 gap-x-10 gap-y-6 flex-wrap w-11/12 py-6 ">
          {/* put this mapping in a function and pass data as an argument init by state itself */}
          {cardsNum ? Data.map((newArr, index) => (
            if(typeof(newArr) !== object) continue; 
            return <Card key = {index} question = {newArr.question} answer = {newArr.answer} resetSignal={resetSignal}/> 
          )) : 
          <p className="text-9xl select-none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-700 font-extrabold tracking-tight">
            Hello There !!!
          </p>}
        </div>
      </div>
      
      <div className=" bottom-0 bg-transparent sticky">
      <button onClick={storeDataLS} className="text-white border-white absolute  right-10 bottom-16 bg-blue-900 rounded-full p-4"><FaSave/></button>
        {/*  input field here  */}
        <div className="mx-auto w-11/12 bg-white/5 rounded-xl text-white h-12 flex justify-between items-center pl-2 md:pl-6 pr-1  font-semibold">
          <input
            type="text"
            placeholder="Enter prompt.."
            className=" bg-transparent flex-1  h-full focus:outline-none"
            onChange={event => setInputVal(event.target.value)}
          />
          <div className=" relative bg-blue-950 opacity-85 h-4/5 rounded-xl flex items-center w-max text-sm">
            <button type="submit" onClick={GenerateAiText} className="pr-[3px] pl-[12px] text-center ">
            <IoIosSend className="text-lg hover:text-blue-500/80 transition" />
            </button>
            <RxDividerVertical className="opacity-30 text-xl"/>
            <button
              onClick={() => setIsOpen((isOpen) => !isOpen)}
              className=" bg-blue-950 opacity-85 text-[12px] pr-[12px] pl-[2px] hover:text-blue-500/80 transition"
            >
              {cardsNum}
            </button>

            <div className={`absolute bottom-12 w-full flex justify-center flex-col gap-y-4 bg-black/50 p-2 rounded-xl transition
                              ${isOpen ? `opacity-100 pointer-events-auto translate-y-0`: `opacity-0 pointer-events-none` }`}>
                {buttonsElems}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Hero;
