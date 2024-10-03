import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseURL.post("/register", {
        username,
        email,
        password,
        // role,
      });
      console.log(data.data, "<<< handleRegister");
      navigate("/login");
    } catch (err) {
      navigate("/login");
      console.error(err, "<<< err handleRegister");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full h-auto py-8 bg-opacity-80">
        <h3 className="text-3xl font-semibold text-center p-4 border-b border-red-600 text-white">
          Register
        </h3>
        <div className="p-6 flex flex-col">
          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 text-gray-200 font-semibold py-2 rounded-md hover:bg-gray-500 transition duration-200"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
