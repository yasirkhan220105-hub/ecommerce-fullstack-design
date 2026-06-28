import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
  axios.get(`http://localhost:5000/api/products/${id}`)
    .then((res) => {
      setProduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [id]);
  return (
    <div className="px-10 py-10">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Product Image */}
      <div className="bg-gray-100 w-full sm:w-96 h-72 sm:h-96 flex items-center justify-center rounded overflow-hidden">
  <img src={product?.image} alt={product?.name} className="h-full object-contain" />
</div>

        {/* Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{product?.name}</h2>
<p className="text-gray-500 mb-4">{product?.stock > 0 ? "In Stock" : "Out of Stock"}</p>
<p className="text-2xl font-bold mb-4">${product?.price}</p>
<p className="text-gray-600 mb-6">{product?.description}</p>

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