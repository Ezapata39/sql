document.addEventListener('DOMContentLoaded', () => {

  // ─── TABS ────────────────────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // ─── STOCKFISH ───────────────────────────────────────────────────
  let sf = null;
  let sfReady = false;
  let sfCallback = null;

  function attachSfHandlers() {
    sf.onmessage = e => {
      const line = typeof e.data === 'string' ? e.data : '';
      if (line === 'uciok') { sf.postMessage('isready'); return; }
      if (line === 'readyok') { sfReady = true; return; }
      if (line.startsWith('info') && line.includes('score')) {
        const m = line.match(/score (cp|mate) (-?\d+)/);
        if (m) updateEvalBar(m[1], +m[2]);
      }
      if (line.startsWith('bestmove') && sfCallback) {
        const parts = line.split(' ');
        sfCallback(parts[1]);
        sfCallback = null;
      }
    };
    sf.postMessage('uci');
  }

  async function initStockfish() {
    try {
      // Fetch and blobify to bypass cross-origin Worker restriction
      const resp = await fetch('https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const script = await resp.text();
      const blobUrl = URL.createObjectURL(new Blob([script], { type: 'text/javascript' }));
      sf = new Worker(blobUrl);
      attachSfHandlers();
    } catch (err) {
      console.warn('Stockfish unavailable:', err);
      sf = null;
    }
  }

  function sfMove(fen, depth, cb) {
    if (!sf || !sfReady) { cb && cb(null); return; }
    sfCallback = cb;
    sf.postMessage('position fen ' + fen);
    sf.postMessage('go depth ' + depth);
  }

  function uciToMove(uci, state) {
    if (!uci || uci === '(none)') return null;
    const from = Chess.idxFromSq(uci.slice(0, 2));
    const to   = Chess.idxFromSq(uci.slice(2, 4));
    const promo = uci[4] ? uci[4].toUpperCase() : null;
    return { from, to, promo };
  }

  initStockfish();

  // ─── EVAL BAR ────────────────────────────────────────────────────
  const evalFill = document.getElementById('eval-fill');
  const evalNum  = document.getElementById('eval-num');

  function updateEvalBar(type, val) {
    let pct = 50;
    let label = '0.0';
    if (type === 'cp') {
      const clamped = Math.max(-1000, Math.min(1000, val));
      pct = 50 + (clamped / 20);
      label = (val >= 0 ? '+' : '') + (val / 100).toFixed(1);
    } else if (type === 'mate') {
      pct = val > 0 ? 95 : 5;
      label = 'M' + Math.abs(val);
    }
    if (evalFill) evalFill.style.height = Math.max(5, Math.min(95, pct)) + '%';
    if (evalNum)  evalNum.textContent = label;
  }

  // ─── HELPERS ─────────────────────────────────────────────────────
  const CAP_SYMBOLS = { wP:'♙',wN:'♘',wB:'♗',wR:'♖',wQ:'♕',bP:'♟',bN:'♞',bB:'♝',bR:'♜',bQ:'♛' };

  function renderMoves(containerId, history) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < history.length; i += 2) {
      const div = document.createElement('div');
      div.className = 'move-pair';
      const num = document.createElement('span');
      num.className = 'move-num';
      num.textContent = (i / 2 + 1) + '.';
      div.appendChild(num);
      for (const j of [i, i + 1]) {
        if (!history[j]) continue;
        const s = document.createElement('span');
        s.className = (j % 2 === 0 ? 'move-w' : 'move-b') + (j === history.length - 1 ? ' cur' : '');
        s.textContent = history[j].san;
        div.appendChild(s);
      }
      el.appendChild(div);
    }
    el.scrollTop = el.scrollHeight;
  }

  function gameStatus(board) { return Chess.gameStatus(board.state); }

  // ─── VS AI TAB ───────────────────────────────────────────────────
  const aiBoard = new ChessBoard('board-ai', {
    interactive: false,
    onMove: handleAIPlayerMove
  });

  let aiHistory = [];
  let aiPlayerColor = 'w';
  let aiActive = false;
  let aiDepth = 10;
  let aiStates = [Chess.parseFen(Chess.INIT_FEN)];

  // Depth slider
  const depthSlider = document.getElementById('depth-slider');
  const depthLabel  = document.getElementById('depth-label');
  depthSlider?.addEventListener('input', () => {
    aiDepth = +depthSlider.value;
    depthLabel.textContent = aiDepth;
  });

  // Side buttons
  document.querySelectorAll('.side-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.side-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('start-ai-game')?.addEventListener('click', startAIGame);
  document.getElementById('reset-ai')?.addEventListener('click', startAIGame);
  document.getElementById('flip-board-ai')?.addEventListener('click', () => { aiBoard.flip(); });
  document.getElementById('undo-ai')?.addEventListener('click', undoAIMove);
  document.getElementById('ai-hint-btn')?.addEventListener('click', showAIHint);

  function startAIGame() {
    const activeSide = document.querySelector('.side-btn.active');
    aiPlayerColor = activeSide?.dataset.side === 'black' ? 'b' : 'w';
    aiActive = true;
    aiHistory = [];
    aiStates = [Chess.parseFen(Chess.INIT_FEN)];

    aiBoard.reset();
    aiBoard.setInteractive(true);
    aiBoard.flipped = (aiPlayerColor === 'b');
    aiBoard._render();

    updateAIPlayerTags();
    setAIStatus('Game started!', '');
    document.getElementById('ai-history').innerHTML = '';
    resetEval();

    if (aiPlayerColor === 'b') {
      // AI plays first as White
      setThinking(true);
      setTimeout(() => doAIMove(), 300);
    }
  }

  function updateAIPlayerTags() {
    const topIsBlack = !aiBoard.flipped;
    document.getElementById('ai-top-name').textContent = topIsBlack
      ? (aiPlayerColor === 'b' ? 'Stockfish' : 'You (Black)')
      : (aiPlayerColor === 'w' ? 'Stockfish' : 'You (White)');
    document.getElementById('ai-bot-name').textContent = !topIsBlack
      ? (aiPlayerColor === 'b' ? 'Stockfish' : 'You (Black)')
      : (aiPlayerColor === 'w' ? 'Stockfish' : 'You (White)');
  }

  function handleAIPlayerMove(result) {
    if (!aiActive) return;
    aiHistory.push({ san: result.san, from: result.from, to: result.to });
    aiStates.push(result.state);
    renderMoves('ai-history', aiHistory);

    const st = gameStatus(aiBoard);
    if (st.type !== 'ongoing' && st.type !== 'check') {
      handleGameOver(st);
      return;
    }
    if (st.type === 'check') setAIStatus('Check!', 'Check!');
    else setAIStatus(result.state.turn === 'w' ? 'White to move' : 'Black to move', '');

    aiBoard.setInteractive(false);
    setThinking(true);
    setTimeout(() => doAIMove(), 400);
  }

  function doAIMove() {
    const fen = Chess.toFen(aiBoard.state);
    sfMove(fen, aiDepth, uci => {
      setThinking(false);
      if (!uci || !aiActive) {
        aiBoard.setInteractive(true);
        if (!sfReady) setAIStatus('Stockfish loading… wait a moment then try your move again', '');
        return;
      }
      const m = uciToMove(uci, aiBoard.state);
      if (!m) return;
      const result = Chess.makeMove(aiBoard.state, m.from, m.to, m.promo);
      if (!result) return;
      aiHistory.push({ san: result.san, from: m.from, to: m.to });
      aiStates.push(result.state);
      aiBoard.state = result.state;
      aiBoard.lastMove = { from: m.from, to: m.to };
      aiBoard._refresh();
      renderMoves('ai-history', aiHistory);

      const st = Chess.gameStatus(result.state);
      if (st.type !== 'ongoing' && st.type !== 'check') {
        handleGameOver(st);
      } else {
        aiBoard.setInteractive(true);
        if (st.type === 'check') setAIStatus('Check! Your move', 'Check!');
        else setAIStatus('Your move', '');
      }
    });
  }

  function handleGameOver(st) {
    aiActive = false;
    aiBoard.setInteractive(false);
    if (st.type === 'checkmate') {
      const winner = st.winner === aiPlayerColor ? 'You win!' : 'Stockfish wins!';
      setAIStatus('Checkmate — ' + winner, '★');
    } else if (st.type === 'stalemate') {
      setAIStatus('Stalemate — Draw!', '½');
    } else if (st.type === 'draw50') {
      setAIStatus('Draw by 50-move rule', '½');
    }
  }

  function undoAIMove() {
    if (aiStates.length < 3) return;
    // Remove both the AI move and the player move
    aiStates.splice(-2);
    aiHistory.splice(-2);
    const prevState = aiStates[aiStates.length - 1];
    aiBoard.setState(prevState);
    if (aiHistory.length > 0) {
      const last = aiHistory[aiHistory.length - 1];
      aiBoard.setLastMove(last.from, last.to);
    } else {
      aiBoard.setLastMove(null, null);
    }
    aiBoard.setInteractive(true);
    aiActive = true;
    renderMoves('ai-history', aiHistory);
    setAIStatus('Your move', '');
  }

  function showAIHint() {
    if (!aiActive) return;
    const fen = Chess.toFen(aiBoard.state);
    sfMove(fen, Math.min(aiDepth, 8), uci => {
      if (!uci) return;
      const m = uciToMove(uci, aiBoard.state);
      if (m) aiBoard.showHints([m.from, m.to]);
      setTimeout(() => aiBoard.clearHints(), 2000);
    });
  }

  function setAIStatus(msg, check) {
    const s = document.getElementById('ai-status');
    const c = document.getElementById('ai-check');
    if (s) s.textContent = msg;
    if (c) c.textContent = check || '';
  }

  function setThinking(on) {
    const el = document.getElementById('ai-thinking');
    if (el) el.style.display = on ? 'flex' : 'none';
  }

  function resetEval() {
    if (evalFill) evalFill.style.height = '50%';
    if (evalNum)  evalNum.textContent = '0.0';
  }

  // ─── FREE PLAY TAB ───────────────────────────────────────────────
  const playBoard = new ChessBoard('board-play', {
    interactive: true,
    onMove: handlePlayMove
  });

  let playHistory = [];
  let playCaptured = { w: [], b: [] };
  let playStates = [Chess.parseFen(Chess.INIT_FEN)];

  function handlePlayMove(result) {
    playHistory.push({ san: result.san, from: result.from, to: result.to });
    playStates.push(result.state);
    if (result.captured && Chess.type(result.captured) !== 'K') {
      playCaptured[Chess.color(result.captured)].push(result.captured);
    }
    updatePlayUI();
  }

  function updatePlayUI() {
    const st = Chess.gameStatus(playBoard.state);
    const statusEl = document.getElementById('play-status');
    const checkEl  = document.getElementById('play-check');
    if (st.type === 'checkmate') {
      const w = st.winner === 'w' ? 'White' : 'Black';
      statusEl.textContent = `Checkmate — ${w} wins!`;
      checkEl.textContent = '★';
      playBoard.setInteractive(false);
    } else if (st.type === 'stalemate') {
      statusEl.textContent = 'Stalemate — Draw!';
      checkEl.textContent = '½';
      playBoard.setInteractive(false);
    } else {
      statusEl.textContent = (playBoard.state.turn === 'w' ? 'White' : 'Black') + ' to move';
      checkEl.textContent = st.type === 'check' ? 'Check!' : '';
    }
    renderMoves('play-history', playHistory);
    document.querySelector('#captured-white .cap-pieces').textContent =
      playCaptured.w.map(p => CAP_SYMBOLS[p] || '').join('');
    document.querySelector('#captured-black .cap-pieces').textContent =
      playCaptured.b.map(p => CAP_SYMBOLS[p] || '').join('');
    document.getElementById('play-fen').textContent = Chess.toFen(playBoard.state);
  }

  document.getElementById('reset-play')?.addEventListener('click', () => {
    playBoard.reset(); playBoard.setInteractive(true);
    playHistory = []; playCaptured = { w: [], b: [] }; playStates = [Chess.parseFen(Chess.INIT_FEN)];
    document.getElementById('play-status').textContent = 'White to move';
    document.getElementById('play-check').textContent = '';
    document.getElementById('play-history').innerHTML = '';
    document.querySelector('#captured-white .cap-pieces').textContent = '';
    document.querySelector('#captured-black .cap-pieces').textContent = '';
    document.getElementById('play-fen').textContent = '';
  });

  document.getElementById('flip-board-play')?.addEventListener('click', () => playBoard.flip());

  document.getElementById('undo-play')?.addEventListener('click', () => {
    if (playHistory.length === 0) return;
    playHistory.pop(); playStates.pop();
    playCaptured = { w: [], b: [] };
    let state = Chess.parseFen(Chess.INIT_FEN);
    for (const m of playHistory) {
      const p = Chess.parseSan(state, m.san);
      if (p) {
        const r = Chess.makeMove(state, p.from, p.to, p.promotion);
        if (r) {
          state = r.state;
          if (r.captured && Chess.type(r.captured) !== 'K')
            playCaptured[Chess.color(r.captured)].push(r.captured);
        }
      }
    }
    playBoard.setState(state);
    playBoard.setInteractive(true);
    if (playHistory.length > 0) {
      const last = playHistory[playHistory.length - 1];
      playBoard.setLastMove(last.from, last.to);
    } else playBoard.setLastMove(null, null);
    updatePlayUI();
  });

  updatePlayUI();

  // ─── OPENING EXPLORER ────────────────────────────────────────────
  const expBoard = new ChessBoard('board-openings', { interactive: false });
  let expOpening = null, expStep = 0, expStates = [];

  const openingSelect = document.getElementById('opening-select');
  const trainerSelect = document.getElementById('trainer-opening-select');

  for (const o of OPENINGS) {
    [openingSelect, trainerSelect].forEach(sel => {
      if (!sel) return;
      const opt = document.createElement('option');
      opt.value = o.id; opt.textContent = o.name;
      sel.appendChild(opt);
    });
  }

  openingSelect?.addEventListener('change', () => {
    const id = openingSelect.value;
    if (!id) { expOpening = null; expBoard.reset(); return; }
    expOpening = OPENINGS_MAP[id];
    expStep = 0;
    buildExpStates();
    renderExp();
    renderExpInfo();
  });

  function buildExpStates() {
    expStates = [Chess.parseFen(Chess.INIT_FEN)];
    let st = Chess.parseFen(Chess.INIT_FEN);
    for (const san of expOpening.moves) {
      const p = Chess.parseSan(st, san);
      if (!p) break;
      const r = Chess.makeMove(st, p.from, p.to, p.promotion);
      if (!r) break;
      st = r.state;
      expStates.push(st);
    }
  }

  function renderExp() {
    if (!expOpening) return;
    expBoard.setState(expStates[expStep]);
    if (expStep > 0) {
      const prev = expStates[expStep - 1];
      const san  = expOpening.moves[expStep - 1];
      const p = Chess.parseSan(prev, san);
      if (p) expBoard.setLastMove(p.from, p.to);
    } else expBoard.setLastMove(null, null);
    document.getElementById('opening-move-progress').textContent =
      `Move ${expStep} / ${expOpening.moves.length}`;
    renderExpMoves();
  }

  function renderExpMoves() {
    const el = document.getElementById('opening-moves-display');
    if (!el) return;
    el.innerHTML = '';
    const moves = expOpening.moves;
    for (let i = 0; i < moves.length; i += 2) {
      const div = document.createElement('div');
      div.className = 'move-pair';
      const num = document.createElement('span');
      num.className = 'move-num';
      num.textContent = (i / 2 + 1) + '.';
      div.appendChild(num);
      for (const j of [i, i + 1]) {
        if (!moves[j]) continue;
        const s = document.createElement('span');
        s.className = (j % 2 === 0 ? 'move-w' : 'move-b') + (expStep === j + 1 ? ' cur' : '');
        s.textContent = moves[j];
        const jj = j;
        s.addEventListener('click', () => { expStep = jj + 1; renderExp(); });
        div.appendChild(s);
      }
      el.appendChild(div);
    }
  }

  function renderExpInfo() {
    if (!expOpening) return;
    const o = expOpening;
    const el = document.getElementById('opening-info');
    if (!el) return;
    el.innerHTML = `<strong>${o.name}</strong><div class="eco">${o.category} · ECO ${o.eco}</div>
    <p>${o.description}</p>
    <p><strong>Ideas:</strong> ${o.ideas}</p>
    <p><strong>Main lines:</strong> ${o.mainLine}</p>`;
  }

  document.getElementById('prev-opening-move')?.addEventListener('click', () => {
    if (expOpening && expStep > 0) { expStep--; renderExp(); }
  });
  document.getElementById('next-opening-move')?.addEventListener('click', () => {
    if (expOpening && expStep < expOpening.moves.length) { expStep++; renderExp(); }
  });
  document.getElementById('reset-opening')?.addEventListener('click', () => {
    expStep = 0; if (expOpening) renderExp(); else expBoard.reset();
  });
  document.getElementById('flip-board-openings')?.addEventListener('click', () => expBoard.flip());

  // ─── OPENING TRAINER ─────────────────────────────────────────────
  const trBoard = new ChessBoard('board-trainer', {
    interactive: true,
    onMove: handleTrainerMove
  });

  let trOpening = null, trSide = 'white', trIdx = 0;
  let trStates = [], trHist = [], trScore = { ok: 0, total: 0 };
  let trActive = false;

  document.getElementById('trainer-start')?.addEventListener('click', startTrainer);
  document.getElementById('trainer-restart')?.addEventListener('click', startTrainer);

  function startTrainer() {
    const id = trainerSelect?.value;
    if (!id) { document.getElementById('trainer-message').textContent = 'Select an opening first!'; return; }
    trOpening = OPENINGS_MAP[id];
    trSide = document.querySelector('input[name="trainer-side"]:checked')?.value || 'white';
    trIdx = 0; trHist = []; trScore = { ok: 0, total: 0 }; trActive = true;
    trStates = [Chess.parseFen(Chess.INIT_FEN)];
    let st = Chess.parseFen(Chess.INIT_FEN);
    for (const san of trOpening.moves) {
      const p = Chess.parseSan(st, san);
      if (!p) break;
      const r = Chess.makeMove(st, p.from, p.to, p.promotion);
      if (!r) break;
      st = r.state; trStates.push(st);
    }
    trBoard.reset();
    trBoard.setInteractive(true);
    document.getElementById('trainer-history').innerHTML = '';
    updateTrainerUI();
    if (trSide === 'black' && trOpening.moves.length > 0) setTimeout(trPlayComputer, 500);
  }

  function handleTrainerMove(result) {
    if (!trActive) return;
    const expected = trOpening.moves[trIdx];
    trScore.total++;
    if (result.san === expected) {
      trScore.ok++;
      trIdx++;
      trHist.push({ san: result.san });
      trBoard.flash(result.to, 'ok');
      if (trIdx >= trOpening.moves.length) { finishTrainer(); return; }
      setTimeout(trPlayComputer, 500);
    } else {
      trBoard.setState(trStates[trIdx]);
      if (trHist.length > 0) {
        const prev = trStates[trIdx - 1];
        const p = Chess.parseSan(prev, trHist[trHist.length - 1].san);
        if (p) trBoard.setLastMove(p.from, p.to);
      } else trBoard.setLastMove(null, null);
      trBoard.flash(result.to, 'bad');
      document.getElementById('trainer-message').textContent = `Wrong! Expected: ${expected}`;
    }
    updateTrainerUI();
  }

  function trPlayComputer() {
    if (!trActive || trIdx >= trOpening.moves.length) return;
    const san = trOpening.moves[trIdx];
    const result = trBoard.applyMoveSan(san);
    if (result) {
      trHist.push({ san });
      trIdx++;
      updateTrainerUI();
      if (trIdx >= trOpening.moves.length) finishTrainer();
    }
  }

  function finishTrainer() {
    trActive = false; trBoard.setInteractive(false);
    const pct = trScore.total ? Math.round(trScore.ok / trScore.total * 100) : 100;
    document.getElementById('trainer-message').textContent =
      `Complete! ${trScore.ok}/${trScore.total} correct (${pct}%)`;
  }

  function updateTrainerUI() {
    if (!trOpening) return;
    const isUserTurn = trActive && (
      (trSide === 'white' && trBoard.state.turn === 'w') ||
      (trSide === 'black' && trBoard.state.turn === 'b')
    );
    if (trActive) {
      document.getElementById('trainer-message').textContent =
        isUserTurn ? `Your turn — move ${trIdx + 1} of ${trOpening.moves.length}` : 'Computer playing…';
    }
    document.getElementById('trainer-progress').textContent =
      `Progress: ${trIdx}/${trOpening.moves.length}`;
    document.getElementById('trainer-score').textContent =
      trScore.total ? `Accuracy: ${Math.round(trScore.ok / trScore.total * 100)}%` : '';
    renderMoves('trainer-history', trHist);
  }

  document.getElementById('trainer-hint')?.addEventListener('click', () => {
    if (!trActive || trIdx >= trOpening.moves.length) return;
    const san = trOpening.moves[trIdx];
    const p = Chess.parseSan(trBoard.state, san);
    if (p) { trBoard.showHints([p.from, p.to]); }
    document.getElementById('trainer-message').textContent = `Hint: ${san}`;
  });

  document.getElementById('trainer-next')?.addEventListener('click', () => {
    if (!trActive || trIdx >= trOpening.moves.length) return;
    const san = trOpening.moves[trIdx];
    const r = trBoard.applyMoveSan(san);
    if (r) {
      trHist.push({ san }); trIdx++;
      trBoard.clearHints();
      updateTrainerUI();
      if (trIdx >= trOpening.moves.length) { finishTrainer(); return; }
      const nextIsUser = (trSide === 'white' && trBoard.state.turn === 'w') ||
                         (trSide === 'black' && trBoard.state.turn === 'b');
      if (!nextIsUser) setTimeout(trPlayComputer, 400);
    }
  });

  document.getElementById('flip-board-trainer')?.addEventListener('click', () => trBoard.flip());

  // ─── THEORY ──────────────────────────────────────────────────────
  const topicsList = document.getElementById('theory-topics');
  const theoryEl   = document.getElementById('theory-content');

  THEORY_TOPICS.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t.title;
    li.addEventListener('click', () => {
      document.querySelectorAll('#theory-topics li').forEach(l => l.classList.remove('active'));
      li.classList.add('active');
      theoryEl.innerHTML = t.content;
    });
    topicsList?.appendChild(li);
    if (i === 0) { li.classList.add('active'); theoryEl.innerHTML = t.content; }
  });

});
