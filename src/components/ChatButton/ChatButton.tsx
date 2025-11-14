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

  return (
    <button
      onClick={onClick}
      className="ia-chat-widget-button"
      style={
        {
          background: `${color}cc`,
          color: isDark ? "#000" : "#fff",
          ...getPositionStyles(),
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "2px solid transparent",
          backgroundImage: `
            linear-gradient(${color}cc, ${color}cc),
            linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(96, 93, 93, 0.8))
          `,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
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
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
          fill="currentColor"
        />
        <circle cx="8" cy="10" r="1.5" fill="currentColor" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        <circle cx="16" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </button>
  );
}
