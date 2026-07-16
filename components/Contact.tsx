import "../styles/contact.css";

export default function Contact() {
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
          <div className="chat-body" aria-label="Okno czatu">
            <div className="chat-bubble chat-bubble--bot">
              Cześć! Jestem cyfrowym asystentem. Pomogę Ci określić wymagania
              projektu — nad czym pracujemy?
            </div>
            <div className="chat-bubble chat-bubble--user">
              Potrzebuję aplikacji webowej w Next.js.
            </div>
            <div className="chat-bubble chat-bubble--bot">
              Świetnie. Opowiedz mi więcej o tym, co ma robić.
            </div>
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input-field"
              placeholder="Wiadomość..."
              disabled
            />
          </div>
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
          .
        </p>
      </div>
    </section>
  );
}
