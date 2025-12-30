import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);

  return (
    <div className="p-4 flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!value.trim()) return;
            onSend(value);
            setValue("");
          }
        }}
        className="flex-1 resize-none bg-neutral-800 rounded-lg px-3 py-2 outline-none max-h-40"
        placeholder="Type a message..."
      />

      <button
        onClick={() => {
          if (!value.trim()) return;
          onSend(value);
          setValue("");
        }}
        className="bg-gray-500 hover:bg-gray-600 transition px-4 py-2 rounded-lg"

      >
        Send
      </button>
    </div>
  );
}
