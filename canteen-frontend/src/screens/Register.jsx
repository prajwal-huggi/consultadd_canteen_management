import { useState } from "react";
import isValidEmail from "../components/isValidEmail";
import isValidPassword from "../components/isValidPassword";
import { useNavigate } from "react-router-dom";
import RegisterService from "../services/RegisterService";

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate= useNavigate();
    
async function onSubmitRegister(e) {
    e.preventDefault();

    console.log("inside the onSubmit Register");
    if (password !== confirmPassword) {
        setMessage("Password is not same");
        return;
    }
    if (!isValidPassword(password)) {
        setMessage("Enter valid password: 8 characters, lowercase, uppercase, number and special character");
        return;
    }

    setLoading(true);
    setMessage('');

    try {
        const response = await RegisterService(email, name, password); // wait for API result
        console.log(response);

        if (response && response.status === 201) {
            // Success
            navigate("/Login");
        } else {
            // Failure
            setMessage(response?.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error(error);
        setMessage("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
}

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                </div>

                {/* Registration Form */}
                <form onSubmit={onSubmitRegister} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {message && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {message}
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                Registering...
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-2">Already have an account?</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;