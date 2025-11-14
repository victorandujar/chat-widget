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
      <img src="/chat-icon.png" width={20} height={20} />
    </button>
  );
}
