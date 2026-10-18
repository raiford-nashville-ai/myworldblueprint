import { $ } from "./dom.js";
import { emerge } from "./motion.js";
export function initTheme() {
  function setTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    $("theme-toggle").textContent = dark ? "☼  Light mode" : "☾  Dark mode";
    $("theme-toggle").setAttribute(
      "aria-label",
      `Switch to ${dark ? "light" : "dark"} mode`,
    );
  }
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("blueprint-mock-theme");
  } catch {}
  setTheme(savedTheme === "light" ? "light" : "dark");
  $("theme-toggle").onclick = () => {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    void emerge(() => {
      setTheme(theme);
      try {
        localStorage.setItem("blueprint-mock-theme", theme);
      } catch {}
    });
  };
}
