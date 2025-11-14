import { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";

interface Props {
  onClose: () => void;
  color: string;
  company: string;
  apiUrl?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
}

export default function ChatWindow({
  onClose,
  color,
  company,
  apiUrl,
  position = "bottom-right",
  theme = "light",
}: Props) {
  const { messages, sendMessage, loading, isTyping } = useChat(company, apiUrl);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "bottom-left":
        return { bottom: "90px", left: "20px", right: "auto", top: "auto" };
      case "top-right":
        return { top: "90px", right: "20px", bottom: "auto", left: "auto" };
      case "top-left":
        return { top: "90px", left: "20px", bottom: "auto", right: "auto" };
      default:
        return { bottom: "90px", right: "20px", top: "auto", left: "auto" };
    }
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#2d2d2d" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const messageBg = isDark ? "#404040" : "#f1f1f1";

  function hexToRgba(hex: string, alpha = 1) {
    if (!hex) return undefined;
    let h = hex.replace("#", "").trim();
    if (h.length === 3)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    if (h.length !== 6) return undefined;
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const headerBg =
    color && color.startsWith("#") ? hexToRgba(color, 0.95) : color;
  const bodyGlassBg = isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)";

  const formatMessageContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /🔗 \[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" style="color: ' +
          color +
          '; text-decoration: underline;">🔗 $1</a>'
      )
      .split("\n")
      .map((line, i) =>
        line.trim() ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ) : (
          <br key={i} />
        )
      );
  };

  return (
    <div
      className="ia-chat-widget-window"
      style={{
        position: "fixed",
        background: bgColor,
        color: textColor,
        ...getPositionStyles(),
        width: "80%",
        height: "500px",
        borderRadius: "16px",
        border: isDark ? "1px solid #404040" : "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 2147483647,
      }}
    >
      <div
        style={{
          background: headerBg,
          color: "white",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "16px 16px 0 0",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundClip: "padding-box",
        }}
      >
        <div>
          <strong style={{ fontSize: "16px" }}>🛍️ Asistente de Ofertas</strong>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>{company}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            opacity: 0.8,
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "0.8")}
          title="Cerrar chat"
        >
          ✕
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: bodyGlassBg,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}
          >
            <div
              style={{
                background: msg.role === "user" ? color : messageBg,
                color: msg.role === "user" ? "white" : textColor,
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                padding: "12px 16px",
                fontSize: "14px",
                lineHeight: "1.4",
                wordWrap: "break-word",
              }}
            >
              {typeof msg.content === "string"
                ? formatMessageContent(msg.content)
                : msg.content}
            </div>
            <div
              style={{
                fontSize: "11px",
                opacity: 0.6,
                textAlign: msg.role === "user" ? "right" : "left",
                marginTop: "4px",
                padding: "0 4px",
              }}
            >
              {msg.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
            <div
              style={{
                background: messageBg,
                color: textColor,
                borderRadius: "16px 16px 16px 4px",
                padding: "12px 16px",
                fontSize: "14px",
              }}
            >
              <span>⏳ Escribiendo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          padding: "16px",
          borderTop: `1px solid ${isDark ? "#404040" : "#e0e0e0"}`,
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pregúntame por ofertas, productos o servicios..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px 16px",
            border: `1px solid ${isDark ? "#404040" : "#ddd"}`,
            borderRadius: "24px",
            fontSize: "14px",
            outline: "none",
            background: isDark ? "#404040" : "#fff",
            color: textColor,
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading ? color : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
          title="Enviar mensaje"
        >
          {loading ? "⏳" : "➤"}
        </button>
      </div>
    </div>
  );
}
