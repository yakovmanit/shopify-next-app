"use client";

import React, { useState } from "react";
import { User, X } from "lucide-react";
import {RegisterForm} from "./RegisterForm";
import {LoginForm} from "./LoginForm";
import Link from "next/link";

interface Props {
  isUserAuthorized: boolean;
  className?: string;
}

export const Auth: React.FC<Props> = ({ className, isUserAuthorized }) => {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleOpenAuthPopup = () => setIsAuthPopupOpen(true);
  const handleCloseAuthPopup = () => {
    setIsAuthPopupOpen(false);
    setTimeout(() => setAuthMode("login"), 300);
  };

  return (
    <div className={className}>
      {/* Button in header */}
      {
        isUserAuthorized ? (
          <Link
            href="/account"
            className="block p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            aria-label="Open auth"
          >
            <User className="w-6 h-6 text-gray-700" />
          </Link>

        ) : (
          <button
            onClick={handleOpenAuthPopup}
            className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            aria-label="Open auth"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>
        )
      }

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

            {/* FORM */}
            {authMode === "login" ? (
              <LoginForm
                closeAuthPopup={handleCloseAuthPopup}
                setAuthMode={setAuthMode}
              />
            ) : (
              <RegisterForm
                closeAuthPopup={handleCloseAuthPopup}
                setAuthMode={setAuthMode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
