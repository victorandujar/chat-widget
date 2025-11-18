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
  const textColor = isDark ? "#fff" : "#000";

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

  // Use lower alpha values so backdrop-filter actually reveals the page behind
  // Container should be fairly transparent — just enough tint for reading
  const headerBg =
    color && color.startsWith("#") ? hexToRgba(color, 0.6) : color;
  const containerGlassBg = isDark
    ? "rgba(20,20,20,0.25)"
    : "rgba(255,255,255,0.25)";
  // Body needs to be more transparent than container so content shines through
  const bodyGlassBg = isDark ? "rgba(20,20,20,0.12)" : "rgba(255,255,255,0.12)";

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
        background: containerGlassBg,
        color: textColor,
        ...getPositionStyles(),
        width: "80%",
        height: "500px",
        borderRadius: "16px",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 10000,
        backdropFilter: "blur(18px) saturate(100%)",
        WebkitBackdropFilter: "blur(18px) saturate(100%)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
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
          backdropFilter: "blur(12px) saturate(100%)",
          WebkitBackdropFilter: "blur(12px) saturate(100%)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
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
          // softer blur for message container to keep text legible
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
                background:
                  msg.role === "user"
                    ? // user messages use the main color but keep them mostly opaque for readability
                      color && color.startsWith("#")
                      ? hexToRgba(color, 0.94)
                      : color
                    : isDark
                    ? "rgba(255,255,255,0.06)" // subtle light tint in dark theme
                    : "rgba(255,255,255,0.9)",
                color: msg.role === "user" ? "white" : textColor,
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                padding: "12px 16px",
                fontSize: "14px",
                lineHeight: "1.4",
                wordWrap: "break-word",
                backdropFilter: msg.role === "user" ? "none" : "blur(6px)",
                WebkitBackdropFilter:
                  msg.role === "user" ? "none" : "blur(6px)",
                border:
                  msg.role === "user"
                    ? "none"
                    : isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",
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
                background: isDark
                  ? "rgba(64,64,64,0.7)"
                  : "rgba(241,241,241,0.6)",
                color: textColor,
                borderRadius: "16px 16px 16px 4px",
                padding: "12px 16px",
                fontSize: "14px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
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
          borderTop: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: isDark ? "rgba(30,30,30,0.8)" : "rgba(248,248,250,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
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
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
            }`,
            borderRadius: "24px",
            fontSize: "14px",
            outline: "none",
            background: isDark
              ? "rgba(30,30,30,0.45)"
              : "rgba(255,255,255,0.7)",
            color: textColor,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.2s ease",
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
