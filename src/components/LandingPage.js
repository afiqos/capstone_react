import React, { useEffect, useState } from "react";

function LandingPage({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1;
        if (nextProgress >= 100) {
          clearInterval(interval);
          onLoadComplete(); // Trigger completion once progress reaches 100%
        }
        return nextProgress;
      });
    }, 30); // Increase progress every 30ms

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="LandingPage h-screen flex flex-col justify-center items-center bg-black">
      <div className="text-white text-4xl mb-8">I am loading...</div>
      <div className="w-1/2 bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
          style={{ width: `${progress}%` }}
        >
          <p>{progress}%</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
