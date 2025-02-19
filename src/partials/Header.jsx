// import {useState} from 'react';
import { FaBars } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import useMessages from "../contexts/MessageContext";

function Header() {
  const { messages, setMessages } = useMessages()
  
  function handleNewChat() {
    setMessages([])
  }
  
	return (
		<div 
			className="px-3 py-2 gap-0.5 w-full h-[8%] flex 
			  justify-between items-center bg-gray-50
    ">
      
      {/* Menu container */}
      <div 
        className="w-10 h-10 flex justify-center 
      		items-center rounded-full bg-gray-100
      		hover:bg-gray-200
      ">
  			<FaBars
  				size={20}
  				className="text-slate-900"
  			/>
      </div>
      
      {/* Logo container */}
      <div 
        className={`
          ${messages.length !== 0 ? 'w-4/5' : 'w-80'} h-full 
          flex justify-center items-center
          self-start bg-gray-100 rounded-full
          hover:bg-gray-200
        `}>
        <h2 className="text-xl font-medium text-slate-900">
          Sasta Gemini
        </h2>
      </div>
      
      {/* New icons container */}
      { messages.length !== 0 && 
        <div 
          className="w-10 h-10 flex justify-center 
            items-center rounded-full bg-gray-100
        		hover:bg-gray-200
        ">
    			<MdAddCircle
    				size={25}
    				className="text-slate-900"
    				onClick={handleNewChat}
    			/>
        </div>
      }
      
    
		</div>
	);
}

export default Header;
