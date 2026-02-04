import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "../styles/shows";

// images
import antm from "../assets/ANTM.jpeg";
import ilovela from "../assets/ILuvLA.jpeg";
import vanderpump from "../assets/VPR.jpeg";
import chowder from "../assets/Chowder.jpeg";
import gumball from "../assets/AWG.jpeg";
import pokemon from "../assets/Vulpix.jpeg";
import bgc from "../assets/BGC.jpeg";
import charlie from "../assets/Charlie.jpeg";

type Show = {
  name: string;
  image: string;
  whereToWatch: string;
  whyIEnjoy: string;
};

function Shows() {
  const navigate = useNavigate();

  const shows: Show[] = [
    {
      name: "America's Next Top Model",
      image: antm,
      whereToWatch: "Hulu, Amazon Prime",
      whyIEnjoy:
        "I was raised on this show. Tyra Banks is problematic but iconic. From a young age I knew I was born to be Miss J. Alexander. RIP André Leon Talley.",
    },
    {
      name: "I Love LA",
      image: ilovela,
      whereToWatch: "HBO Max",
      whyIEnjoy:
        "Rachel Senott you are genius. Funny, dramatic, addicting, and Josh Hutcherson. Elijah Wood??",
    },
    {
      name: "Pokémon",
      image: pokemon,
      whereToWatch: "Netflix",
      whyIEnjoy:
        "I wanna be the very best, like no one ever was! To catch them is my real test, to train them is my cause! Vulpix is the best pokemon.",
    },
    {
      name: "Vanderpump Rules",
      image: vanderpump,
      whereToWatch: "Peacock",
      whyIEnjoy:
        "My spirit animal Stassi Schroeder. I am the devil, don’t you forget it.",
    },
    {
      name: "Chowder",
      image: chowder,
      whereToWatch: "Hulu",
      whyIEnjoy:
        "Not only is Chowder a funny, entertaining Cartoon Network Masterpiece, but the animation truly inspires me. Now go make me a Purple Nurple!",
    },
    {
      name: "The Amazing World of Gumball",
      image: gumball,
      whereToWatch: "Hulu",
      whyIEnjoy:
        "If I could be any cartoon character, it would be Darwin Watterson. Or the Dad.",
    },
    {
      name: "Bad Girls Club",
      image: bgc,
      whereToWatch: "Tubi",
      whyIEnjoy:
        "I didn't get no sleep 'cause of y'all! Ya'll not gonna get no sleep cause of me.",
    },
    {
      name: "Moist Critikal",
      image: charlie,
      whereToWatch: "YouTube",
      whyIEnjoy:
        "Not a show, but I can't eat or sleep without watching Charlie. Short King.",
    },
  ];

  const [selected, setSelected] = useState<Show | null>(null);

  function openModal(show: Show) {
    setSelected(show);
  }

  function closeModal() {
    setSelected(null);
  }

  // Close modal on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    if (selected) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate("/favorites")}
        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md"
      >
        ← Back to Favorites
      </button>

      <h1 className={styles.title}>Shows I Love</h1>

      <div className={styles.grid}>
        {shows.map((show) => (
          <div
            key={show.name}
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => openModal(show)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal(show);
            }}
          >
            <img src={show.image} alt={show.name} className={styles.image} />
            <span className={styles.label}>{show.name}</span>
          </div>
        ))}
      </div>

      {selected ? (
        <div
          className={styles.overlay}
          onClick={closeModal}
          role="presentation"
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} details`}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{selected.name}</div>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeModal}
              >
                Close
              </button>
            </div>

            <div className={styles.modalBody}>
              <img
                src={selected.image}
                alt={selected.name}
                className={styles.modalImage}
              />

              <div>
                <div className="text-sm font-bold text-slate-900">
                  Where to watch
                </div>
                <div className="mt-1 text-sm">
                  {selected.whereToWatch}
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900">
                  Why I enjoy it
                </div>
                <div className="mt-1 text-sm">
                  {selected.whyIEnjoy}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Shows;
