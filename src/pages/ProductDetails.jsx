function ProductDetails() {
  return (
    <div className="px-10 py-10">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Product Image */}
      <div className="bg-gray-100 w-full sm:w-96 h-72 sm:h-96 flex items-center justify-center rounded text-6xl">
          📦
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">HAVIT HV-G92 Gamepad</h2>
          <p className="text-gray-500 mb-4">In Stock</p>
          <p className="text-2xl font-bold mb-4">$120</p>
          <p className="text-gray-600 mb-6">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install and mess free removal.
            Pressure sensitive.
          </p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button className="px-4 py-2 border-r">-</button>
              <span className="px-4 py-2">1</span>
              <button className="px-4 py-2 border-l">+</button>
            </div>
            <button className="bg-black text-white px-8 py-2 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails