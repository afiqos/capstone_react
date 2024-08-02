import ShopCard from "./ShopCard";

function ViewWindow() {
  return (
    <div className="ViewWindow h-full overflow-y-scroll bg-blue-100 p-4">
      <div className="GridView grid grid-cols-3 gap-2">
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
      </div>
    </div>
  );
}

export default ViewWindow;