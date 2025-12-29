import { useState } from "react";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: text,
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Meow",
        },
      ]);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col bg-[#343541] text-white">
      {/* Optional debug banner */}
      {/* <div className="bg-green-500 text-black p-2 text-center">
        TAILWIND ACTIVE
      </div> */}

      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
