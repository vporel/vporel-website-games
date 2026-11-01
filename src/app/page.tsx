import GameCard from "@/components/GameCard";
import GamepadMark from "@/components/GamepadMark";
import { GAMES } from "@/games/games";
import { AUTHOR_URL, SITE_NAME } from "@/site";

function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display font-bold tracking-tight">
      <GamepadMark className="w-10 h-auto" />
      <span className="text-2xl">
        vporel <span className="text-primary">games</span>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="w-full max-w-5xl mx-auto px-4 py-5">
        <Logo />
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-16">
        <section className="pt-6 sm:pt-12 pb-10 sm:pb-14 max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.02]">Des jeux à partager entre amis.</h1>
          <p className="text-muted text-lg mt-4">
            Rien à installer, pas d&apos;email : choisis un pseudo, crée une salle, envoie le code. La partie commence.
          </p>
        </section>

        <section aria-label="Jeux" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game, i) => (
            <GameCard key={game.slug} game={game} index={i} />
          ))}
          <div className="rounded-xl bg-field p-6 flex flex-col items-center justify-center text-center gap-2 min-h-56 rise-in" style={{ animationDelay: `${GAMES.length * 80}ms` }}>
            <span className="text-3xl" aria-hidden>
              🎲
            </span>
            <p className="font-display text-xl font-bold">D&apos;autres jeux arrivent</p>
            <p className="text-sm text-muted">Reviens bientôt.</p>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-5xl mx-auto px-4 py-6 text-sm text-muted flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <a href={AUTHOR_URL} className="font-semibold hover:text-text transition">
          vporel.com
        </a>
      </footer>
    </div>
  );
}
