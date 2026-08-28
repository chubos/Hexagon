"use client";
import Link from "next/link";
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
const CONSENT_STORAGE_KEY = "hexagon_privacy_consent_v1";

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
  const [consented, setConsented] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_STORAGE_KEY) === "true") {
      setConsented(true);
      setSessionId(crypto.randomUUID());
      setMessages([
        {
          role: "bot",
          content:
            "Cześć! Jestem cyfrowym asystentem. Pomogę Ci określić wymagania projektu — nad czym pracujemy?",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text || loading || done || !consented || !sessionId) return;
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
        const detail =
          typeof err.detail === "string"
            ? err.detail
            : "Błąd API";
        throw new Error(detail);
      }
      const data = (await res.json()) as ChatApiResponse;
      setMessages((prev) => [
        ...prev,
        ...data.replies.map((content) => ({ role: "bot" as const, content })),
      ]);
      setDone(data.done);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            error instanceof Error
              ? error.message
              : "Nie mogę teraz odpowiedzieć. Sprawdź, czy backend działa.",
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
    if (loading || done || !consented) return;
    void sendMessage(query);
  }

  function handleAcceptConsent() {
    if (!consentChecked) return;
    localStorage.setItem(CONSENT_STORAGE_KEY, "true");
    setConsented(true);
    setSessionId(crypto.randomUUID());
    setMessages([
      {
        role: "bot",
        content:
          "Cześć! Jestem cyfrowym asystentem. Pomogę Ci określić wymagania projektu — nad czym pracujemy?",
      },
    ]);
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
          {!consented && (
            <div className="chat-consent" role="dialog" aria-labelledby="chat-consent-title">
              <h3 id="chat-consent-title" className="chat-consent-title">
                Zanim zaczniemy
              </h3>
              <p className="chat-consent-text">
                Chatbot zbiera treść rozmowy oraz dane podane przez Ciebie (np.
                e-mail), aby przygotować odpowiedź. Szczegóły znajdziesz w{" "}
                <Link href="/polityka-prywatnosci" className="contact-link">
                  polityce prywatności
                </Link>
                .
              </p>
              <label className="chat-consent-label">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                />
                <span>
                  Akceptuję politykę prywatności i wyrażam zgodę na
                  przetwarzanie moich danych w celu obsługi zapytania przez
                  chatbota.
                </span>
              </label>
              <button
                type="button"
                className="chat-consent-button"
                onClick={handleAcceptConsent}
                disabled={!consentChecked}
              >
                Rozpocznij rozmowę
              </button>
            </div>
          )}

          <div
            className={`chat-body ${!consented ? "chat-body--locked" : ""}`}
            ref={chatBodyRef}
            aria-label="Okno czatu"
          >
            {consented &&
              messages.map((msg, index) => (
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
            <div className="chat-input-row">
              <input
                type="text"
                className="chat-input-field"
                placeholder={
                  !consented
                    ? "Zaakceptuj zgodę, aby napisać wiadomość..."
                    : done
                      ? "Dziękuję — odezwę się na e-mail."
                      : "Wiadomość..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!consented || loading || done}
              />
              <button
                type="submit"
                className="chat-send-button"
                aria-label="Wyślij wiadomość"
                disabled={!consented || loading || done || !input.trim()}
              >
                <svg
                  className="chat-send-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M3.4 20.6 21 12 3.4 3.4l1.8 7.2L16 12l-10.8 1.4-1.8 7.2Z" />
                </svg>
              </button>
            </div>
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
                  disabled={loading || done || !consented}
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
            href="https://www.linkedin.com/in/hubert-lech-642380376"
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
