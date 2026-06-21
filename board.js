/**
 * Chess board renderer — uses SVG pieces, supports eval bar, promotion modal.
 */
class ChessBoard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.flipped = options.flipped || false;
    this.interactive = options.interactive !== false;
    this.onMove = options.onMove || null;
    this.onPromotion = options.onPromotion || null; // called with {from,to,color}

    this.state = Chess.parseFen(Chess.INIT_FEN);
    this.selected = null;
    this.legalTargets = [];
    this.lastMove = null;
    this.hintSquares = [];
    this.pendingPromo = null;

    this._render();
  }

  _render() {
    this.container.innerHTML = '';
    this.squares = [];

    for (let dr = 0; dr < 8; dr++) {
      for (let dc = 0; dc < 8; dc++) {
        const r = this.flipped ? dr : 7 - dr;
        const f = this.flipped ? 7 - dc : dc;
        const sqIdx = Chess.idx(f, r);

        const el = document.createElement('div');
        el.className = 'square ' + ((r + f) % 2 === 0 ? 'dark' : 'light');
        el.dataset.idx = sqIdx;

        if (dc === 0) {
          const rk = document.createElement('span');
          rk.className = 'coord coord-rank';
          rk.textContent = Chess.RANKS[r];
          el.appendChild(rk);
        }
        if (dr === 7) {
          const fl = document.createElement('span');
          fl.className = 'coord coord-file';
          fl.textContent = Chess.FILES[f];
          el.appendChild(fl);
        }

        if (this.interactive) {
          el.addEventListener('click', () => this._handleClick(sqIdx));
        }
        this.container.appendChild(el);
        this.squares[sqIdx] = el;
      }
    }
    this._refresh();
  }

  _refresh() {
    for (let i = 0; i < 64; i++) {
      const el = this.squares[i];
      if (!el) continue;

      const img = el.querySelector('img.piece');
      if (img) img.remove();

      el.classList.remove('selected','last-move','hint-dot','hint-cap','in-check','flash-ok','flash-bad');

      const piece = this.state.board[i];
      if (piece) {
        const img = document.createElement('img');
        img.className = 'piece';
        img.src = pieceToDataURL(piece);
        img.draggable = false;
        el.appendChild(img);
      }
    }

    if (this.lastMove) {
      this.squares[this.lastMove.from]?.classList.add('last-move');
      this.squares[this.lastMove.to]?.classList.add('last-move');
    }
    if (this.selected !== null) this.squares[this.selected]?.classList.add('selected');

    for (const t of this.legalTargets) {
      if (!this.squares[t]) continue;
      this.squares[t].classList.add(this.state.board[t] ? 'hint-cap' : 'hint-dot');
    }
    for (const h of this.hintSquares) this.squares[h]?.classList.add('hint-dot');

    const status = Chess.gameStatus(this.state);
    if (status.type === 'check' || status.type === 'checkmate') {
      const king = this.state.board.findIndex(p => p === this.state.turn + 'K');
      if (king !== -1) this.squares[king]?.classList.add('in-check');
    }
  }

  _handleClick(sqIdx) {
    if (!this.interactive) return;
    const piece = this.state.board[sqIdx];
    const pc = Chess.color(piece);

    if (this.selected === null) {
      if (piece && pc === this.state.turn) {
        this.selected = sqIdx;
        this.legalTargets = Chess.legalMoves(this.state, sqIdx);
        this._refresh();
      }
    } else {
      if (this.legalTargets.includes(sqIdx)) {
        const moving = this.state.board[this.selected];
        const isPromo = Chess.type(moving) === 'P' &&
          (Chess.rank(sqIdx) === 0 || Chess.rank(sqIdx) === 7);

        if (isPromo) {
          this.pendingPromo = { from: this.selected, to: sqIdx };
          this.selected = null;
          this.legalTargets = [];
          this._refresh();
          this._showPromoModal(Chess.color(moving));
        } else {
          this._applyMove(this.selected, sqIdx, null);
        }
      } else if (piece && pc === this.state.turn) {
        this.selected = sqIdx;
        this.legalTargets = Chess.legalMoves(this.state, sqIdx);
        this._refresh();
      } else {
        this.selected = null;
        this.legalTargets = [];
        this._refresh();
      }
    }
  }

  _showPromoModal(color) {
    const modal = document.getElementById('promo-modal');
    const choices = document.getElementById('promo-choices');
    if (!modal || !choices) {
      this._finishPromo('Q');
      return;
    }
    choices.innerHTML = '';
    const promos = color === 'w'
      ? ['wQ','wR','wB','wN']
      : ['bQ','bR','bB','bN'];
    for (const p of promos) {
      const btn = document.createElement('button');
      btn.className = 'promo-btn';
      const img = document.createElement('img');
      img.src = pieceToDataURL(p);
      btn.appendChild(img);
      btn.addEventListener('click', () => {
        modal.style.display = 'none';
        this._finishPromo(p[1]);
      });
      choices.appendChild(btn);
    }
    modal.style.display = 'flex';
  }

  _finishPromo(piece) {
    if (!this.pendingPromo) return;
    const { from, to } = this.pendingPromo;
    this.pendingPromo = null;
    this._applyMove(from, to, piece);
  }

  _applyMove(from, to, promotion) {
    const result = Chess.makeMove(this.state, from, to, promotion);
    if (!result) return;
    this.state = result.state;
    this.lastMove = { from, to };
    this.selected = null;
    this.legalTargets = [];
    this.hintSquares = [];
    this._refresh();
    if (this.onMove) this.onMove(result);
  }

  // Public API
  setState(state) {
    this.state = state;
    this.selected = null;
    this.legalTargets = [];
    this.hintSquares = [];
    this._refresh();
  }

  setLastMove(from, to) {
    this.lastMove = (from !== null) ? { from, to } : null;
    this._refresh();
  }

  showHints(squares) { this.hintSquares = squares; this._refresh(); }
  clearHints() { this.hintSquares = []; this._refresh(); }

  flip() { this.flipped = !this.flipped; this._render(); }

  reset(fen) {
    this.state = Chess.parseFen(fen || Chess.INIT_FEN);
    this.selected = null;
    this.legalTargets = [];
    this.lastMove = null;
    this.hintSquares = [];
    this._refresh();
  }

  flash(sqIdx, type) {
    const el = this.squares[sqIdx];
    if (!el) return;
    el.classList.remove('flash-ok', 'flash-bad');
    void el.offsetWidth;
    el.classList.add(type === 'ok' ? 'flash-ok' : 'flash-bad');
  }

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
      this._refresh();
    }
    return result;
  }

  setInteractive(val) { this.interactive = val; }
}
