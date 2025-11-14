import { useState } from "react";
import ChatButton from "./components/ChatButton/ChatButton";
import ChatWindow from "./components/ChatWindow/ChatWindow";

interface Props {
  company: string;
  color: string;
  apiUrl?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
}

export default function App({
  company,
  color,
  apiUrl,
  position = "bottom-right",
  theme = "light",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatButton
        onClick={() => setOpen(!open)}
        color={color}
        position={position}
        theme={theme}
      />
      {open && (
        <ChatWindow
          onClose={() => setOpen(false)}
          color={color}
          company={company}
          apiUrl={apiUrl}
          position={position}
          theme={theme}
        />
      )}
    </>
  );
}
