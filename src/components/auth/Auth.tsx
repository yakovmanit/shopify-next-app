"use client";

import React, { useState } from "react";
import { User, X } from "lucide-react";

interface Props {
  className?: string;
}

export const Auth: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setTimeout(() => setMode("login"), 300); // reset after close
  };

  return (
    <div className={className}>
      {/* Button in header */}
      <button
        onClick={open}
        className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        aria-label="Open auth"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {mode === "login" ? "Sign in to your account" : "Create an account"}
            </h2>

            {/* FORM LOGIC */}
            {mode === "login" ? (
              /* Login form */
              <form className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="text-black font-medium hover:underline"
                    onClick={() => setMode("register")}
                  >
                    Create
                  </button>
                </p>
              </form>
            ) : (
              /* Register form */
              <form className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="Create a password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Create Account
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-black font-medium hover:underline"
                    onClick={() => setMode("login")}
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
