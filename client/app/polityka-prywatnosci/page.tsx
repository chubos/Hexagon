import Link from "next/link";
import Footer from "@/components/Footer";
import "@/styles/polityka-prywatnosci/page.css";

export const metadata = {
  title: "Polityka prywatności — Hexagon",
  description: "Polityka prywatności serwisu Hexagon",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="privacy-page">
        <div className="container privacy-content">
          <Link href="/" className="privacy-back">
            ← Wróć na stronę główną
          </Link>

          <h1 className="privacy-title">Polityka prywatności</h1>
          <p className="privacy-updated">Ostatnia aktualizacja: 31 lipca 2026</p>

          <section className="privacy-section">
            <h2>1. Administrator danych</h2>
            <p>
              Administratorem Twoich danych osobowych jest Hexagon (dalej:
              „Administrator”). W sprawach związanych z ochroną danych możesz
              skontaktować się z Administratorem przez adres e-mail: <a href="mailto:info@hexagon.com">info@hexagon.com</a>
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Jakie dane zbieramy</h2>
            <p>
              Korzystając z chatbota na stronie, możemy przetwarzać następujące
              dane:
            </p>
            <ul>
              <li>treść wiadomości wysłanych w czacie,</li>
              <li>
                informacje podane dobrowolnie w rozmowie (np. typ projektu,
                budżet, opis potrzeb),
              </li>
              <li>adres e-mail, jeśli go podasz w celu kontaktu,</li>
              <li>
                identyfikator techniczny sesji czatu (generowany w
                przeglądarce, nie jest plikiem cookie).
              </li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              Strona nie używa plików cookie ani narzędzi analitycznych
              śledzących użytkowników.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. Cel i podstawa prawna przetwarzania</h2>
            <p>Dane przetwarzamy w celu:</p>
            <ul>
              <li>obsługi zapytania przez chatbota,</li>
              <li>przygotowania oferty lub odpowiedzi na Twoje zapytanie,</li>
              <li>kontaktu zwrotnego na podany adres e-mail.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              Podstawą prawną jest Twoja zgoda (art. 6 ust. 1 lit. a RODO),
              wyrażona przed rozpoczęciem rozmowy z chatbotem, oraz — w zakresie
              niezbędnym do udzielenia odpowiedzi — podjęcie działań na Twoje
              żądanie przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Odbiorcy danych</h2>
            <p>
              Dane mogą być przekazywane podmiotom wspierającym Administratora
              w świadczeniu usług, w tym:
            </p>
            <ul>
              <li>dostawcy hostingu i infrastruktury serwerowej,</li>
              <li>Supabase (baza danych — przechowywanie rozmów i leadów),</li>
              <li>
                OpenAI (przetwarzanie treści wiadomości w celu wygenerowania
                odpowiedzi chatbota),
              </li>
              <li>Redis (tymczasowe przechowywanie stanu rozmowy).</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              Podmioty te przetwarzają dane wyłącznie na polecenie Administratora
              i zgodnie z obowiązującymi umowami powierzenia przetwarzania danych.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Okres przechowywania danych</h2>
            <p>
              Dane z rozmowy i leady przechowujemy przez okres niezbędny do
              obsługi zapytania i ewentualnego kontaktu, chyba że dłuższe przechowywanie
              wynika z przepisów prawa lub ustalenia indywidualnego z Tobą.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Twoje prawa</h2>
            <p>Przysługuje Ci prawo do:</p>
            <ul>
              <li>dostępu do swoich danych,</li>
              <li>sprostowania danych,</li>
              <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
              <li>ograniczenia przetwarzania,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania,</li>
              <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia),</li>
              <li>
                wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
                (PUODO).
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Dobrowolność podania danych</h2>
            <p>
              Podanie danych w czacie jest dobrowolne, ale niezbędne do
              skorzystania z chatbota i otrzymania odpowiedzi. Bez wyrażenia
              zgody na przetwarzanie danych chatbot nie rozpocznie zbierania
              informacji.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Zmiany polityki</h2>
            <p>
              Administrator może aktualizować niniejszą politykę prywatności.
              Aktualna wersja jest zawsze dostępna pod tym adresem.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
