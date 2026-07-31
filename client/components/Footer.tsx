import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="site-footer-brand">designed by hexagon</p>
        <ul className="site-footer-links">
          <li>
            <Link href="/polityka-prywatnosci" className="site-footer-link">
              Polityka prywatności
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
