/**
 * Chess board renderer and interaction handler.
 * Creates and manages a visual chess board in the DOM.
 */
class ChessBoard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.flipped = options.flipped || false;
    this.interactive = options.interactive !== false;
    this.onMove = options.onMove || null;
    this.onSelect = options.onSelect || null;

    this.state = Chess.parseFen(Chess.INIT_FEN);
    this.selected = null;
    this.legalTargets = [];
    this.lastMove = null;
    this.hintSquares = [];
    this.highlightSquares = [];

    this._render();
  }

  _render() {
    this.container.innerHTML = '';
    this.squares = [];

    for (let displayRow = 0; displayRow < 8; displayRow++) {
      for (let displayCol = 0; displayCol < 8; displayCol++) {
        const r = this.flipped ? displayRow : 7 - displayRow;
        const f = this.flipped ? 7 - displayCol : displayCol;
        const sqIdx = Chess.idx(f, r);

        const sq = document.createElement('div');
        sq.className = 'square ' + ((r + f) % 2 === 0 ? 'dark' : 'light');
        sq.dataset.idx = sqIdx;

        // Coordinates
        if (displayCol === 0) {
          const rank = document.createElement('span');
          rank.className = 'coord-rank';
          rank.textContent = Chess.RANKS[r];
          sq.appendChild(rank);
        }
        if (displayRow === 7) {
          const file = document.createElement('span');
          file.className = 'coord-file';
          file.textContent = Chess.FILES[f];
          sq.appendChild(file);
        }

        if (this.interactive) {
          sq.addEventListener('click', () => this._handleClick(sqIdx));
        }

        this.container.appendChild(sq);
        this.squares[sqIdx] = sq;
      }
    }

    this._updatePieces();
  }

  _updatePieces() {
    for (let i = 0; i < 64; i++) {
      const sq = this.squares[i];
      if (!sq) continue;

      // Remove old piece
      const oldPiece = sq.querySelector('.piece');
      if (oldPiece) oldPiece.remove();

      // Remove overlays
      sq.classList.remove('selected', 'last-move', 'hint-move', 'hint-capture', 'in-check', 'correct-flash', 'wrong-flash');

      const piece = this.state.board[i];
      if (piece) {
        const el = document.createElement('span');
        el.className = 'piece';
        el.textContent = Chess.PIECES[piece];
        sq.appendChild(el);
      }
    }

    // Highlight last move
    if (this.lastMove) {
      if (this.squares[this.lastMove.from]) this.squares[this.lastMove.from].classList.add('last-move');
      if (this.squares[this.lastMove.to]) this.squares[this.lastMove.to].classList.add('last-move');
    }

    // Highlight selected
    if (this.selected !== null && this.squares[this.selected]) {
      this.squares[this.selected].classList.add('selected');
    }

    // Highlight legal targets
    for (const t of this.legalTargets) {
      if (!this.squares[t]) continue;
      if (this.state.board[t]) {
        this.squares[t].classList.add('hint-capture');
      } else {
        this.squares[t].classList.add('hint-move');
      }
    }

    // Hint squares
    for (const h of this.hintSquares) {
      if (this.squares[h]) this.squares[h].classList.add('hint-move');
    }

    // Check highlight
    const status = Chess.gameStatus(this.state);
    if (status.type === 'check' || status.type === 'checkmate') {
      const king = this.state.board.findIndex(p => p === this.state.turn + 'K');
      if (king !== -1 && this.squares[king]) this.squares[king].classList.add('in-check');
    }
  }

  _handleClick(sqIdx) {
    if (!this.interactive) return;

    const piece = this.state.board[sqIdx];
    const pieceColor = Chess.color(piece);

    if (this.selected === null) {
      // Select a piece
      if (piece && pieceColor === this.state.turn) {
        this.selected = sqIdx;
        this.legalTargets = Chess.legalMoves(this.state, sqIdx);
        this._updatePieces();
        if (this.onSelect) this.onSelect(sqIdx);
      }
    } else {
      // Try to move
      if (this.legalTargets.includes(sqIdx)) {
        // Check if pawn promotion
        const movingPiece = this.state.board[this.selected];
        let promotion = null;
        if (Chess.type(movingPiece) === 'P') {
          const toRank = Chess.rank(sqIdx);
          if (toRank === 0 || toRank === 7) {
            promotion = 'Q'; // Auto-promote to queen
          }
        }

        const result = Chess.makeMove(this.state, this.selected, sqIdx, promotion);
        if (result) {
          const from = this.selected;
          this.state = result.state;
          this.lastMove = { from, to: sqIdx };
          this.selected = null;
          this.legalTargets = [];
          this.hintSquares = [];
          this._updatePieces();
          if (this.onMove) this.onMove(result);
        }
      } else if (piece && pieceColor === this.state.turn) {
        // Select different piece
        this.selected = sqIdx;
        this.legalTargets = Chess.legalMoves(this.state, sqIdx);
        this._updatePieces();
        if (this.onSelect) this.onSelect(sqIdx);
      } else {
        // Deselect
        this.selected = null;
        this.legalTargets = [];
        this._updatePieces();
      }
    }
  }

  setState(state) {
    this.state = state;
    this.selected = null;
    this.legalTargets = [];
    this.hintSquares = [];
    this._updatePieces();
  }

  setLastMove(from, to) {
    this.lastMove = from !== null ? { from, to } : null;
    this._updatePieces();
  }

  showHints(squares) {
    this.hintSquares = squares;
    this._updatePieces();
  }

  clearHints() {
    this.hintSquares = [];
    this._updatePieces();
  }

  flip() {
    this.flipped = !this.flipped;
    this._render();
  }

  flash(sqIdx, type) {
    const sq = this.squares[sqIdx];
    if (!sq) return;
    sq.classList.remove('correct-flash', 'wrong-flash');
    void sq.offsetWidth; // force reflow
    sq.classList.add(type === 'correct' ? 'correct-flash' : 'wrong-flash');
  }

  reset(fen) {
    this.state = Chess.parseFen(fen || Chess.INIT_FEN);
    this.selected = null;
    this.legalTargets = [];
    this.lastMove = null;
    this.hintSquares = [];
    this._updatePieces();
  }

  // Apply a move by SAN notation, returns result or null
  applyMoveSan(san) {
    const parsed = Chess.parseSan(this.state, san);
    if (!parsed) return null;
    const result = Chess.makeMove(this.state, parsed.from, parsed.to, parsed.promotion);
    if (result) {
      this.lastMove = { from: parsed.from, to: parsed.to };
      this.state = result.state;
      this.selected = null;
      this.legalTargets = [];
      this.hintSquares = [];
      this._updatePieces();
    }
    return result;
  }

  setInteractive(val) {
    this.interactive = val;
  }
}
