import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { LoginButton } from './login-button';

interface Props {
  isUserAuthorized: boolean;
  className?: string;
}

export const Auth: React.FC<Props> = ({ className, isUserAuthorized }) => {
  return (
    <div className={className}>
      {isUserAuthorized ? (
        <Link
          href="/account"
          className="block p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          aria-label="Open account"
        >
          <User className="w-6 h-6 text-gray-700" />
        </Link>
      ) : (
        <LoginButton
          className="block p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        />
      )}
    </div>
  );
};
