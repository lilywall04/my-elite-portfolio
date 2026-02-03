import { Link } from "react-router-dom";

type FavoriteCard = {
  title: string;
  description: string;
  to: string;
  emoji: string;
};

const cards: FavoriteCard[] = [
  {
    title: "Music",
    description: "Artists, albums, concerts, and songs I always come back to.",
    to: "/favorites/music",
    emoji: "🎧",
  },
  {
    title: "Shows",
    description: "Comfort shows, new obsessions, and top-tier rewatch picks.",
    to: "/favorites/shows",
    emoji: "📺",
  },
  {
    title: "Memes",
    description: "The internet has jokes. I have a curated selection.",
    to: "/favorites/memes",
    emoji: "😂",
  },
  {
    title: "Places",
    description: "Favorite spots, cities, and places I’d recommend instantly.",
    to: "/favorites/places",
    emoji: "📍",
  },
  {
    title: "Products",
    description: "Tools, skincare, and things I use enough to recommend.",
    to: "/favorites/products",
    emoji: "🛍️",
  },
    {
    title: "Sports",
    description: "I used to play college volleyball. Here you can find my ball knowledge.",
    to: "/favorites/sports",
    emoji: "🏐",
  },
];

function Favorites() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Favorites
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          A collection of my favorite things — organized and easy to explore.
          Click a card to dive into the category.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(function (card) {
          return (
            <Link
              key={card.title}
              to={card.to}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -top-24 right-[-60px] h-56 w-56 rounded-full bg-gradient-to-br from-pink-400/35 via-purple-400/20 to-transparent blur-3xl" />
                <div className="absolute -bottom-24 left-[-60px] h-56 w-56 rounded-full bg-gradient-to-tr from-purple-400/30 via-pink-400/20 to-transparent blur-3xl" />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    <span className="text-sm">{card.emoji}</span>
                    Category
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {card.description}
                  </p>
                </div>

                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-black/5 bg-white text-slate-900 shadow-sm transition group-hover:scale-[1.02]">
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default Favorites;
