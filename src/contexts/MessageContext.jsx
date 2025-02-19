import { createContext, useContext } from "react";

export const MessageContext = createContext({
  messages: [],
  loading: false
})

export const MessageProvider = MessageContext.Provider

export default function useMessages() {
   return useContext(MessageContext)
}