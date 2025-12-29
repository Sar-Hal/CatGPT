export default function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      {!isUser && (
        <div className="mr-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm">
            🐱
          </div>
        </div>
      )}

      <div
        className={`
          max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? "bg-[#4f46e5] text-white rounded-br-md"
              : "bg-[#444654] text-gray-100 rounded-bl-md"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}
