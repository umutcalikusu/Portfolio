// Site footer, shared by the home page (inside Contact) and the 404 page.
export default function Footer({ className = "" }) {
  return (
    <footer className={`border-t hairline pt-8 text-center font-mono text-xs text-fg-2 ${className}`}>
      © {new Date().getFullYear()} Umut Çalıkuşu · Built with React +
      Tailwind CSS
    </footer>
  );
}
