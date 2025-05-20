import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Your Cart
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your cart is empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Your Cart
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden divide-y divide-gray-200 rounded-xl dark:divide-gray-700">
        {cart.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ₹{total}
          </span>
        </div>
        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
