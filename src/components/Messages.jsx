import { useEffect, useRef } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import useMessages from "../contexts/MessageContext";
// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css';

export default function Messages() {
  const { messages, loading } = useMessages()
  const msgsEndRef = useRef(null);
  
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // hljs.highlightAll()
  },[messages]);
   
  
	return (
		<div 
		  className="w-full h-[74%] px-4 py-5
			  bg-white overflow-scroll
		">
			{messages.length === 0 ? (
			  
			  /* Greeting Messages */
			  <div
			    className="w-full h-full flex
			      justify-center items-center
			  ">
  			  <h2 className="text-2xl font-medium text-slate-900">
  			    How can I help you?
  			  </h2>
			  </div>
			  
			) : (
			
		  /*User and Asistant Messages */ 
			<div className="w-full h-full">
			  {messages.map((msg, i) => (
  		    <div
            key={i}
            className={`
            w-full h-auto mb-5 flex 
            ${msg.isUser ? "justify-end" : "justify-start" }
            items-center
          `}>
  			    {msg.isUser ? (
  			      
  			      /* User Messages */
              <div 
                className={`
                  w-max max-w-4/5
                  px-4 py-2 text-start text-sm
                  font-medium bg-gray-100
                  ${msg.text.length >= 46 ?
                    "rounded-tl-xl rounded-b-xl" :
                    "rounded-tl-full rounded-b-full"
                  }
                  text-slate-900
                  hover:bg-gray-200
              `}>
                { msg.text } 
              </div>
              
  			    ) : (
  			      
  			      /* Asistant Messages */
              <MarkdownRenderer text={msg.text}/>
    			  )}
  			  </div>
        ))}
        
        {/* Loading */}
        {loading && 
          <div
            className="
            w-full h-8 mb-5 flex
            justify-start items-center
          ">
            <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
          </div>
        }
        
        {/* For ScrollIntoView */}
        { messages.length !== 0 &&
          <div 
            ref={msgsEndRef} 
            className="py-24" 
          />
        }
      </div>
			)}
		</div>
	);
}