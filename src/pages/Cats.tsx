import Cats2048Game from "../components/cats2048/Cats2048Game";

function CatsGame() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8">
      <section className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Cat 2048
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          A custom 2048-style game built in React + TypeScript.
          Instead of numbers, you merge my cats 🐈‍⬛🐈.
          Built to show game logic, state management, and UI polish.
        </p>
      </section>

      <Cats2048Game />
    </main>
  );
}

export default CatsGame;
