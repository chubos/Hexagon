import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">
          Kod, który myśli. Aplikacje, które działają.
        </h1>

        <p className="hero-subtitle">
          Tworzę nowoczesne strony internetowe, aplikacje mobilne oraz
          autonomiczne agenty AI. Działam stacjonarnie w Rzeszowie oraz zdalnie
          na terenie całego kraju. Łączę zaawansowane programowanie z
          możliwościami sztucznej inteligencji, aby automatyzować Twój biznes.
        </p>

        <div className="hero-actions">
          <a href="#kontakt" className="btn btn-primary">
            Wypróbuj chatbota
          </a>
          <a href="#uslugi" className="btn btn-secondary">
            Czym się zajmuję?
          </a>
        </div>
      </div>
    </section>
  );
}
