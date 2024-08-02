
function UserChatBubble({ message }) {
  return (
    <div className="UserChatBubble flex justify-end">
      <div className="bg-black text-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl p-3 max-w-xs whitespace-pre-wrap">
        {message}
      </div>
    </div>
  );
}

export default UserChatBubble;