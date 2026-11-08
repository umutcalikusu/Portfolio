// The çalıkuşu (wren): round little body, short thin beak, tail cocked
// straight up. One flat silhouette in currentColor, drawn to read at 16px.
// Decorative by default; pass `title` when it has to carry meaning.
export default function Wren({ className = "", title }) {
  return (
    <svg
      viewBox="3.6 3.2 26.4 27"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M29 13.4 L24.9 12.1 C24.3 9.1 21.4 7.4 18.4 8.0 C16.0 8.5 14.3 10.2 13.2 12.2 L9.0 4.6 C8.6 3.9 7.7 3.7 7.1 4.1 L5.9 4.9 C5.3 5.3 5.1 6.1 5.4 6.7 L9.4 15.0 C8.2 17.0 8.0 19.6 9.0 21.8 C10.5 25.0 13.6 26.6 16.9 26.3 C21.6 25.9 25.2 22.0 25.2 17.3 C25.2 16.3 25.0 15.4 24.7 14.6 Z M20.9 10.4 a0.95 0.95 0 1 0 0.01 0 Z"
      />
      <path
        d="M15.2 26.2 L14.6 29.2 M18.4 26.0 L18.9 29.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
