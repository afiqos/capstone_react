
function UserChatBubble({ message }) {
  const isImageUrl = (message) => {
    return /\.(jpeg|jpg|gif|png|svg)$/.test(message) || message.startsWith('blob:');
  };
  
  return (
    <div className="UserChatBubble flex justify-end">
      <div className="bg-black text-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl p-3 max-w-xs whitespace-pre-wrap">
        {/* {message} */}
        {isImageUrl(message) ? (
          <img src={message} alt="User content" className="max-w-full h-auto rounded-3xl" />
        ) : (
          message
        )}
      </div>
    </div>
  );
}

export default UserChatBubble;