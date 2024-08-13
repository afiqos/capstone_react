import star from "../assets/star-blue.png";

function RatingBubble({ rating }) {
  return (
    <p className="bg-[#4397f7] text-white text-xs font-medium flex items-center space-x-1 py-1 px-1 rounded-lg">
      <img src={star} className="w-4 h-4" alt="Star icon" />
      <span className="w-3 h-4">{rating}</span>
    </p>
  );
}

export default RatingBubble;
