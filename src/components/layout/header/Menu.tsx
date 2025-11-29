import React from 'react';

interface Props {
  className?: string;
}

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      Menu
    </div>
  );
};
