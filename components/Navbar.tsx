"use client";

import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <a href="#" className="logo" onClick={closeMenu}>
          Logo tu jest
        </a>

        <button
          type="button"
          className={`nav-toggle ${isOpen ? "nav-toggle--open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? "nav-links--open" : ""}`}>
          <li>
            <a href="#o-mnie" className="nav-link" onClick={closeMenu}>
              O mnie
            </a>
          </li>
          <li>
            <a href="#uslugi" className="nav-link" onClick={closeMenu}>
              Usługi
            </a>
          </li>
          <li>
            <a href="#kontakt" className="nav-link" onClick={closeMenu}>
              Uruchom chatbota
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
