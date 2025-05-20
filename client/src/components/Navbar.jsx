import { Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getCartApi } from "../api/cartApi.js";
import { getUserProfileAPI } from "../api/authApi.js";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { logoutApi } from "../api/authApi.js";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { cartCount, setCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const cartData = await getCartApi();
      setCart(cartData);
    })();
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ProCodrr
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link
              to="/cart" className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Menu>
              <MenuButton className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-gray-300 dark:ring-gray-900 ring-opacity-5 focus:outline-none"
                >
                  <div className="p-1">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-gray-700 dark:text-gray-200">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm">
                            {user.email}
                          </div>
                        </div>
                        <MenuItem>
                          <button
                            onClick={async () => {
                              await logoutApi();
                              window.location.reload();
                            }}
                            className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:dark:bg-white/10 data-[focus]:bg-gray-200 dark:text-gray-200`}
                          >
                            Sign out
                          </button>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          <Link
                            to="/login"
                            className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:dark:bg-white/10 data-[focus]:bg-gray-200 dark:text-gray-200`}
                          >
                            Sign in
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/register"
                            className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:dark:bg-white/10 data-[focus]:bg-gray-200 dark:text-gray-200`}
                          >
                            Create account
                          </Link>
                        </MenuItem>
                      </>
                    )}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav >
  );
}
