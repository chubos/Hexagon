import Image from "next/image";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-page">
      <main className="home-main">
        <Image
          className="home-logo"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="home-intro">
          <h1>Hexagon</h1>
          <p>
            Projekt Next.js z TypeScript, ESLint i zwykłym CSS w osobnych
            plikach. Edytuj <code>app/page.tsx</code> i style w katalogu{" "}
            <code>styles/</code>.
          </p>
        </div>
        <div className="home-ctas">
          <a
            className="home-primary"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dokumentacja Next.js
          </a>
          <a
            className="home-secondary"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Samouczek
          </a>
        </div>
      </main>
    </div>
  );
}
