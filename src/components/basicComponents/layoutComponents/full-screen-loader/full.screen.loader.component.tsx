import React, { useEffect, useState } from 'react';
import './fullScreenLoader.css';

interface FullScreenLoaderProps {
  value: any;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ value = undefined }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (value !== undefined) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [value]);

  if (!isLoading) return null;

  return (
    <div className="fullscreen-loader-overlay">
      <div className="fullscreen-loader">
        <div className="loader"></div>
        <p>Carregando...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
