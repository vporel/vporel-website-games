const RED = "#e5484d";
const GREEN = "#2f9e66";
const YELLOW = "#f2b200";
const BLUE = "#3e63dd";
const PAPER = "#fffdf8";
const LINE = "#e2d6c0";

/** Stylised Ludo board (light palette in every theme, like the game itself). */
export default function LudoIllustration({ className }: { className?: string }) {
  const corners: [number, number, string][] = [
    [0, 0, RED],
    [9, 0, GREEN],
    [9, 9, YELLOW],
    [0, 9, BLUE],
  ];
  const cells: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    for (const x of [6, 7, 8]) cells.push([x, i], [x, 14 - i]);
    for (const y of [6, 7, 8]) cells.push([i, y], [14 - i, y]);
  }
  const home: [number, number, string][] = [1, 2, 3, 4, 5].flatMap((i) => [
    [i, 7, RED] as [number, number, string],
    [7, i, GREEN] as [number, number, string],
    [14 - i, 7, YELLOW] as [number, number, string],
    [7, 14 - i, BLUE] as [number, number, string],
  ]);
  const pawns: [number, number, string][] = [
    [3.5, 6.5, RED],
    [7.5, 2.5, GREEN],
    [12.5, 8.5, YELLOW],
    [6.5, 11.5, BLUE],
    [1.5, 6.5, RED],
  ];

  return (
    <svg viewBox="-0.3 -0.3 15.6 15.6" className={className} aria-hidden>
      <rect x={-0.3} y={-0.3} width={15.6} height={15.6} rx={0.7} fill="#3a2e22" />
      <rect x={0} y={0} width={15} height={15} rx={0.4} fill={PAPER} />
      {cells.map(([x, y]) => (
        <rect key={`c${x}-${y}`} x={x + 0.06} y={y + 0.06} width={0.88} height={0.88} rx={0.14} fill={PAPER} stroke={LINE} strokeWidth={0.05} />
      ))}
      {home.map(([x, y, c]) => (
        <rect key={`h${x}-${y}`} x={x + 0.06} y={y + 0.06} width={0.88} height={0.88} rx={0.14} fill={c} />
      ))}
      <rect x={1.06} y={6.06} width={0.88} height={0.88} rx={0.14} fill={RED} />
      <rect x={8.06} y={1.06} width={0.88} height={0.88} rx={0.14} fill={GREEN} />
      <rect x={13.06} y={8.06} width={0.88} height={0.88} rx={0.14} fill={YELLOW} />
      <rect x={6.06} y={13.06} width={0.88} height={0.88} rx={0.14} fill={BLUE} />
      {corners.map(([x, y, c]) => (
        <g key={`b${x}-${y}`}>
          <rect x={x + 0.08} y={y + 0.08} width={5.84} height={5.84} rx={0.5} fill={c} />
          <rect x={x + 0.9} y={y + 0.9} width={4.2} height={4.2} rx={0.45} fill={PAPER} />
          {[
            [2, 2],
            [4, 2],
            [2, 4],
            [4, 4],
          ].map(([dx, dy]) => (
            <circle key={`${dx}${dy}`} cx={x + dx} cy={y + dy} r={0.55} fill={c} opacity={0.9} />
          ))}
        </g>
      ))}
      <polygon points="6,6 6,9 7.5,7.5" fill={RED} />
      <polygon points="6,6 9,6 7.5,7.5" fill={GREEN} />
      <polygon points="9,6 9,9 7.5,7.5" fill={YELLOW} />
      <polygon points="6,9 9,9 7.5,7.5" fill={BLUE} />
      {pawns.map(([x, y, c], i) => (
        <g key={`p${i}`}>
          <ellipse cx={x} cy={y + 0.25} rx={0.3} ry={0.1} fill="black" opacity={0.2} />
          <circle cx={x} cy={y} r={0.34} fill={c} stroke="white" strokeWidth={0.08} />
          <circle cx={x - 0.1} cy={y - 0.12} r={0.08} fill="white" opacity={0.7} />
        </g>
      ))}
    </svg>
  );
}
