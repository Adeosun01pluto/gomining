import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaApple, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { auth, db, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeToTerms: true,
  });

  // Extract referral code from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referralCode: refCode }));
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        referralCode: formData.referralCode || null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        balance: { usd: 0, btc: 0 },
        miningStatus: false,
      });

      // Handle referral system
      if (formData.referralCode) {
        const referrerDoc = await getDoc(doc(db, "users", formData.referralCode));
        if (referrerDoc.exists()) {
          await updateDoc(doc(db, "users", formData.referralCode), {
            referredUsers: [...(referrerDoc.data().referredUsers || []), user.uid],
            balance: { ...referrerDoc.data().balance, usd: (referrerDoc.data().balance.usd || 0) + 5 }, // Reward $5
          });
        }
      }

      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save or update user in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: user.displayName || "",
          email: user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          balance: { usd: 0, btc: 0 },
          miningStatus: false,
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (error) {
      setError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] flex items-center justify-center px-4">
      <div className="w-full max-w-md py-6 ">
        <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Login
        </Link>
        <div className="bg-[#1A1A23] rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Referral Code (Optional)</label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                placeholder="Enter referral code"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>

             {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
                <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-purple-600 focus:ring-purple-500"
              />
              <label className="text-sm text-gray-400">
                I agree to the{" "}
                <Link to="/signup" className="text-purple-500 hover:text-purple-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/signup" className="text-purple-500 hover:text-purple-400">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-gray-400 text-sm">or continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={handleGoogleSignup} className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
              <FaGoogle className="text-white" />
            </button>
            <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
              <FaApple className="text-white" />
            </button>
            <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
              <FaFacebook className="text-white" />
            </button>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Already have an account? <Link to="/login" className="text-purple-500">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
