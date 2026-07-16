import "../styles/about.css";

export default function About() {
  return (
    <section id="o-mnie" className="about">
      <div className="container about-grid">
        <h2 className="about-label">O MNIE</h2>

        <div className="about-content">
          <p className="about-text">
            Jako niezależny inżynier IT nie tylko piszę kod – rozwiązuję realne
            problemy biznesowe. Moje doświadczenie obejmuje pełen cykl życia
            produktu: od czystego i błyskawicznego frontendu w Next.js, przez
            skalowalne aplikacje mobilne, aż po projektowanie inteligentnych
            systemów, które myślą i podejmują decyzje za Ciebie. Skupiam się na
            architekturze, która wytrzyma próbę czasu, oraz na rozwiązaniach AI,
            które przynoszą realny zwrot z inwestycji.
          </p>

          <p className="about-tech">
            Next.js / React Native / Node.js / Python / LLMs / LangChain /
            OpenAI API
          </p>
        </div>
      </div>
    </section>
  );
}
