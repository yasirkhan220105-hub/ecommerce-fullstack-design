import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToCart, getCartCount } from "../cartUtils";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(getCartCount());
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    setCartCount(getCartCount());
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">All Products</h2>
        <Link to="/cart" className="relative inline-flex items-center">
          <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          )}
        </div>
        {search && (
          <p className="text-sm text-gray-500 mt-2">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
          </p>
        )}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-semibold mb-2">No products found</p>
          <p className="text-sm">Try a different name or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <Link to={`/products/${product._id}`} key={index}
              className="border rounded-lg p-4 hover:shadow-md transition block">
              <div className="bg-gray-100 h-40 flex items-center justify-center rounded-md mb-4 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full object-contain" />
              </div>
              {product.category && (
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                  {product.category}
                </span>
              )}
              <h4 className="font-medium mb-1 mt-1 truncate">{product.name}</h4>
              <p className="text-red-500 font-semibold">${Number(product.price).toFixed(2)}</p>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className={`mt-3 w-full py-2 rounded text-sm font-semibold transition
                  ${addedId === product._id ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-800"}`}>
                {addedId === product._id ? "✓ Added!" : "Add To Cart"}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}