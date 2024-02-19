import React, { useState, useEffect } from 'react';
import "./displaywallet.css";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

function TruncatedText({ text, maxLength }: TruncatedTextProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const [max, setMax] = useState<number>(maxLength);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setIsClicked(false);
        setMax(0);
      }else{
        setMax(maxLength);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render


  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick} className="text-container" style={{ cursor: 'pointer' }}>
      {isClicked? (
        <div>{text}</div>
      ) : (
        <div>{text.slice(0, max)}{text.length > max ? '...' : ''}</div>
      )}
    </div>
  );
}

export default TruncatedText;
