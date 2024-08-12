import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getIntent, selectShops, setShops } from "../store/shopSlice";
import ShopCard from "./ShopCard";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

function ViewWindow({ messages, setMessages }) {
  const [selectedShop, setSelectedShop] = useState(null);
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const viewShops = useSelector(selectShops);
  const intent = useSelector(getIntent);

  function handleShopCardClick(shop) {
    if (intent == "ADD_REVIEW") {
      proceedReviewWithSelectedShop(shop);
      dispatch(setShops([])); // clear the view
    } else if (intent == "RECOMMEND") {
      setSelectedShop(shop);
      if (shop.reviews.length != 0) {
        setReviews(shop.reviews);
      }
    }
  }

  function handleBackToShopsClick() {
    setSelectedShop(null);
    setReviews([]);
  }

  async function proceedReviewWithSelectedShop(selectedShop) {
    try {
      // Send data for selected shop
      fetch("http://localhost:8080/chat/selectShop", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(selectedShop),
      })
        .then((response) => response.json()) // Convert the response to JSON
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: data.content },
          ]);

          // Proceed with the second fetch call to start review
          return fetch("http://localhost:8080/chat/newMessage", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              role: "user",
              content: "I am now ready to fill up the review",
            }),
          });
        })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: data.content },
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="ViewWindow h-full overflow-y-scroll p-4">
      {selectedShop ? (
        <div className="ReviewsView">
          <button
            className="mb-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleBackToShopsClick}
          >
            Back to Shops
          </button>
          {reviews.map((review) => (
            <div>
              <ReviewCard key={review.reviewId} review={review} />
              <hr className="my-12 mx-auto" style={{ width: "55%" }}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="GridView grid grid-cols-3 gap-4">
          {viewShops.map((shop, index) => (
            <ShopCard
              key={index}
              shop={shop}
              onClick={() => handleShopCardClick(shop)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewWindow;
