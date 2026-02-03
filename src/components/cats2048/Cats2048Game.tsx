import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

import { getTileImage } from "./tileAssets";
import type { Grid, MoveDir } from "./gameLogic";
import {
  hasMoves,
  makeEmptyGrid,
  maxTile,
  move,
  spawnTile,
} from "./gameLogic";

const GRID_SIZE = 4;
const WIN_VALUE = 2048;

type GameState = {
  grid: Grid;
  score: number;
  bestScore: number;
  gameOver: boolean;
  keepPlaying: boolean;
};

function Cats2048Game() {
  const [state, setState] = useState<GameState>(function () {
    const best = readBestScore();
    const startGrid = spawnTile(spawnTile(makeEmptyGrid(GRID_SIZE)));

    return {
      grid: startGrid,
      score: 0,
      bestScore: best,
      gameOver: false,
      keepPlaying: false,
    };
  });

  const boardRef = useRef<HTMLDivElement | null>(null);
  const prevGridRef = useRef<Grid | null>(null);
  const confettiFiredRef = useRef<boolean>(false);

  const highestTile = useMemo(function () {
    return maxTile(state.grid);
  }, [state.grid]);

  const won = highestTile >= WIN_VALUE;

  /* ======================
     Keyboard input
     ====================== */
  useEffect(function handleKeys() {
    function onKeyDown(e: KeyboardEvent) {
      const dir = keyToDir(e.key);
      if (!dir) return;

      e.preventDefault();

      setState(function (current) {
        prevGridRef.current = current.grid;

        if (current.gameOver) return current;
        if (maxTile(current.grid) >= WIN_VALUE && !current.keepPlaying) {
          return current;
        }

        const res = move(current.grid, dir);
        if (!res.moved) return current;

        const movedGrid = spawnTile(res.grid);
        const nextScore = current.score + res.scoreGained;

        const nextBest = Math.max(current.bestScore, nextScore);
        writeBestScore(nextBest);

        const over = !hasMoves(movedGrid);

        return {
          ...current,
          grid: movedGrid,
          score: nextScore,
          bestScore: nextBest,
          gameOver: over,
        };
      });
    }

    window.addEventListener("keydown", onKeyDown);
    return function cleanup() {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* ======================
     GSAP tile animations
     ====================== */
  useEffect(
    function animateTiles() {
      if (!boardRef.current || !prevGridRef.current) return;

      const prev = prevGridRef.current;
      const next = state.grid;

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const before = prev[r][c];
          const after = next[r][c];

          if (before === after) continue;

          const el = boardRef.current.querySelector(
            `[data-tile="${r}-${c}"]`
          );

          if (!el) continue;

          // Spawn animation
          if (before === 0 && after !== 0) {
            gsap.fromTo(
              el,
              { scale: 0.6, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.25,
                ease: "back.out(2)",
              }
            );
          }

          // Merge pop
          if (after > before && before !== 0) {
            gsap.fromTo(
              el,
              { scale: 1 },
              {
                scale: 1.15,
                duration: 0.12,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
              }
            );
          }
        }
      }
    },
    [state.grid]
  );

  /* ======================
     Confetti on win
     ====================== */
  useEffect(
    function fireConfetti() {
      if (!won || state.keepPlaying) return;
      if (confettiFiredRef.current) return;

      confettiFiredRef.current = true;

      confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.65 },
      });

      setTimeout(function () {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.65 },
        });
      }, 250);
    },
    [won, state.keepPlaying]
  );

  function reset() {
    confettiFiredRef.current = false;

    const freshGrid = spawnTile(spawnTile(makeEmptyGrid(GRID_SIZE)));
    setState(function (s) {
      return {
        ...s,
        grid: freshGrid,
        score: 0,
        gameOver: false,
        keepPlaying: false,
      };
    });
  }

  function keepPlaying() {
    setState(function (s) {
      return { ...s, keepPlaying: true };
    });
  }

  return (
    <section className="w-full max-w-2xl">
      <Header
        score={state.score}
        best={state.bestScore}
        highest={highestTile}
        onReset={reset}
      />

      <div className="mt-6 rounded-3xl border border-black/5 bg-white/70 p-4 shadow-sm">
        <div className="relative">
          <Board ref={boardRef} grid={state.grid} />

          {won && !state.keepPlaying ? (
            <Overlay
              title="You made it to 2048 😻"
              subtitle="Want to keep going and see how chaotic it gets?"
              primaryLabel="Keep playing"
              onPrimary={keepPlaying}
              secondaryLabel="Reset"
              onSecondary={reset}
            />
          ) : null}

          {state.gameOver ? (
            <Overlay
              title="Game over 🙀"
              subtitle="No more moves. Hit reset to try again."
              primaryLabel="Reset"
              onPrimary={reset}
            />
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Controls: Arrow keys or WASD. Merge matching cat tiles to level up.
      </p>
    </section>
  );
}

/* ======================
   Components
   ====================== */

type HeaderProps = {
  score: number;
  best: number;
  highest: number;
  onReset: () => void;
};

function Header(props: HeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          Cat 2048
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Merge your cats to reach <span className="font-bold">{WIN_VALUE}</span>.
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Stat label="Score" value={props.score} />
        <Stat label="Best" value={props.best} />
        <Stat label="Top tile" value={props.highest} />

        <button
          type="button"
          onClick={props.onReset}
          className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105 active:scale-[0.98]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

type StatProps = {
  label: string;
  value: number;
};

function Stat(props: StatProps) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2 shadow-sm">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
        {props.label}
      </div>
      <div className="text-sm font-extrabold text-slate-900">{props.value}</div>
    </div>
  );
}

type OverlayProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

function Overlay(props: OverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm">
      <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
        <h2 className="text-2xl font-extrabold text-slate-900">{props.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{props.subtitle}</p>
        <div className="mt-4 flex gap-2 justify-center">
          <button
            type="button"
            onClick={props.onPrimary}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105 active:scale-[0.98]"
          >
            {props.primaryLabel}
          </button>
          {props.secondaryLabel && (
            <button
              type="button"
              onClick={props.onSecondary}
              className="rounded-xl border border-black/5 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:brightness-95 active:scale-[0.98]"
            >
              {props.secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type BoardProps = {
  grid: Grid;
};

const Board = React.forwardRef<HTMLDivElement, BoardProps>(function Board(
  props,
  ref
) {
  return (
    <div ref={ref} className="grid grid-cols-4 gap-3">
      {props.grid.flatMap(function (row, r) {
        return row.map(function (value, c) {
          return (
            <Tile
              key={`${r}-${c}`}
              id={`${r}-${c}`}
              value={value}
            />
          );
        });
      })}
    </div>
  );
});

type TileProps = {
  id: string;
  value: number;
};

function Tile(props: TileProps) {
  const isEmpty = props.value === 0;
  const img = getTileImage(props.value);
  const tierBg = getTierBackground(props.value);

  return (
    <div
      data-tile={props.id}
      className="aspect-square overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
    >
      {isEmpty ? (
        <div className="h-full w-full bg-gradient-to-br from-pink-100 to-purple-100" />
      ) : (
        <div className="relative h-full w-full">
          {img ? (
            <img
              src={img}
              alt={`Cat tile ${props.value}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center ${tierBg} text-2xl font-extrabold text-slate-900`}
            >
              {props.value}
            </div>
          )}

          <div className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-1 text-xs font-extrabold text-slate-900 shadow-sm">
            {props.value}
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================
   Utilities
   ====================== */

function keyToDir(key: string): MoveDir | null {
  if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
  if (key === "ArrowRight" || key === "d" || key === "D") return "right";
  if (key === "ArrowUp" || key === "w" || key === "W") return "up";
  if (key === "ArrowDown" || key === "s" || key === "S") return "down";
  return null;
}

function readBestScore(): number {
  try {
    const raw = localStorage.getItem("cats2048_best");
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function writeBestScore(value: number) {
  try {
    localStorage.setItem("cats2048_best", String(value));
  } catch {
    /* ignore */
  }
}

function getTierBackground(value: number): string {
  if (value <= 2) return "bg-pink-200";
  if (value <= 8) return "bg-purple-200";
  if (value <= 32) return "bg-fuchsia-200";
  if (value <= 128) return "bg-pink-300";
  if (value <= 512) return "bg-purple-300";
  return "bg-fuchsia-300";
}

export default Cats2048Game;
