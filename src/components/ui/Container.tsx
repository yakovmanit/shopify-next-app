import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={`${className} max-w-screen-xl mx-auto px-4 sm:px-6`}>
      {children}
    </div>
  );
};
