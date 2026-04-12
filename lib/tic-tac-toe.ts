export type Cell = "X" | "O" | null;

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function computeWinner(squares: Cell[]): Cell | "draw" | null {
  for (const [a, b, c] of LINES) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) return v;
  }
  if (squares.every(Boolean)) return "draw";
  return null;
}

/** Human = X (maximizer in search when simulating human reply — here AI is O). */
function minimax(board: Cell[], depth: number, isMaximizing: boolean): number {
  const w = computeWinner(board);
  if (w === "O") return 10 - depth;
  if (w === "X") return depth - 10;
  if (w === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      const next = board.slice() as Cell[];
      next[i] = "O";
      best = Math.max(best, minimax(next, depth + 1, false));
    }
    return best;
  }

  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    const next = board.slice() as Cell[];
    next[i] = "X";
    best = Math.min(best, minimax(next, depth + 1, true));
  }
  return best;
}

/** Best reply for O on this board (one X has just been played; it is O's turn). */
export function getBestMoveForO(board: Cell[]): number {
  let bestScore = -Infinity;
  let bestIdx = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    const next = board.slice() as Cell[];
    next[i] = "O";
    const score = minimax(next, 0, false);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function countSymbol(board: Cell[], s: Cell): number {
  return board.filter((c) => c === s).length;
}

/** True when it is the human's (X) turn: equal X and O counts, no terminal state. */
export function isHumanTurn(board: Cell[]): boolean {
  if (computeWinner(board)) return false;
  return countSymbol(board, "X") === countSymbol(board, "O");
}
