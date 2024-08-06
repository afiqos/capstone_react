import { useSelector } from "react-redux";
import { selectShops } from "../store/shopSlice";
import ShopCard from "./ShopCard";

function ViewWindow({ messages, setMessages }) {
  const viewShops = useSelector(selectShops);
  const listShops = viewShops.map(shop =>
    <li>
      <p>{shop.shopName}</p>
    </li>
  );

  function handleShopCardClick(shop) {
    console.log(`Shop card: ${shop} clicked`);
    sendSelectedShop(shop);
    setMessages( [...messages, { sender: "user", text: `${shop.shopName} at ${shop.address} selected.` }])
  }

  async function sendSelectedShop(selectedShop) {
    try {
      const response = await fetch("http://localhost:8080/chat/selectShop", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(selectedShop)
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="ViewWindow h-full overflow-y-scroll p-4">
      <div className="GridView grid grid-cols-3 gap-2">
        {/* <ShopCard />
        <ShopCard />
        <ShopCard />
        <ul>{listShops}</ul> */}
        {viewShops.map((shop, index) => (
          <ShopCard key={index} shop={shop} onClick={handleShopCardClick} />
        ))}
      </div>
    </div>
  );
}

export default ViewWindow;