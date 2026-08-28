import type { CSSProperties } from "react";

import "../styles/code-decor.css";

const MARKS = [
  // text, corner, size, rotate, x, y
  { text: "#", corner: "tl", size: "8rem", rotate: -10, x: "10%", y: "15%" },
  { text: "</>", corner: "tr", size: "7rem", rotate: 10, x: "10%", y: "15%" },
  { text: "{}", corner: "bl", size: "7rem", rotate: 10, x: "10%", y: "8%" },
  { text: "()", corner: "br", size: "7rem", rotate: -15, x: "10%", y: "8%" },
] as const;

export default function CodeDecor() {
  return (
    <div className="code-decor" aria-hidden="true">
      {MARKS.map(({ text, corner, size, rotate, x, y }) => (
        <span
          key={text}
          className={`code-decor-mark code-decor-mark--${corner}`}
          style={
            {
              "--s": size,
              "--r": `${rotate}deg`,
              "--x": x,
              "--y": y,
            } as CSSProperties
          }
        >
          {text}
        </span>
      ))}
    </div>
  );
}
