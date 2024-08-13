import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getIntent, selectShops, setShops } from "../store/shopSlice";
import ShopCard from "./ShopCard";
import ReviewCard from "./ReviewCard";
import RatingBubble from "./RatingBubble";
import { useState } from "react";

import blackArrow from "../assets/BlackArrow.png";
import noReviewGif from "../assets/sad.gif";

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
    <div className="ViewWindow h-full overflow-y-scroll">
      {selectedShop ? (
        <div className="ReviewsView">
          <div className="Header bg-[#FAFAFA] p-4 mb-4 grid grid-cols-[auto_1fr] gap-4 items-center">
            <button
              className="w-16 h-16 flex items-center justify-center mr-4 bg-[#DDDDDD] rounded-full text-black hover:bg-[#9D9D9D]"
              onClick={handleBackToShopsClick}
            >
              <img src={blackArrow} alt="Back" className="w-3 h-3" />
            </button>
            <div className="flex flex-col space-y-1 text-black">
              <div className="mb-2 flex justify-start items-center">
                <RatingBubble rating={selectedShop.averageRating} />
                <p className="ml-4 font-bold text-2xl">
                  {selectedShop.shopName}
                </p>
              </div>
              <div className="flex">
                <p className="mr-2">{selectedShop.halalType},</p>
                <p>{selectedShop.cuisineType}</p>
              </div>
              <div className="flex">
                <p>
                  {selectedShop.address}, {selectedShop.estate}
                </p>
              </div>
            </div>
          </div>
          {reviews.length === 0 ? (
            <div className="flex justify-center items-center">
              <img className="mr-4" src={noReviewGif} alt="No review" /> 
              <p>No reviews found.<br/>Please come visit me soon</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.reviewId}>
                <ReviewCard review={review} />
                <hr className="my-12 mx-auto" style={{ width: "53%" }} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="p-4 GridView grid grid-cols-3 gap-4">
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
