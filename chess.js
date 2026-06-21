/**
 * Lightweight chess engine: move generation, validation, FEN, PGN.
 */
const Chess = (() => {
  const FILES = 'abcdefgh';
  const RANKS = '12345678';

  const PIECES = {
    wK:'♔', wQ:'♕', wR:'♖', wB:'♗', wN:'♘', wP:'♙',
    bK:'♚', bQ:'♛', bR:'♜', bB:'♝', bN:'♞', bP:'♟'
  };

  function idx(file, rank) { return rank * 8 + file; }
  function file(i) { return i % 8; }
  function rank(i) { return Math.floor(i / 8); }
  function sq(f, r) { return FILES[f] + RANKS[r]; }
  function sqFromIdx(i) { return sq(file(i), rank(i)); }
  function idxFromSq(s) { return idx(FILES.indexOf(s[0]), RANKS.indexOf(s[1])); }

  const INIT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  function parseFen(fen) {
    const parts = fen.split(' ');
    const board = new Array(64).fill(null);
    let r = 7, f = 0;
    for (const ch of parts[0]) {
      if (ch === '/') { r--; f = 0; }
      else if ('12345678'.includes(ch)) { f += +ch; }
      else {
        const color = ch === ch.toUpperCase() ? 'w' : 'b';
        board[idx(f, r)] = color + ch.toUpperCase();
        f++;
      }
    }
    return {
      board,
      turn: parts[1] || 'w',
      castling: parts[2] || '-',
      ep: parts[3] === '-' ? null : parts[3],
      halfMove: +parts[4] || 0,
      fullMove: +parts[5] || 1
    };
  }

  function toFen(state) {
    let rows = [];
    for (let r = 7; r >= 0; r--) {
      let row = '', empty = 0;
      for (let f = 0; f < 8; f++) {
        const p = state.board[idx(f, r)];
        if (!p) { empty++; }
        else {
          if (empty) { row += empty; empty = 0; }
          const ch = p[1];
          row += p[0] === 'w' ? ch.toUpperCase() : ch.toLowerCase();
        }
      }
      if (empty) row += empty;
      rows.push(row);
    }
    return [
      rows.join('/'),
      state.turn,
      state.castling || '-',
      state.ep || '-',
      state.halfMove,
      state.fullMove
    ].join(' ');
  }

  function color(piece) { return piece ? piece[0] : null; }
  function type(piece) { return piece ? piece[1] : null; }
  function opponent(c) { return c === 'w' ? 'b' : 'w'; }

  function isValid(f, r) { return f >= 0 && f < 8 && r >= 0 && r < 8; }

  function pseudoMoves(state, from) {
    const piece = state.board[from];
    if (!piece) return [];
    const c = color(piece);
    const t = type(piece);
    const f = file(from), r = rank(from);
    const moves = [];

    function add(tf, tr) {
      if (!isValid(tf, tr)) return false;
      const to = idx(tf, tr);
      const target = state.board[to];
      if (target && color(target) === c) return false;
      moves.push(to);
      return !target;
    }

    function slide(dfs) {
      for (const [df, dr] of dfs) {
        let tf = f + df, tr = r + dr;
        while (isValid(tf, tr)) {
          const to = idx(tf, tr);
          const target = state.board[to];
          if (target) {
            if (color(target) !== c) moves.push(to);
            break;
          }
          moves.push(to);
          tf += df; tr += dr;
        }
      }
    }

    if (t === 'P') {
      const dir = c === 'w' ? 1 : -1;
      const startRank = c === 'w' ? 1 : 6;
      // forward
      if (isValid(f, r + dir) && !state.board[idx(f, r + dir)]) {
        moves.push(idx(f, r + dir));
        if (r === startRank && !state.board[idx(f, r + 2 * dir)]) {
          moves.push(idx(f, r + 2 * dir));
        }
      }
      // captures
      for (const df of [-1, 1]) {
        const tf = f + df, tr = r + dir;
        if (!isValid(tf, tr)) continue;
        const to = idx(tf, tr);
        const target = state.board[to];
        if (target && color(target) !== c) moves.push(to);
        // en passant
        if (state.ep && sq(tf, tr) === state.ep) moves.push(to);
      }
    } else if (t === 'N') {
      for (const [df, dr] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
        add(f + df, r + dr);
    } else if (t === 'B') {
      slide([[-1,-1],[-1,1],[1,-1],[1,1]]);
    } else if (t === 'R') {
      slide([[0,1],[0,-1],[1,0],[-1,0]]);
    } else if (t === 'Q') {
      slide([[-1,-1],[-1,1],[1,-1],[1,1],[0,1],[0,-1],[1,0],[-1,0]]);
    } else if (t === 'K') {
      for (const [df, dr] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])
        add(f + df, r + dr);
      // Castling
      if (c === 'w' && r === 0 && f === 4) {
        if (state.castling.includes('K') &&
            !state.board[5] && !state.board[6] &&
            state.board[7] === 'wR') moves.push(6);
        if (state.castling.includes('Q') &&
            !state.board[3] && !state.board[2] && !state.board[1] &&
            state.board[0] === 'wR') moves.push(2);
      }
      if (c === 'b' && r === 7 && f === 4) {
        if (state.castling.includes('k') &&
            !state.board[61] && !state.board[62] &&
            state.board[63] === 'bR') moves.push(62);
        if (state.castling.includes('q') &&
            !state.board[59] && !state.board[58] && !state.board[57] &&
            state.board[56] === 'bR') moves.push(58);
      }
    }
    return moves;
  }

  function isAttacked(state, square, byColor) {
    // Check if square is attacked by byColor
    for (let i = 0; i < 64; i++) {
      const p = state.board[i];
      if (!p || color(p) !== byColor) continue;
      const moves = pseudoMoves(state, i);
      if (moves.includes(square)) return true;
    }
    return false;
  }

  function findKing(state, c) {
    return state.board.findIndex(p => p === c + 'K');
  }

  function applyMoveRaw(state, from, to, promotion) {
    const s = { ...state, board: [...state.board] };
    const piece = s.board[from];
    const c = color(piece);
    const t = type(piece);
    const toRank = rank(to);
    const toFile = file(to);
    const fromFile = file(from);

    let capturedPiece = s.board[to];
    s.board[to] = piece;
    s.board[from] = null;

    // En passant capture
    if (t === 'P' && s.ep && sq(toFile, toRank) === s.ep) {
      const capRank = c === 'w' ? toRank - 1 : toRank + 1;
      const capIdx = idx(toFile, capRank);
      capturedPiece = s.board[capIdx];
      s.board[capIdx] = null;
    }

    // Pawn promotion
    if (t === 'P' && (toRank === 7 || toRank === 0)) {
      s.board[to] = c + (promotion || 'Q');
    }

    // Set new EP square
    s.ep = null;
    if (t === 'P' && Math.abs(toRank - rank(from)) === 2) {
      s.ep = sq(fromFile, (toRank + rank(from)) / 2);
    }

    // Castling move rook
    if (t === 'K') {
      const diff = toFile - fromFile;
      if (Math.abs(diff) === 2) {
        if (diff > 0) { // kingside
          s.board[idx(5, toRank)] = s.board[idx(7, toRank)];
          s.board[idx(7, toRank)] = null;
        } else { // queenside
          s.board[idx(3, toRank)] = s.board[idx(0, toRank)];
          s.board[idx(0, toRank)] = null;
        }
      }
    }

    // Update castling rights
    let cas = s.castling;
    if (t === 'K') cas = cas.replace(c === 'w' ? /[KQ]/g : /[kq]/g, '');
    if (from === 0  || to === 0)  cas = cas.replace('Q', '');
    if (from === 7  || to === 7)  cas = cas.replace('K', '');
    if (from === 56 || to === 56) cas = cas.replace('q', '');
    if (from === 63 || to === 63) cas = cas.replace('k', '');
    s.castling = cas || '-';

    s.turn = opponent(c);
    s.halfMove = (t === 'P' || capturedPiece) ? 0 : s.halfMove + 1;
    if (c === 'b') s.fullMove++;

    return { state: s, captured: capturedPiece };
  }

  function inCheck(state, c) {
    const king = findKing(state, c);
    return king !== -1 && isAttacked(state, king, opponent(c));
  }

  function legalMoves(state, from) {
    const piece = state.board[from];
    if (!piece || color(piece) !== state.turn) return [];
    const c = color(piece);
    const t = type(piece);
    const pseudo = pseudoMoves(state, from);
    const legal = [];

    for (const to of pseudo) {
      // Extra castling checks: can't castle through check
      if (t === 'K' && Math.abs(file(to) - file(from)) === 2) {
        const midFile = (file(from) + file(to)) / 2;
        const r = rank(from);
        if (isAttacked(state, from, opponent(c))) continue;
        if (isAttacked(state, idx(midFile, r), opponent(c))) continue;
      }
      const { state: ns } = applyMoveRaw(state, from, to);
      if (!inCheck(ns, c)) legal.push(to);
    }
    return legal;
  }

  function allLegalMoves(state) {
    const moves = [];
    for (let i = 0; i < 64; i++) {
      const p = state.board[i];
      if (!p || color(p) !== state.turn) continue;
      const targets = legalMoves(state, i);
      for (const t of targets) moves.push({ from: i, to: t });
    }
    return moves;
  }

  function isCheckmate(state) {
    return inCheck(state, state.turn) && allLegalMoves(state).length === 0;
  }

  function isStalemate(state) {
    return !inCheck(state, state.turn) && allLegalMoves(state).length === 0;
  }

  function isDraw50(state) { return state.halfMove >= 100; }

  function moveToSan(state, from, to, promotion) {
    const piece = state.board[from];
    const t = type(piece);
    const c = color(piece);
    const captured = state.board[to] || (t === 'P' && state.ep && sq(file(to), rank(to)) === state.ep ? 'ep' : null);
    const toSq = sqFromIdx(to);
    const fromSq = sqFromIdx(from);

    let san = '';

    if (t === 'K' && Math.abs(file(to) - file(from)) === 2) {
      san = file(to) > file(from) ? 'O-O' : 'O-O-O';
    } else {
      if (t !== 'P') {
        san += t;
        // Disambiguation
        const ambig = [];
        for (let i = 0; i < 64; i++) {
          if (i === from) continue;
          const p = state.board[i];
          if (!p || color(p) !== c || type(p) !== t) continue;
          if (legalMoves(state, i).includes(to)) ambig.push(i);
        }
        if (ambig.length > 0) {
          const sameFile = ambig.some(i => file(i) === file(from));
          const sameRank = ambig.some(i => rank(i) === rank(from));
          if (!sameFile) san += FILES[file(from)];
          else if (!sameRank) san += RANKS[rank(from)];
          else san += fromSq;
        }
      } else if (captured) {
        san += FILES[file(from)];
      }
      if (captured) san += 'x';
      san += toSq;
      if (t === 'P' && (rank(to) === 0 || rank(to) === 7)) {
        san += '=' + (promotion || 'Q');
      }
    }

    const { state: ns } = applyMoveRaw(state, from, to, promotion);
    if (isCheckmate(ns)) san += '#';
    else if (inCheck(ns, ns.turn)) san += '+';

    return san;
  }

  function makeMove(state, from, to, promotion) {
    const legal = legalMoves(state, from);
    if (!legal.includes(to)) return null;
    const san = moveToSan(state, from, to, promotion);
    const { state: ns, captured } = applyMoveRaw(state, from, to, promotion);
    return { state: ns, san, captured, from, to };
  }

  function parseSan(state, san) {
    // Parse a SAN string and return {from, to, promotion}
    const allMoves = allLegalMoves(state);
    for (const { from, to } of allMoves) {
      for (const promo of ['Q', 'R', 'B', 'N', null]) {
        const s = moveToSan(state, from, to, promo);
        if (s === san) return { from, to, promotion: promo };
      }
    }
    return null;
  }

  function gameStatus(state) {
    if (isCheckmate(state)) return { type: 'checkmate', winner: opponent(state.turn) };
    if (isStalemate(state)) return { type: 'stalemate' };
    if (isDraw50(state)) return { type: 'draw50' };
    if (inCheck(state, state.turn)) return { type: 'check' };
    return { type: 'ongoing' };
  }

  return {
    PIECES, FILES, RANKS,
    idx, file, rank, sq, sqFromIdx, idxFromSq,
    parseFen, toFen, color, type, opponent,
    legalMoves, allLegalMoves, makeMove, parseSan,
    inCheck, isCheckmate, isStalemate, gameStatus,
    INIT_FEN
  };
})();
