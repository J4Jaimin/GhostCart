import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { addToCartApi } from "../api/cartApi";

export default function CourseCard({ _id, name, price, image }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-colors">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ₹{price}
          </span>
          <button
            onClick={async () => {
              addToCart({ name, price, image });
              const data = await addToCartApi(_id);
              console.log(data);
            }
            }
            className="flex cursor-pointer items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
