// src/components/cats2048/Cats2048Game.tsx

import { useEffect, useMemo, useRef, useState } from "react";
import { getTileImage } from "./tileAssets";
import type { Grid, MoveDir } from "./gameLogic";
import { hasMoves, makeEmptyGrid, maxTile, move, spawnTile } from "./gameLogic";

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

  const lastMoveId = useRef<number>(0);

  const highestTile = useMemo(function () {
    return maxTile(state.grid);
  }, [state.grid]);

  const won = highestTile >= WIN_VALUE;

  useEffect(function handleKeys() {
    function onKeyDown(e: KeyboardEvent) {
      const dir = keyToDir(e.key);
      if (!dir) return;

      // prevent page scroll
      e.preventDefault();

      setState(function (current) {
      if (current.gameOver) return current;
      if (maxTile(current.grid) >= WIN_VALUE && !current.keepPlaying) return current;

      const res = move(current.grid, dir);
      if (!res.moved) return current;

        const movedGrid = spawnTile(res.grid);
        const nextScore = current.score + res.scoreGained;

        const nextBest = Math.max(current.bestScore, nextScore);
        writeBestScore(nextBest);

        const over = !hasMoves(movedGrid);

        lastMoveId.current += 1;

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

  function reset() {
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
          <Board grid={state.grid} />

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
          className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
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

type BoardProps = {
  grid: Grid;
};

function Board(props: BoardProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {props.grid.flatMap(function (row, r) {
        return row.map(function (value, c) {
          return <Tile key={`${r}-${c}`} value={value} />;
        });
      })}
    </div>
  );
}

type TileProps = {
  value: number;
};

function Tile(props: TileProps) {
  const isEmpty = props.value === 0;
  const img = getTileImage(props.value);

  // Slightly different backgrounds per tier (still pretty even if no image exists)
  const tierBg = getTierBackground(props.value);

  return (
    <div className="aspect-square overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      {isEmpty ? (
        <div className="h-full w-full bg-gradient-to-br from-pink-100 to-purple-100" />
      ) : (
        <div className="relative h-full w-full">
          {img ? (
            <img src={img} alt={`Cat tile ${props.value}`} className="h-full w-full object-cover" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${tierBg} text-2xl font-extrabold text-slate-900`}>
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
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/75 p-6 backdrop-blur">
      <div className="w-full max-w-sm rounded-3xl border border-black/10 bg-white p-6 shadow-lg">
        <div className="text-xl font-extrabold tracking-tight text-slate-900">
          {props.title}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.subtitle}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={props.onPrimary}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            {props.primaryLabel}
          </button>

          {props.secondaryLabel && props.onSecondary ? (
            <button
              type="button"
              onClick={props.onSecondary}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-black/5 active:scale-[0.98]"
            >
              {props.secondaryLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

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
    if (!raw) return 0;
    const n = Number(raw);
    if (!Number.isFinite(n)) return 0;
    return n;
  } catch {
    return 0;
  }
}

function writeBestScore(value: number) {
  try {
    localStorage.setItem("cats2048_best", String(value));
  } catch {
    // ignore
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
