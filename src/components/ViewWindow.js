import { useSelector } from "react-redux";
import { selectShops } from "../store/shopSlice";
import ShopCard from "./ShopCard";

function ViewWindow() {
  const viewShops = useSelector(selectShops);
  const listShops = viewShops.map(shop =>
    <li>
      <p>{shop.shopName}</p>
    </li>
  );
  return (
    <div className="ViewWindow h-full overflow-y-scroll p-4">
      <div className="GridView grid grid-cols-3 gap-2">
        {/* <ShopCard />
        <ShopCard />
        <ShopCard />
        <ul>{listShops}</ul> */}
        {viewShops.map((shop, index) => (
          <ShopCard key={index} shop={shop} />
        ))}
      </div>
    </div>
  );
}

export default ViewWindow;