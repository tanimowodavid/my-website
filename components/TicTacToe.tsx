"use client";

import { useCallback, useState } from "react";
import {
  type Cell,
  computeWinner,
  getBestMoveForO,
  isHumanTurn,
} from "@/lib/tic-tac-toe";

const cellBase =
  "flex aspect-square items-center justify-center rounded-xl border text-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

const cellHuman =
  `${cellBase} border-teal-400/50 bg-white/80 text-teal-900 shadow-sm backdrop-blur-sm hover:bg-white dark:border-teal-500/30 dark:bg-white/10 dark:text-teal-100 dark:hover:bg-white/15`;

const cellEmpty =
  `${cellBase} border-stone-300/90 bg-white/50 backdrop-blur-sm hover:border-teal-400/60 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:hover:border-teal-400/40 dark:hover:bg-white/10`;

const cellAi =
  `${cellBase} border-amber-300/60 bg-amber-50/90 text-amber-950 backdrop-blur-sm dark:border-amber-500/25 dark:bg-amber-950/30 dark:text-amber-100`;

function cellClass(cell: Cell, clickable: boolean): string {
  if (cell === "X") return cellHuman;
  if (cell === "O") return cellAi;
  return clickable ? cellEmpty : `${cellEmpty} opacity-60`;
}

export function TicTacToe() {
  const [squares, setSquares] = useState<Cell[]>(Array(9).fill(null));

  const winner = computeWinner(squares);
  const humanCanMove = isHumanTurn(squares);

  const status = (() => {
    if (winner === "draw") return "Draw — perfect play from both sides.";
    if (winner === "X") return "You win — the AI slipped (this should be rare).";
    if (winner === "O") return "The AI wins this round.";
    return "Your turn — you are X, the AI is O.";
  })();

  const play = useCallback((i: number) => {
    setSquares((prev) => {
      if (!isHumanTurn(prev) || prev[i] || computeWinner(prev)) return prev;
      const next = prev.slice() as Cell[];
      next[i] = "X";
      const w = computeWinner(next);
      if (w || next.every(Boolean)) return next;
      const ai = getBestMoveForO(next);
      if (ai >= 0) next[ai] = "O";
      return next;
    });
  }, []);

  function reset() {
    setSquares(Array(9).fill(null));
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <p className="text-center text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {status}
        </p>
        <p className="mt-2 text-center text-xs text-stone-500 dark:text-stone-500">
          The AI uses minimax with optimal play — you can&apos;t force a win;
          a draw is the best outcome.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {squares.map((cell, i) => {
            const clickable = humanCanMove && !cell && !winner;
            return (
              <button
                key={i}
                type="button"
                disabled={!clickable}
                onClick={() => play(i)}
                className={cellClass(cell, !!clickable)}
              >
                {cell}
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-xl border border-stone-300/90 bg-white/60 py-2.5 text-sm font-medium text-stone-800 shadow-sm backdrop-blur-md transition hover:bg-white/90 dark:border-white/15 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
      >
        New game
      </button>
    </div>
  );
}
