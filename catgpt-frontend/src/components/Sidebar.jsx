import { useState, useRef, useEffect } from "react";

export default function Sidebar({
  width,
  onResizeStart,
  chats,
  activeChatId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
}) {
  const [editingId, setEditingId] = useState(null);
  const [value, setValue] = useState("");

  const [menu, setMenu] = useState(null); // { x, y, chatId }
  const sidebarRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      ref={sidebarRef}
      style={{ width }}
      className="relative flex flex-col bg-neutral-900 border-r border-neutral-800"
    >
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full rounded-lg px-3 py-2 text-sm bg-neutral-800 hover:bg-neutral-700"
        >
          + New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;

          return (
            <div
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                const rect = sidebarRef.current.getBoundingClientRect();
                setMenu({
                  chatId: chat.id,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              className={`group mx-2 my-1 px-3 py-2 rounded-md cursor-pointer text-sm ${
                isActive ? "bg-neutral-700" : "hover:bg-neutral-800"
              }`}
            >
              {editingId === chat.id ? (
                <input
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => {
                    onRename(chat.id, value || chat.title);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRename(chat.id, value || chat.title);
                      setEditingId(null);
                    }
                  }}
                  className="w-full bg-neutral-800 outline-none rounded px-1"
                />
              ) : (
                <div className="relative overflow-hidden whitespace-nowrap">
                  <span className="block pr-6 truncate">{chat.title}</span>
                  <div
  className={`pointer-events-none absolute top-0 right-0 h-full w-6 
  transition-opacity
  ${
    isActive
      ? "opacity-0"
      : "opacity-100 group-hover:opacity-0"
  }
  bg-gradient-to-l from-neutral-900 to-transparent`}
/>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Context Menu */}
      {menu && (
        <div
          style={{ top: menu.y, left: menu.x }}
          className="absolute z-50 w-32 rounded-md bg-neutral-800 border border-neutral-700 shadow-lg"
        >
          <button
            className="w-full px-3 py-2 text-sm hover:bg-neutral-700 text-left"
            onClick={() => {
              const chat = chats.find((c) => c.id === menu.chatId);
              setEditingId(chat.id);
              setValue(chat.title);
              setMenu(null);
            }}
          >
            Rename
          </button>

          <button
            className="w-full px-3 py-2 text-sm hover:bg-red-600/30 text-left text-red-400"
            onClick={() => {
              onDelete(menu.chatId);
              setMenu(null);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {/* Resize handle */}
      <div
        onMouseDown={onResizeStart}
        className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-neutral-800 hover:bg-blue-500"
      />
    </div>
  );
}
