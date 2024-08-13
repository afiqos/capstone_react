import defaultShopImg from "../assets/defaultShopLogo.png";
import RatingBubble from "./RatingBubble";

function ShopCard({ shop, onClick }) {
  function handleCardClick() {
    onClick(shop);
  }

  return (
    <div
      onClick={() => handleCardClick()}
      className="ShopCard h-64 border border-gray-200 flex flex-col rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="flex-shrink-0 h-1/2">
        <img
          src={
            shop.reviews && shop.reviews.length > 0
              ? `http://localhost:8080/upload-dir/${shop.reviews[0].reviewImage.filename}`
              : defaultShopImg
          }
          alt="Shop logo"
          className="h-full w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex-1 p-3">
        <div className="flex justify-between items-center mb-2">
          <p className="text-left text-lg font-semibold">{shop.shopName}</p>
          <RatingBubble rating={shop.averageRating} />
        </div>
        <p className="text-sm text-gray-600">
          {shop.cuisineType}, {shop.halalType}
        </p>
        <p className="text-sm text-gray-600 mt-1">{shop.address}</p>
      </div>
    </div>
  );
}

export default ShopCard;
