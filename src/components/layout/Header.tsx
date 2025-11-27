import React from 'react';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className=':bg-gray-100'>
      header
    </header>
  );
};
