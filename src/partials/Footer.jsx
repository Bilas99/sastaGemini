import { useState, useRef } from 'react'
import { RiSendPlaneFill } from "react-icons/ri";
import useMessages from "../contexts/MessageContext";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default function Footer() {
  const [inputs, setInputs] = useState("")
  const [history, setHistory] = useState([])
  const { messages, setMessages, loading, setLoading } = useMessages()
  const inputRef = useRef(null)
  
  const apikey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apikey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  function handleInput(e) {
    const inp = e.target.value;
    setInputs(inp)
  }

  async function submitMessage() {
    if (!inputs.trim()) {
      setInputs("")
      return;
    }

    setLoading(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Add user message to messages state
    setMessages([
      ...messages,
      { text: inputs, isUser: true },
    ]);

    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          ...messages.map((msg) => ({
            role: msg.isUser ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
        ],
      });

      const result = await chatSession.sendMessage(inputs);
      const response = await result.response;
      const data = response.text();

      setMessages([
        ...messages,
        { text: inputs, isUser: true },
        { text: data, isUser: false }
      ]);

      const historyData = await chatSession.getHistory();
      setHistory(historyData);
      //alert(JSON.stringify(historyData));  // Display history properly - use historyData

    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Error communicating with AI", isUser: false },
      ]);
    } finally {
      setLoading(false);
      setInputs("");
    }
  }

  return (
    <div 
      className="
        w-full h-[18%] px-3 flex flex-col
        justify-around items-center bg-gray-50
    ">
      <div 
        className="
          w-full h-14 flex justify-between
          items-center bg-gray-100 
          rounded-full relative
      ">
        <input 
          type="text"
          placeholder="Message here"
          onChange={ handleInput }
          value={inputs}
          ref={ inputRef }
          className={`
            px-4 w-full h-full text-lg 
            text-slate-700 rounded-full
            outline-none hover:bg-gray-200
          `}
        />

        { inputs !== "" && !loading && (
          <div 
            className="
              w-12 h-12 flex justify-center
              items-center rounded-full bg-gray-200
              absolute right-1 hover:bg-gray-300"
            onClick={submitMessage}
          >
            <RiSendPlaneFill
              size={20}
              className="text-slate-700"
            />
          </div>
        )}
        { loading && (
          <div className="w-8 h-8 absolute right-1 border-4 border-gray-200 border-t-sky-400 animate-spin rounded-full">
          </div>
        )}



      </div>

      <h2 className="text-xs font-medium 
        text-slate-400
      ">
        Sasta Gemini can make mistakes
      </h2>
    </div>
  )
}