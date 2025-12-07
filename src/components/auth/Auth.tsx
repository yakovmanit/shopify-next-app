"use client";

import React, { useState } from "react";
import { User, X } from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {sighUpSchema} from "@/lib";
import {TSignUpSchema} from "@/types";

interface Props {
  className?: string;
}

export const Auth: React.FC<Props> = ({ className }) => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleOpenAuthPopup = () => setIsAuthPopupOpen(true);
  const handleCloseAuthPopup = () => {
    setIsAuthPopupOpen(false);
    setTimeout(() => setAuthMode("login"), 300);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(sighUpSchema)
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log('data: ', data);

    reset();
  };

  return (
    <div className={className}>
      {/* Button in header */}
      <button
        onClick={handleOpenAuthPopup}
        className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        aria-label="Open auth"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Popup */}
      {isAuthPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCloseAuthPopup}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseAuthPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {authMode === "login" ? "Sign in to your account" : "Create an account"}
            </h2>

            {/* FORM LOGIC */}
            {authMode === "login" ? (
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
                    onClick={() => setAuthMode("register")}
                  >
                    Create
                  </button>
                </p>
              </form>
            ) : (
              /* Register form */
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm text-gray-700 mb-1">First Name</label>
                  <input
                    {
                      ...register("firstName")
                    }
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                  <input
                    {
                      ...register("lastName")
                    }
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm pt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm pt-1">{errors.password.message}</p>
                  )}
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
                    disabled={isSubmitting}
                    type="button"
                    className="text-black font-medium hover:underline"
                    onClick={() => setAuthMode("login")}
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
