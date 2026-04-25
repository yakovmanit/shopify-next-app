import React from "react";
import {User} from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
  isAuthenticated?: boolean;
}

export const Auth: React.FC<Props> = ({ className, isAuthenticated }) => {
  return (
    <Link
      href={isAuthenticated ? "/account" : "/auth/login"}
      className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer hover:bg-gray-100 rounded-lg"
      aria-label="Open account"
    >
      <User className="w-6 h-6" />
    </Link>
  );
};
