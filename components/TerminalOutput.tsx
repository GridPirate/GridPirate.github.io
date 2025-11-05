
import React, { useState, useEffect } from 'react';

interface TerminalOutputProps {
  textToType: string;
  typingSpeed?: number;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ textToType, typingSpeed = 12 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < textToType.length) {
        setDisplayText(textToType.substring(0, i + 1));
        i++;
        setTimeout(type, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    
    // Start typing after a short delay
    const timeoutId = setTimeout(type, 100);
    
    // Cleanup function to clear timeout if component unmounts mid-typing
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array is intentional, we rely on re-mounting via `key` prop in the parent

  return (
    <pre className="whitespace-pre-wrap break-words">
      {`${displayText}`}
      <span className={`inline-block w-2.5 h-6 bg-green-400 ml-1 align-bottom ${!isTyping ? 'animate-pulse' : ''}`}></span>
    </pre>
  );
};

export default TerminalOutput;
