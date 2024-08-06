import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectShops, setShops } from "../store/shopSlice";
import ShopCard from "./ShopCard";

function ViewWindow({ messages, setMessages }) {
  const dispatch = useDispatch();
  const viewShops = useSelector(selectShops);
  const listShops = viewShops.map(shop =>
    <li>
      <p>{shop.shopName}</p>
    </li>
  );

  function handleShopCardClick(shop) {
    console.log(`Shop card: ${shop} clicked`);
    proceedReviewWithSelectedShop(shop);
    dispatch(setShops([])); // clear the view
  }

  async function proceedReviewWithSelectedShop(selectedShop) {
    try {
      // Send data for selected shop
      fetch("http://localhost:8080/chat/selectShop", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(selectedShop)
      })
      .then(response => response.json()) // Convert the response to JSON
      .then(data => {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: "bot", text: data.content }
        ]);
    
        // Proceed with the second fetch call to start review
        return fetch("http://localhost:8080/chat/newMessage", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ role: "user", content: "I am now ready to fill up the review" }),
        });
      })
      .then(response => response.json())
      .then(data => {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: "bot", text: data.content }
        ]);
      })
      .catch(error => {
        console.error("Error:", error);
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