import { useEffect, useRef } from "react";

export default function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto chat-scroll">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`w-fit max-w-[85%] break-words p-3 rounded-lg ${
              m.role === "user"
  ? "bg-neutral-600 text-neutral-200 ml-auto"
  : "bg-neutral-800 text-neutral-100"

            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
