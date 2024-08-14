import { latestMessageStyle } from "../animation/animations";

function BotChatBubble({ message, isLatest }) {
  return (
    <div
      className="BotChatBubble flex justify-start mt-2"
      style={isLatest ? latestMessageStyle : {}}
    >
      <div className="bg-gray-200 text-black rounded-tl-3xl rounded-tr-3xl rounded-br-3xl p-3 max-w-xs whitespace-pre-wrap">
        {message}
      </div>
    </div>
  );
}

export default BotChatBubble;
