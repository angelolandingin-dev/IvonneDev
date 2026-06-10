import { useState, useEffect } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  triggerOnHover?: boolean;
  className?: string;
}

export function DecryptedText({
  text,
  speed = 30,
  delay = 0,
  triggerOnHover = true,
  className = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const scrambleChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  useEffect(() => {
    let intervalId: number;
    let timeoutId: number;

    const startAnimation = () => {
      let iteration = 0;
      
      intervalId = window.setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              // Keep spaces, underscores, and dashes intact
              if (char === " " || char === "_" || char === "-" || char === ".") {
                return char;
              }
              if (index < iteration) {
                return text[index];
              }
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");
        });

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, speed);
    };

    // If triggerOnHover is enabled, only run when isHovering is true.
    // If it's disabled, run once on mount (with optional delay).
    if (!triggerOnHover || isHovering) {
      timeoutId = window.setTimeout(startAnimation, delay);
    } else {
      setDisplayText(text);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text, isHovering, triggerOnHover, speed, delay]);

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => triggerOnHover && setIsHovering(true)}
      onMouseLeave={() => triggerOnHover && setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}
