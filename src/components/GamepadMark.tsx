/** Brand mark: a gamepad. Keep in sync with src/app/icon.svg. */
export default function GamepadMark({ className, color = "var(--primary)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 6.5 32 22" className={className} aria-hidden>
      <path
        d="M9 9h14c3.9 0 6.6 3 7.2 7.1l.9 6.1c.4 2.7-1.6 5-4.3 5-1.6 0-3-.9-3.8-2.3L21.6 22H10.4l-1.4 2.9c-.8 1.4-2.2 2.3-3.8 2.3-2.7 0-4.7-2.3-4.3-5l.9-6.1C2.4 12 5.1 9 9 9z"
        fill={color}
      />
      <rect x={7.6} y={12.2} width={2.8} height={7.6} rx={0.8} fill="white" />
      <rect x={5.2} y={14.6} width={7.6} height={2.8} rx={0.8} fill="white" />
      <circle cx={22.4} cy={14.2} r={1.6} fill="white" />
      <circle cx={25.6} cy={17.4} r={1.6} fill="white" />
    </svg>
  );
}
