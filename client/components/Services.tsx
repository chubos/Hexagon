import "../styles/services.css";
const services = [
  {
    id: "01",
    title: "Strony i aplikacje webowe",
    description:
      "Tworzenie stron internetowych i aplikacji webowych w Rzeszowie oraz zdalnie. Szybkie, bezpieczne i zoptymalizowane pod konwersję wizytówki oraz zaawansowane systemy na Next.js.",
  },
  {
    id: "02",
    title: "Aplikacje mobilne",
    description:
      "Aplikacje mobilne na iOS i Android w React Native — jeden kod, płynne działanie i skalowalność pod rozwój produktu.",
  },
  {
    id: "03",
    title: "Machine Learning",
    description:
      "Uczenie maszynowe i integracja AI z procesami biznesowymi: prognozowanie, klasyfikacja danych i automatyzacja decyzji.",
  },
  {
    id: "04",
    title: "Agenty AI i chatboty",
    description:
      "Autonomiczne agenty i chatboty oparte o LLM — analiza zapytań, kontekst rozmowy, narzędzia zewnętrzne i automatyzacja obsługi klienta.",
  },
];

export default function Services() {
  return (
    <section id="uslugi" className="services">
      <div className="container">
        <h2 className="services-title">Kompetencje</h2>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <span className="service-id">{service.id}</span>
              <h3 className="service-name">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
