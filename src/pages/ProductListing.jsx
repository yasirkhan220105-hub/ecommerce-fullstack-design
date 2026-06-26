function ProductListing() {
  const products = [
    { name: "HAVIT HV-G92 Gamepad", price: "$120" },
    { name: "AK-900 Wired Keyboard", price: "$960" },
    { name: "IPS LCD Gaming Monitor", price: "$370" },
    { name: "S-Series Comfort Chair", price: "$375" },
    { name: "Breed Dry Dog Food", price: "$100" },
    { name: "CANON EOS DSLR Camera", price: "$360" },
    { name: "ASUS FHD Gaming Laptop", price: "$700" },
    { name: "Curology Product Set", price: "$500" },
  ]

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold mb-8">All Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="bg-gray-100 h-40 flex items-center justify-center rounded mb-4 text-4xl">
              📦
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
  )
}

export default ProductListing