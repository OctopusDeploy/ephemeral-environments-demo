export function OctopusLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 64"
      role="img"
      aria-label="Octopus Deploy"
      className={className}
    >
      <g fill="#0d80d8">
        <path
          d="M32 4c-12.15 0-22 9.85-22 22 0 7.02 3.29 13.27 8.4 17.3-.3 1.86-1.2 4.4-3.9 7.1a1.5 1.5 0 0 0 1.4 2.5c5.1-1.02 8.85-3.2 11.3-5.1A21.9 21.9 0 0 0 32 48c12.15 0 22-9.85 22-22S44.15 4 32 4Z"
        />
        <path
          d="M12 44c-2 3-2 7 1 10M20 49c-1.5 3.5-1 7.5 2 10M44 44c2 3 2 7-1 10M36 49c1.5 3.5 1 7.5-2 10"
          fill="none"
          stroke="#0d80d8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="22" r="3.5" fill="#fff" />
        <circle cx="40" cy="22" r="3.5" fill="#fff" />
      </g>
      <text
        x="72"
        y="40"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#0d80d8"
      >
        Octopus Deploy
      </text>
    </svg>
  );
}
