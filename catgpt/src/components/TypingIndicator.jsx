export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
        🐱
      </div>
      <span className="italic">CatGPT is typing…</span>
    </div>
  );
}
