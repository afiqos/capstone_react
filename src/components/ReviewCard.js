
function ReviewCard({ review }) {

    return (
      <div className="ReviewCard bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="ReviewImage">
          {review.reviewImage && (
            <img
              src={`http://localhost:8080/upload-dir/${review.reviewImage.filename}`}
              alt={review.reviewImage.filename}
              className="w-full h-auto rounded"
            />
          )}
        </div>
        <div className="ReviewContent">
          <p className="text-lg font-semibold">{review.comment}</p>
          <p className="text-sm text-gray-600">Rating: {review.rating}</p>
        </div>
      </div>
    );
}

export default ReviewCard;