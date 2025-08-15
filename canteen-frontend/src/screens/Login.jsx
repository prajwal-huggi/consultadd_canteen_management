import { useState } from "react";
import LoginService from "../services/loginService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function onSubmitLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      console.log(email, password);

      const response = await LoginService(email, password);
      console.log(response);

      // Check for success in the full 2xx range
      if (response?.status >= 200 && response?.status < 300) {
        // Store token for authenticated requests
        if (response.data?.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("role", response.data.role);
        }

        const role = response.data?.role;
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "EMPLOYEE") {
          navigate("/user");
        } else {
          setMessage("Role not yet defined. Please contact support.");
        }
      } else {
        setMessage(response?.data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">
            {message}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onSubmitLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 disabled:opacity-50"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 disabled:opacity-50"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            disabled={loading}
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200 disabled:opacity-50"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
