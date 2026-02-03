// src/components/cats2048/gameLogic.ts

export type Grid = number[][];
export type MoveDir = "left" | "right" | "up" | "down";

export type MoveResult = {
  grid: Grid;
  moved: boolean;
  scoreGained: number;
  mergedValues: number[]; // values created by merges during the move (e.g. 8,16...)
};

export function makeEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, function () {
    return Array.from({ length: size }, function () {
      return 0;
    });
  });
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map(function (row) {
    return row.slice();
  });
}

export function gridsEqual(a: Grid, b: Grid): boolean {
  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < a.length; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

export function getEmptyCells(grid: Grid): Array<{ r: number; c: number }> {
  const cells: Array<{ r: number; c: number }> = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === 0) cells.push({ r, c });
    }
  }
  return cells;
}

export function spawnTile(grid: Grid): Grid {
  const next = cloneGrid(grid);
  const empties = getEmptyCells(next);
  if (empties.length === 0) return next;

  const pick = empties[Math.floor(Math.random() * empties.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  next[pick.r][pick.c] = value;

  return next;
}

export function hasMoves(grid: Grid): boolean {
  if (getEmptyCells(grid).length > 0) return true;

  const size = grid.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = grid[r][c];
      if (r + 1 < size && grid[r + 1][c] === v) return true;
      if (c + 1 < size && grid[r][c + 1] === v) return true;
    }
  }
  return false;
}

export function maxTile(grid: Grid): number {
  let m = 0;
  for (const row of grid) {
    for (const v of row) m = Math.max(m, v);
  }
  return m;
}

/**
 * Compress + merge one row moving left.
 * Returns the new row, and the score gained from merges, and merged values created.
 */
function slideAndMergeLeft(row: number[]): {
  row: number[];
  scoreGained: number;
  mergedValues: number[];
} {
  const size = row.length;

  const nonZero = row.filter(function (v) {
    return v !== 0;
  });

  const out: number[] = [];
  let scoreGained = 0;
  const mergedValues: number[] = [];

  for (let i = 0; i < nonZero.length; i++) {
    const current = nonZero[i];
    const next = nonZero[i + 1];

    if (next !== undefined && current === next) {
      const merged = current * 2;
      out.push(merged);
      scoreGained += merged;
      mergedValues.push(merged);
      i++; // skip next (merged)
    } else {
      out.push(current);
    }
  }

  while (out.length < size) out.push(0);

  return { row: out, scoreGained, mergedValues };
}

function reverseRow(row: number[]): number[] {
  const copy = row.slice();
  copy.reverse();
  return copy;
}

function transpose(grid: Grid): Grid {
  const size = grid.length;
  const out = makeEmptyGrid(size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      out[c][r] = grid[r][c];
    }
  }
  return out;
}

export function move(grid: Grid, dir: MoveDir): MoveResult {
  let next = cloneGrid(grid);
  let scoreGained = 0;
  const mergedValues: number[] = [];

  if (dir === "left") {
    next = next.map(function (row) {
      const res = slideAndMergeLeft(row);
      scoreGained += res.scoreGained;
      mergedValues.push(...res.mergedValues);
      return res.row;
    });
  }

  if (dir === "right") {
    next = next.map(function (row) {
      const reversed = reverseRow(row);
      const res = slideAndMergeLeft(reversed);
      scoreGained += res.scoreGained;
      mergedValues.push(...res.mergedValues);
      return reverseRow(res.row);
    });
  }

  if (dir === "up") {
    const t = transpose(next);
    const movedT = t.map(function (row) {
      const res = slideAndMergeLeft(row);
      scoreGained += res.scoreGained;
      mergedValues.push(...res.mergedValues);
      return res.row;
    });
    next = transpose(movedT);
  }

  if (dir === "down") {
    const t = transpose(next);
    const movedT = t.map(function (row) {
      const reversed = reverseRow(row);
      const res = slideAndMergeLeft(reversed);
      scoreGained += res.scoreGained;
      mergedValues.push(...res.mergedValues);
      return reverseRow(res.row);
    });
    next = transpose(movedT);
  }

  const moved = !gridsEqual(grid, next);

  return { grid: next, moved, scoreGained, mergedValues };
}
