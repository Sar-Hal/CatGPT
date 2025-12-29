import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-[#343541]">
      <div className="max-w-3xl mx-auto relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message CatGPT..."
          rows={1}
          className="
            w-full resize-none rounded-xl
            bg-[#40414f] text-white
            px-4 py-3 pr-12
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="
            absolute right-3 bottom-3
            text-indigo-400 disabled:text-gray-500
          "
        >
          🐾
        </button>
      </div>
    </div>
  );
}
