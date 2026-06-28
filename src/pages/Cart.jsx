import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, updateQty, removeFromCart, clearCart } from "../cartUtils";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleIncrease = (id) => {
    const item = cart.find((p) => p._id === id);
    if (item) setCart(updateQty(id, item.qty + 1));
  };

  const handleDecrease = (id) => {
    const item = cart.find((p) => p._id === id);
    if (item) setCart(updateQty(id, item.qty - 1));
  };

  const handleRemove = (id) => {
    setCart(removeFromCart(id));
  };

  const handleClearCart = () => {
    setCart(clearCart());
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Shopping Cart{" "}
            <span className="text-lg font-normal text-gray-500">
              ({cart.reduce((s, i) => s + i.qty, 0)} items)
            </span>
          </h1>
          <button onClick={handleClearCart}
            className="text-sm text-red-500 hover:text-red-700 underline transition">
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item._id}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">

                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  {item.category && (
                    <p className="text-sm text-gray-400 capitalize">{item.category}</p>
                  )}
                  <p className="text-red-500 font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => handleDecrease(item._id)}
                    className="w-9 h-9 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition">
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => handleIncrease(item._id)}
                    className="w-9 h-9 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition">
                    +
                  </button>
                </div>

                {/* Line Total */}
                <p className="w-20 text-right font-semibold text-gray-800">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

                {/* Remove */}
                <button onClick={() => handleRemove(item._id)}
                  className="text-gray-400 hover:text-red-500 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            <Link to="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-400 mt-4">
                Secure checkout · All major cards accepted
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}