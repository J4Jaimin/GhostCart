import { useState } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState("Shubham Semwal");
  const [email, setEmail] = useState("shubham@gmail.com");
  const [password, setPassword] = useState("shubham@123");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = registerApi(name, email, password);
    navigate('/login');
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Create an account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
            />
          </div>

          <button
            type="submit" onClick={() => handleSubmit()}
            className="w-full flex justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
