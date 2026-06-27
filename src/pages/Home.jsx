import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/products")
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  return (
    <div>
      {/* Top announcement bar */}
      <div className="bg-black text-white text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 text-center">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="underline font-semibold cursor-pointer">ShopNow</span>
        </p>
        <span className="cursor-pointer hidden sm:block sm:absolute sm:right-6">English</span>
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-5 border-b gap-4">
        <h1 className="text-2xl font-bold">Exclusive</h1>

        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-gray-700 text-sm sm:text-base">
          <a href="#" className="border-b-2 border-black pb-1">Home</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Sign Up</a>
        </nav>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-gray-100 rounded px-4 py-2 text-sm flex-1 sm:w-56"
          />
          <span className="cursor-pointer">❤️</span>
          <span className="cursor-pointer">🛒</span>
        </div>
      </header>
     {/* Sidebar + Hero Banner */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-10 py-6 gap-6 lg:gap-10">
        {/* Sidebar */}
        <aside className="w-56 border-r pr-6">
          <ul className="space-y-4 text-gray-700">
            <li className="flex justify-between items-center cursor-pointer">Woman's Fashion <span>›</span></li>
            <li className="flex justify-between items-center cursor-pointer">Men's Fashion <span>›</span></li>
            <li className="cursor-pointer">Electronics</li>
            <li className="cursor-pointer">Home & Lifestyle</li>
            <li className="cursor-pointer">Medicine</li>
            <li className="cursor-pointer">Sports & Outdoor</li>
            <li className="cursor-pointer">Baby's & Toys</li>
            <li className="cursor-pointer">Groceries & Pets</li>
            <li className="cursor-pointer">Health & Beauty</li>
          </ul>
        </aside>

        {/* Hero Banner */}
        <div className="flex-1 bg-black text-white rounded-md flex items-center justify-between px-6 sm:px-12 py-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🍎</span>
              <p className="text-sm">iPhone 14 Series</p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              Up to 10%<br />off Voucher
            </h2>    <a href="#" className="underline font-semibold flex items-center gap-2">
              Shop Now <span>→</span>
            </a>
          </div>
          <div className="text-6xl">📱</div>
        </div>
      </div>
      {/* Featured Products */}
      <div className="px-10 py-10">
        <h3 className="text-red-500 font-semibold mb-2">Our Products</h3>
        <h2 className="text-3xl font-bold mb-8">Explore Our Products</h2>

       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="bg-gray-100 h-40 flex items-center justify-center rounded mb-4 overflow-hidden">
  <img src={product.image} alt={product.name} className="h-full object-contain" />
</div>
              <h4 className="font-medium mb-1">{product.name}</h4>
              <p className="text-red-500 font-semibold">{product.price}</p>
              <button className="mt-3 w-full bg-black text-white py-2 rounded text-sm">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home