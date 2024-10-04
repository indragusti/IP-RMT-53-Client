import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("hunter1@mail.com");
  const [password, setPassword] = useState("hunter1");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await baseURL.post("/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);
      console.log(response.data, "<<< handleLogin");
      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "Login successful",
      });
    } catch (err) {
      console.log(err, "<<< handleLogin");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${err.response.data.error}`,
      });
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const { data } = await baseURL.post("/login/google", {
        googleToken: response.credential,
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/home");
    } catch (err) {
      console.log(err, "<<< err google login");
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      // client_id: import.meta.env.CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
    window.google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full h-auto py-8 bg-opacity-80">
        <h3 className="text-3xl font-semibold text-center p-4 border-b border-red-600 text-white">
          LOGIN
        </h3>
        <div className="p-6 flex flex-col">
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
          </form>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="w-full bg-gray-600 text-gray-200 font-semibold py-2 rounded-md hover:bg-gray-500 transition duration-200"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
          <div id="buttonDiv" className="mt-10 flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}
