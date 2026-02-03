import { useEffect, useState } from "react";

type MeowFactsResponse = {
  data: string[];
};

function CatFactCard() {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function loadFact() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://meowfacts.herokuapp.com/");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data: MeowFactsResponse = await res.json();
      setFact(data.data[0] ?? "No fact returned—try again!");
    } catch {
      setError("Couldn’t load a cat fact right now. Try again in a sec!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFact();
  }, []);

  return (
    <section className="mt-8 rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold tracking-tight">Random Cat Fact</h2>
        <button
          type="button"
          onClick={loadFact}
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? "Loading..." : "New fact"}
        </button>
      </div>

      <div className="mt-4 text-slate-800">
        {error ? (
          <p className="text-sm font-semibold text-red-600">{error}</p>
        ) : (
          <p className="leading-relaxed">{fact}</p>
        )}
      </div>
    </section>
  );
}

export default CatFactCard;
