'use client';

import Link from "next/link";
import {logout} from "@/services";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

export const AccountHeader = () => {
  const handleLogout = async () => {
    const res = await logout();

    if (res.success) {
      toast.success('You have been logged out successfully!');

      redirect('/');
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-400">
            Next Shop
          </Link>
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};
