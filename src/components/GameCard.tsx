import type { ComponentType } from "react";
import { Game, GameAccent, gamePath } from "@/games/games";
import LudoIllustration from "./LudoIllustration";

const ILLUSTRATIONS: Record<string, ComponentType<{ className?: string }>> = {
  ludo: LudoIllustration,
};

const ACCENT: Record<GameAccent, string> = {
  red: "var(--red)",
  green: "var(--green)",
  yellow: "var(--yellow)",
  blue: "var(--blue)",
};

export default function GameCard({ game, index }: { game: Game; index: number }) {
  const Illustration = ILLUSTRATIONS[game.slug];
  return (
    // Each game is a separate app: a full page load is expected, so no next/link.
    <a
      href={gamePath(game)}
      className="card group rise-in flex flex-col overflow-hidden transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary)]/40"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative bg-surface-2 p-6 sm:p-8 grid place-items-center overflow-hidden">
        <span
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
          style={{ background: ACCENT[game.accent] }}
          aria-hidden
        />
        {Illustration ? (
          <Illustration className="relative w-48 sm:w-56 h-auto drop-shadow-xl transition duration-300 group-hover:scale-[1.04] group-hover:-rotate-2" />
        ) : (
          <span className="font-display text-6xl font-bold">{game.name[0]}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl font-bold">{game.name}</h2>
          <span className="text-sm font-bold text-muted whitespace-nowrap">{game.players}</span>
        </div>
        <p className="text-muted leading-relaxed">{game.tagline}</p>
        <ul className="flex flex-wrap gap-2 mt-auto pt-2">
          {game.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <span
          className="mt-2 inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 font-display font-bold text-white transition group-hover:gap-3"
          style={{ background: ACCENT[game.accent] }}
        >
          Jouer
          <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}
