import React from "react";
import deck from '../assets/deck.png'
import { MdDelete } from "react-icons/md";

function Deck(props) {
  
  function deleteEntry(e){
    e.stopPropagation()
    localStorage.removeItem(props.title);
    props.removeDeck(props.title)
  }
  return (
    
    <div className="pt-12" onClick={() => {
        props.handleLoad(props.title);
        props.closeBar()
      }}> 
      <div
        className="flex flex-col text-center relative hover:shadow-2xl hover:shadow-fuchsia-500 transition hover:scale-110"
      >
        <img src={deck} className="relative w-40 h-60 select-none text-white text-center bg-violet-950 rounded-lg border-2 border-white/30 flex justify-center items-center"></img>
        <img src={deck} className="absolute top-2 right-2 w-40 h-60 select-none text-white text-center bg-violet-950 rounded-lg border-2 border-white/30 flex justify-center items-center"></img>
        <img src={deck} className="absolute top-4 right-4  select-none text-white text-center bg-violet-950 rounded-lg border-2 border-white/20 flex justify-center items-center"></img>
        <button className="absolute hover:text-red-500 transition top-6 right-6 rounded-full scale-125" onClick={deleteEntry}> <MdDelete/> </button>  
      </div>
      <div className="pt-6 text-center w-[160px] overflow-clip">{props.title}</div> 
      {/* above me props daalna for labeling the deck */}
    </div>
  );
}

export default Deck;
