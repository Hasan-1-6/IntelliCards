import React, { useEffect, useState } from "react";
import { FaQuestion, FaRegCheckCircle } from "react-icons/fa";



function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    setIsFlipped(false)
  }, [props.resetSignal])


  return (
    <div
      className="flex flex-col text-center relative transition hover:scale-105 hover:-translate-y-2 font-semibold hover:cursor-pointer"

      onClick={() => {
        setIsFlipped((prev) => !prev)

      }
    }
    >
      <div className="relative w-48 h-72 select-none text-white text-center bg-blue-950 rounded-lg border-2 border-white/30 flex justify-center items-center"> 
        <p>{isFlipped ? props.answer : props.question}</p>
      </div>
      <span className="absolute text-white/5 left-7 top-20 text-9xl">
      {isFlipped ? <FaRegCheckCircle/> : <FaQuestion/>}
      </span>

    </div>
  );
}

export default Card;
