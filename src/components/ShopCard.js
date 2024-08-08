function ShopCard({ shop, onClick }) {
  function handleCardClick() {
    onClick(shop);
  }

  return (
    <div
      onClick={() => handleCardClick()}
      className="ShopCard h-64 border border-gray-200 p-3 flex flex-col rounded-lg"
    >
      <div className="h-1/2">
        <img
          src={
            shop.reviews && shop.reviews.length > 0
              ? `http://localhost:8080/upload-dir/${shop.reviews[0].reviewImage.filename}`
              : "defaultShopLogo.png"
          }
          alt="Shop logo"
          className="h-full w-full object-contain rounded-t-lg"
        />
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-left font-bold">{shop.shopName}</p>
        <p className="text-right">{shop.averageRating} stars</p>
      </div>
      <p className="mt-auto">
        {shop.cuisineType}, {shop.halalType}
      </p>
      <p className="mt-auto">{shop.address}</p>
    </div>
  );
}

export default ShopCard;
