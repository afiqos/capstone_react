import emptyStar from "../assets/Empty-star.png";
import filledStar from "../assets/Filled-star.png";

function ReviewCard({ review }) {
  const emptyStars = 5 - review.rating;

  return (
    <div className="ReviewCard mx-auto" style={{ width: "45%" }}>
      <div className="flex items-center mb-4">
        {[...Array(review.rating)].map((_, index) => (
          <img
            key={index}
            src={filledStar}
            alt="Filled star"
            className="w-4 h-4"
          />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <img
            key={index}
            src={emptyStar}
            alt="Empty star"
            className="w-4 h-4"
          />
        ))}
        <span className="text-center mx-2 text-gray-400">&bull;</span>
        <p className="text-base text-gray-400">1 day ago</p>
      </div>

      <div className="ReviewImage mb-4">
        {review.reviewImage && (
          <img
            src={`http://localhost:8080/upload-dir/${review.reviewImage.filename}`}
            alt={review.reviewImage.filename}
            className="w-full h-auto rounded"
          />
        )}
      </div>
      <div className="ReviewContent">
        <p className="text">{review.comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
