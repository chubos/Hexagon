"use client";
import { FormEvent, useRef, useState, useEffect } from "react";
import "../styles/contact.css";

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

type ChatApiResponse = {
  replies: string[];
  reply: string;
  done: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const CHAT_TOPICS = [
  {
    label: "Usługi (strony, aplikacje, mobile, AI)",
    query: "Jakie usługi oferujesz?",
  },
  {
    label: "Cennik i widełki budżetowe",
    query: "Ile kosztuje strona internetowa?",
  },
  {
    label: "Proces współpracy",
    query: "Jak wygląda proces współpracy krok po kroku?",
  },
  {
    label: "Doświadczenie i portfolio",
    query: "Jakie masz doświadczenie i portfolio?",
  },
  {
    label: "Lokalizacja i spotkanie na żywo",
    query: "Gdzie działasz i czy możemy spotkać się na żywo?",
  },
  {
    label: "Faktury i rozliczenia",
    query: "Czy wystawiasz faktury?",
  },
  {
    label: "Wsparcie po wdrożeniu",
    query: "Czy po wdrożeniu pomagasz w utrzymaniu projektu?",
  },
  {
    label: "Brief Twojego projektu",
    query: "Chcę omówić mój projekt i dostać wycenę.",
  },
];

export default function Contact() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: "Cześć! Jestem cyfrowym asystentem. Pomogę Ci określić wymagania projektu — nad czym pracujemy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text || loading || done) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: text,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? "Błąd API");
      }
      const data = (await res.json()) as ChatApiResponse;
      setMessages((prev) => [
        ...prev,
        ...data.replies.map((content) => ({ role: "bot" as const, content })),
      ]);
      setDone(data.done);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Nie mogę teraz odpowiedzieć. Sprawdź, czy backend działa.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading || done) return;
    setInput("");
    await sendMessage(text);
  }

  function handleTopicClick(query: string) {
    if (loading || done) return;
    void sendMessage(query);
  }

  return (
    <section id="kontakt" className="contact">
      <div className="container contact-header">
        <h2 className="contact-title">Masz projekt w głowie? Zbudujmy go.</h2>
        <p className="contact-intro">
          Nie traćmy czasu na wymianę dziesiątek maili i niepotrzebne telefony.
          Poniżej znajduje się chatbot, którego sam zaprojektowałem i wdrożyłem.
          Pomoże Ci sprecyzować Twoje wymagania biznesowe w niespełna dwie
          minuty. Przeanalizuję zebrane przez niego informacje i wrócę do Ciebie
          z konkretną propozycją.
        </p>
      </div>

      <div className="contact-chat-wrapper">
        <div className="chat-widget">
        <div className="chat-body" ref={chatBodyRef} aria-label="Okno czatu">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble chat-bubble--${msg.role === "bot" ? "bot" : "user"}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble--bot">Piszę...</div>
            )}
          </div>

          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input-field"
              placeholder={done ? "Dziękuję — odezwę się na e-mail." : "Wiadomość..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || done}
            />
          </form>
        </div>

        <div className="contact-topics">
          <h3 className="contact-topics-title">O co możesz zapytać?</h3>
          <p className="contact-topics-intro">
            Nie wiesz od czego zacząć? Kliknij temat, a chatbot wyśle pytanie za
            Ciebie i odpowie na podstawie mojej bazy wiedzy.
          </p>
          <ul className="contact-topics-list" aria-label="Tematy rozmowy z chatbotem">
            {CHAT_TOPICS.map((topic) => (
              <li key={topic.label}>
                <button
                  type="button"
                  className="contact-topic"
                  onClick={() => handleTopicClick(topic.query)}
                  disabled={loading || done}
                >
                  {topic.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="contact-footer">
          Jeśli wolisz tradycyjne metody, znajdziesz mnie również na{" "}
          <a
            href="https://www.linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn
          </a>
          {" "}oraz{" "}<a
            href="https://github.com/chubos"
            target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          .
        </p>
      </div>
    </section>
  );
}
