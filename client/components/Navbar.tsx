"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <Link
          href="/"
          className="logo"
          onClick={closeMenu}
          aria-label="Hexagon Studio"
        >
          <Image
            src="/brand/logo-on-light.svg"
            alt="Hexagon Studio"
            width={160}
            height={80}
            className="logo-img logo-img--on-light"
            priority
          />
          <Image
            src="/brand/logo-on-dark.svg"
            alt=""
            width={160}
            height={80}
            className="logo-img logo-img--on-dark"
            aria-hidden
            priority
          />
        </Link>

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
            <Link href="/#o-mnie" className="nav-link" onClick={closeMenu}>
              O mnie
            </Link>
          </li>
          <li>
            <Link href="/#uslugi" className="nav-link" onClick={closeMenu}>
              Usługi
            </Link>
          </li>
          <li>
            <Link href="/#kontakt" className="nav-link" onClick={closeMenu}>
              Uruchom chatbota
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
