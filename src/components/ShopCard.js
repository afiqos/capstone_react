
function ShopCard({ shop }) {
  return (
    <div className="ShopCard h-64 border border-gray-200 p-3 flex flex-col rounded-lg">
      <div className="h-1/2">
        <img src="logo192.png" alt="Shop logo" className="h-full w-full object-contain rounded-t-lg"></img>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-left font-bold">{shop.shopName}</p>
        <p className="text-right">5 stars</p>
      </div>
      <p className="mt-auto">{shop.cuisineType}, {shop.halalType}</p>
      <p className="mt-auto">{shop.address}</p>
    </div>
  );
}

export default ShopCard;