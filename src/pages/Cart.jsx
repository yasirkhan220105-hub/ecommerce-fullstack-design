function Cart() {
  const cartItems = [
    { name: "HAVIT HV-G92 Gamepad", price: 120, qty: 1 },
    { name: "AK-900 Wired Keyboard", price: 960, qty: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold mb-8">Cart</h2>

      {/* Cart Table Header */}
      <div className="hidden sm:grid grid-cols-4 font-semibold border-b pb-4 mb-4">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>

      {/* Cart Items */}
      {cartItems.map((item, index) => (
        <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center border-b py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded text-xl">
              📦
            </div>
            <p>{item.name}</p>
          </div>
          <p>${item.price}</p>
          <div className="flex items-center border rounded w-fit">
            <button className="px-3 py-1 border-r">-</button>
            <span className="px-3 py-1">{item.qty}</span>
            <button className="px-3 py-1 border-l">+</button>
          </div>
          <p>${item.price * item.qty}</p>
        </div>
      ))}

      {/* Cart Total */}
      <div className="mt-10 w-80 border rounded p-6">
        <h3 className="font-semibold text-lg mb-4">Cart Total</h3>
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p>${subtotal}</p>
        </div>
        <div className="flex justify-between mb-4 border-b pb-4">
          <p>Total:</p>
          <p className="font-bold">${subtotal}</p>
        </div>
        <button className="w-full bg-black text-white py-2 rounded">
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}

export default Cart