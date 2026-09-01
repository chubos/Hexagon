"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

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
          <li className="nav-theme">
            <ThemeToggle />
          </li>
        </ul>

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
      </div>
    </nav>
  );
}
