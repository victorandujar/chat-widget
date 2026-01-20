import { useState, useEffect } from "react";
import type { ChatMessage, ChatRequest, ChatResponse } from "../types";

export function useChat(company: string, companyId: string, apiUrl?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      role: "assistant",
      content: `¡Hola! Soy tu asistente para ${company}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [company]);

  async function sendMessage(text: string) {
    const userMessage: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setIsTyping(true);

    try {
      const endpoint = apiUrl || `${window.location.origin}/api/chat`;

      const requestBody: ChatRequest = {
        company,
        companyId,
        message: text,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        let assistantContent =
          data.reply || "No encontré información relevante.";

        if (data.offers && data.offers.length > 0) {
          assistantContent += "\n\n📋 **Ofertas encontradas:**\n";
          data.offers.forEach((offer, index) => {
            assistantContent += `\n${index + 1}. **${offer.title}**`;
            if (offer.price) assistantContent += ` - ${offer.price}`;
            assistantContent += `\n   ${offer.description}`;
            if (offer.url)
              assistantContent += `\n   🔗 [Ver más](${offer.url})`;
            assistantContent += "\n";
          });
        }

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: assistantContent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }, 1000);
    } catch (error) {
      setIsTyping(false);
      console.error("Error en chat:", error);

      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "❌ Lo siento, no pude conectar con el servidor. Por favor, intenta de nuevo más tarde.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    sendMessage,
    loading,
    isTyping,
    clearChat: () => setMessages([]),
  };
}
