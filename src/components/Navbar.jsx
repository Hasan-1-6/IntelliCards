import React, { useEffect } from "react";
import icon from "../assets/cards_icon.png";
import { useState } from "react";
import Deck from "./Deck";
import { TbCards } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [deck, setDeckFromLs] = useState([]);
  
  useEffect(()=>{
    try {
      setDeckFromLs(Object.keys(localStorage));
    } catch (error) {
      console.log(error)
    }
  }, [isOpen])

  function removeDeck(title){

    setDeckFromLs(deck.filter(key => key != title ))
    toast.success('Deleted!', {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: '#1e3a8a',
        color: '#fff',
      }
      }
    )
  }
  return (
    <div className="w-full bg-gray-950 h-10 text-white flex items-center sticky top-0 border-b border-white/20 select-none z-50">
      <div className="font-extrabold ml-3 tracking-wider text-white/80 visible max-[500px]:hidden">
        Hello There! 
      </div>
      <div className="font-semibold ml-auto max-[500px]:ml-3 flex items-center hover:scale-105 transition ">
        <img src={icon} className="w-9 hover:scale-110 transition"></img>
        IntelliCards
      </div>
      <div
        // onClickCapture={() => setIsOpen((prev) => !prev)}
        className=" relative ml-auto mr-3 font-semibold border border-white/30  hover:border-blue-500/60 transition p-[9px] px-3 rounded-xl bg-gray-950 z-50 text-white/80"
      >
        <button onClick={() => setIsOpen((prev) => !prev)} className="hover:text-blue-500/80 transition flex items-center h-4/5"><TbCards className="opacity-80"/></button>
        <div className={`absolute bg-black/50 right-[-8px] top-9 p-6 h-[94vh] w-[50vw] md:w-[40vw] lg:w-[30vw] max-[540px]:w-[100vw] flex items-center flex-col  backdrop-blur-sm rounded-bl-md border-l border-white/20 overflow-scroll transition-all duration-300 ${isOpen ? ' visible opacity-100 scale-100 pointer-events-auto' : 'scale-0 -translate-y-80 translate-x-48 pointer-events-none opacity-0'} `}>
          {deck && deck.map((key, i) => {
              return (<Deck closeBar={() => setIsOpen((prev) => !prev)} title = {key} key = {i} handleLoad = {props.handleLoad} removeDeck = {removeDeck}/>)
            })}
        </div>
      </div>
    </div>
  );
}

//

export default Navbar;
