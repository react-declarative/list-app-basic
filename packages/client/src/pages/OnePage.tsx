import React from 'react';

interface IOnePageProps {
  route: {
    path: string;
    params: string[];
  }
}

export const OnePage = ({
  route: {
    params: [
      id,
    ],
  }
}: IOnePageProps) => {
  return (
    <p>{id}</p>
  );
};

export default OnePage as React.FC;
