import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function Login() {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("admin1234");
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
      navigate("/");
    } catch (err) {
      console.log(err, "<<< handleLogin");
    }
  };

  // function handleCredentialResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }
  // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // useEffect(() => {
  //   window.google.accounts.id.initialize({
  //     client_id: googleClientId,
  //     callback: handleCredentialResponse,
  //   });
  //   window.google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //     }
  //   );
  //   // google.accounts.id.prompt();
  // }, []);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-center p-4 border-b border-red-600 text-white">
          Login
        </h3>
        <div className="p-6">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
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
              />
            </div>
            <div className="mb-4">
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
          <div className="flex justify-center mt-3">
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
