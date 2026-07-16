import "../styles/services.css";
const services = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Strony i Aplikacje Webowe. Szybkie, bezpieczne i zoptymalizowane pod kątem konwersji strony wizytówkowe oraz zaawansowane aplikacje webowe oparte na architekturze Next.js.",
  },
  {
    id: "02",
    title: "Mobile Apps",
    description:
      "Aplikacje Mobilne. Płynnie działające i skalowalne rozwiązania na systemy iOS oraz Android, stworzone w oparciu o jeden kod w React Native.",
  },
  {
    id: "03",
    title: "Machine Learning",
    description:
      "Uczenie Maszynowe. Integracja sztucznej inteligencji z procesami biznesowymi. Prognozowanie trendów, klasyfikacja danych i wyciąganie wniosków tam, gdzie człowiek widzi tylko chaos.",
  },
  {
    id: "04",
    title: "AI Agents & Bots",
    description:
      "Autonomiczne Agenty i Chatboty. Projektowanie inteligentnych asystentów nowej generacji. Buduję systemy oparte o LLM, które potrafią same analizować zapytania, rozumieć kontekst oraz korzystać z zewnętrznych narzędzi i automatyzować obsługę klienta.",
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
