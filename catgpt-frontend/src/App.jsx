import { useState, useRef } from "react";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";

function randomMeowsFromText(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const maxMeows = Math.max(1, words.length);
  const count = Math.floor(Math.random() * maxMeows) + 1;

  return Array.from({ length: count }, () =>
    "meow"
      .split("")
      .map((c) => (Math.random() > 0.5 ? c.toUpperCase() : c))
      .join("")
  ).join(" ");
}
function streamText(fullText, onUpdate, speed = 30) {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    onUpdate(fullText.slice(0, i));
    if (i >= fullText.length) clearInterval(interval);
  }, speed);
}

export default function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: [{ role: "assistant", content: "meow 🐱" }],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(1);

  // 🔹 Sidebar resize state
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isResizing = useRef(false);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // 🔹 Resize handlers
  const startResize = () => {
    isResizing.current = true;
  };

  const stopResize = () => {
    isResizing.current = false;
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(360, Math.max(200, e.clientX));
    setSidebarWidth(newWidth);
  };

  // 🔹 Messaging
const sendMessage = (text) => {
  const reply = randomMeowsFromText(text);
  const replyId = Date.now();

  // add user msg + empty assistant msg
  setChats((prev) =>
    prev.map((chat) => {
      if (chat.id !== activeChatId) return chat;

      const isFirstUserMessage =
        chat.messages.filter((m) => m.role === "user").length === 0;

      return {
        ...chat,
        title: isFirstUserMessage ? text.slice(0, 40) : chat.title,
        messages: [
          ...chat.messages,
          { role: "user", content: text },
          { role: "assistant", content: "", id: replyId },
        ],
      };
    })
  );

  // stream assistant reply
  streamText(reply, (partial) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.map((m) =>
                m.id === replyId ? { ...m, content: partial } : m
              ),
            }
          : chat
      )
    );
  }, 5); // speed (ms per char)
};



  const newChat = () => {
    const id = Date.now();
    setChats((c) => [
      {
        id,
        title: "New Chat",
        messages: [{ role: "assistant", content: "meow 🐱" }],
      },
      ...c,
    ]);
    setActiveChatId(id);
  };

  return (
    <div
      className="h-screen flex bg-neutral-950 text-neutral-100"
      onMouseMove={resize}
      onMouseUp={stopResize}
      onMouseLeave={stopResize}
    >
      {/* Sidebar */}
      <Sidebar
  width={sidebarWidth}
  onResizeStart={startResize}
  chats={chats}
  activeChatId={activeChatId}
  onSelect={setActiveChatId}
  onNewChat={newChat}
  onRename={(id, title) =>
    setChats((c) =>
      c.map((chat) =>
        chat.id === id ? { ...chat, title } : chat
      )
    )
  }
  onDelete={(id) =>
    setChats((c) => c.filter((chat) => chat.id !== id))
  }
/>


      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-neutral-700 bg-neutral-850 flex items-center px-4 font-semibold">

          CatGPT
        </header>

        <main className="flex-1 overflow-hidden">
          {activeChat && <ChatMessages messages={activeChat.messages} />}
        </main>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
