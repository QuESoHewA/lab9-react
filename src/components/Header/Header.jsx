import { memo } from "react";
import { useTheme } from "@hooks/useTheme";
import styles from "./Header.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Activează tema luminoasă" : "Activează tema întunecată"}
      title={isDark ? "Temă luminoasă" : "Temă întunecată"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className={styles.toggleLabel}>{isDark ? "Luminos" : "Întunecat"}</span>
    </button>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">?</span>
          <div>
            <p className={styles.title}>Quiz de Cultură Generală</p>
            <p className={styles.subtitle}>Geografie · Istorie · Știință</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default memo(Header);
