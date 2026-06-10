import { useState, useEffect, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  japaneseText?: string;
  speed?: number;
  delay?: number;
  triggerOnHover?: boolean;
  className?: string;
}

// Hiragana + Katakana scramble characters
const KANA_CHARS =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" +
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ" +
  "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

const KANA_ARRAY = [...KANA_CHARS];

export function DecryptedText({
  text,
  japaneseText,
  speed = 30,
  delay = 0,
  triggerOnHover = true,
  className = "",
}: DecryptedTextProps) {
  const targetText = japaneseText ?? text;
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);

  // Capture the element's natural width on mount so it never shrinks on hover
  useEffect(() => {
    if (spanRef.current) {
      setMinWidth(spanRef.current.offsetWidth);
    }
  }, [text]);

  useEffect(() => {
    let intervalId: number;
    let timeoutId: number;

    const startAnimation = () => {
      let iteration = 0;
      const targetChars = [...targetText];

      intervalId = window.setInterval(() => {
        setDisplayText(() => {
          return targetChars
            .map((char, index) => {
              // Keep spaces, underscores, and dashes intact
              if (char === " " || char === "_" || char === "-" || char === ".") {
                return char;
              }
              if (index < iteration) {
                return targetChars[index];
              }
              return KANA_ARRAY[Math.floor(Math.random() * KANA_ARRAY.length)];
            })
            .join("");
        });

        if (iteration >= targetChars.length) {
          clearInterval(intervalId);
          setDisplayText(targetText);
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
  }, [text, targetText, isHovering, triggerOnHover, speed, delay]);

  return (
    <span
      ref={spanRef}
      className={`inline-block ${className}`}
      style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}
      onMouseEnter={() => triggerOnHover && setIsHovering(true)}
      onMouseLeave={() => {
        if (triggerOnHover) {
          setIsHovering(false);
          setDisplayText(text);
        }
      }}
    >
      {displayText}
    </span>
  );
}

