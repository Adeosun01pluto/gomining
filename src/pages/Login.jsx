import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaApple, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft, FaWallet } from "react-icons/fa";
import { auth, db, googleProvider } from "../firebase"; // Adjust path if needed
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const AuthPage = () => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get redirect message if any
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error when user types
  };

// Email Login
const handleEmailLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields");
    setLoading(false);
    return;
  }

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password);
    const user = userCredential.user;

    // Update last login
    await setDoc(doc(db, "users", user.uid), { lastLogin: serverTimestamp() }, { merge: true });

    setFormData({ email: "", phone: "", password: "" });
    
    const redirectUrl = location.state?.redirectUrl || '/dashboard';
    navigate(redirectUrl, { replace: true });
  } catch (error) {
    handleAuthErrors(error);
  } finally {
    setLoading(false);
  }
};

// Google Login
const handleGoogleLogin = async () => {
  setLoading(true);
  setError("");

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        balance: { usd: 0, btc: 0 },
        walletAddress: "",
        deposit: 0,
        miningStatus: false,
      });
    } else {
      await setDoc(doc(db, "users", user.uid), { lastLogin: serverTimestamp() }, { merge: true });
    }

    const redirectUrl = location.state?.redirectUrl || '/dashboard';
    navigate(redirectUrl, { replace: true });
  } catch (error) {
    handleAuthErrors(error);
  } finally {
    setLoading(false);
  }
};

// Handle Errors
const handleAuthErrors = (error) => {
  switch (error.code) {
    case "auth/invalid-credential":
      setError("Invalid email or password. Please try again.");
      break;
    case "auth/invalid-email":
      setError("Please enter a valid email address");
      break;
    case "auth/user-not-found":
      setError("No account found. Please sign up first.");
      break;
    case "auth/wrong-password":
      setError("Incorrect password");
      break;
    case "auth/too-many-requests":
      setError("Too many failed attempts. Try again later.");
      break;
    default:
      setError(`Login failed: ${error.message}`);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (loginMethod === "email") {
    handleEmailLogin(e);
  } else {
    setError("Phone login is not implemented yet.");
  }
};

  return (
    <div className="min-h-screen bg-[#0F0F14] flex items-center justify-center relative px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Side Decoration */}
        <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>
        {/* Right Side Decoration */}
        <div className="absolute -right-64 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>
        {/* Blockchain Cubes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-500/20 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-500/20 rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back
        </Link>

        {/* Login Card */}
        <div className="bg-[#1A1A23] rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/50"></div>
              <span className="text-2xl font-bold text-white">GoMining</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
              {error.includes('Invalid email or password') && (
                <p className="text-gray-400 text-xs text-center mt-1">
                  Make sure you've registered first or try resetting your password
                </p>
              )}
            </div>
          )}

          {/* Login Method Tabs */}
          <div className="flex mb-6 bg-gray-800/50 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-[#2A2A35] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setLoginMethod('email')}
            >
              Email
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'phone'
                  ? 'bg-[#2A2A35] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setLoginMethod('phone')}
            >
              Phone number
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === 'email' ? (
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={loading}
                />
              </div>
            ) : (
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={loading}
                />
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-gray-500 bg-[#1A1A23]">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105">
              <FaApple className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105">
              <FaFacebook className="w-5 h-5" />
            </button>
          </div>

          {/* Wallet Connection */}
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-colors group">
            <FaWallet className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            Connect Wallet
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-500 hover:text-purple-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
