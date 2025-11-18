import { useState } from "react";

interface Props {
  onClick: () => void;
  color: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
}

export default function ChatButton({
  onClick,
  color,
  position = "bottom-right",
  theme = "light",
}: Props) {
  const getPositionStyles = () => {
    switch (position) {
      case "bottom-left":
        return { bottom: "20px", left: "20px", right: "auto", top: "auto" };
      case "top-right":
        return { top: "20px", right: "20px", bottom: "auto", left: "auto" };
      case "top-left":
        return { top: "20px", left: "20px", bottom: "auto", right: "auto" };
      default:
        return { bottom: "20px", right: "20px", top: "auto", left: "auto" };
    }
  };

  const isDark = theme === "dark";

  function hexToRgba(hex: string, alpha = 0.5) {
    if (!hex) return undefined;
    let h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (h.length !== 6) return undefined;
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const alphaBg =
    color && color.startsWith("#") ? hexToRgba(color, 0.5) : undefined;

  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const hoverAlphaBg =
    color && color.startsWith("#") ? hexToRgba(color, 0.75) : undefined;

  return (
    <button
      onClick={onClick}
      className="ia-chat-widget-button"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={
        {
          background:
            (isHover || isFocus) && hoverAlphaBg
              ? hoverAlphaBg
              : alphaBg || (isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)"),
          color: isDark ? "#fff" : "#000",
          ...getPositionStyles(),
          backdropFilter: isHover
            ? "blur(12px) saturate(120%)"
            : "blur(10px) saturate(110%)",
          WebkitBackdropFilter: isHover
            ? "blur(12px) saturate(120%)"
            : "blur(10px) saturate(110%)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(0,0,0,0.12)",
          backgroundImage: `${
            alphaBg ? `linear-gradient(${alphaBg}, ${alphaBg}),` : ""
          } linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.02))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: isHover
            ? isDark
              ? "0 6px 24px rgba(0,0,0,0.6)"
              : "0 6px 18px rgba(0,0,0,0.18)"
            : isDark
            ? "0 4px 18px rgba(0,0,0,0.45)"
            : "0 4px 12px rgba(0,0,0,0.12)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition:
            "transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease, backdrop-filter 0.15s ease",
          transform: isHover ? "translateY(-2px) scale(1.03)" : undefined,
          outline: isFocus
            ? isDark
              ? "2px solid rgba(255,255,255,0.16)"
              : "2px solid rgba(0,0,0,0.12)"
            : undefined,
        } as React.CSSProperties
      }
      title="Open offers chat bot"
      aria-label="Open chat bot"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
        }}
        aria-hidden="true"
        focusable="false"
      >
        {/* Modern outlined rounded chat bubble with tail — matching reference design */}
        <path
          d="M5 4.5h11.5c1.38 0 2.5 1.12 2.5 2.5v6.5c0 1.38-1.12 2.5-2.5 2.5H9l-3 2.5v-2.5H5c-1.38 0-2.5-1.12-2.5-2.5V7c0-1.38 1.12-2.5 2.5-2.5z"
          fill="none"
        />
      </svg>
    </button>
  );
}
