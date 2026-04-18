import React from 'react';
import { User } from 'lucide-react';

interface Props {
  className?: string;
  returnTo?: string;
  label?: string;
  showIcon?: boolean;
}

export const LoginButton: React.FC<Props> = ({
  className = '',
  returnTo,
  label,
  showIcon = true,
}) => {
  const href = returnTo
    ? `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`
    : '/api/auth/login';

  return (
    <a
      href={href}
      aria-label={label ?? 'Sign in'}
      className={className}
    >
      {showIcon && <User className="w-6 h-6 text-gray-700" />}
      {label}
    </a>
  );
};
