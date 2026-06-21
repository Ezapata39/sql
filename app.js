/**
 * Main application logic — ties together all tabs.
 */
document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // TAB NAVIGATION
  // ========================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // ========================
  // FREE PLAY TAB
  // ========================
  const playBoard = new ChessBoard('board-play', {
    interactive: true,
    onMove: handlePlayMove
  });

  let playHistory = []; // array of { state, san, captured }
  let playCaptured = { white: [], black: [] };

  const PIECE_VALUES = { P: 1, N: 3, B: 3, R: 5, Q: 9 };
  const PIECE_SYMBOLS = { wP:'♙', wN:'♘', wB:'♗', wR:'♖', wQ:'♕', bP:'♟', bN:'♞', bB:'♝', bR:'♜', bQ:'♛' };

  function handlePlayMove(result) {
    playHistory.push({ state: result.state, san: result.san, from: result.from, to: result.to });
    if (result.captured && Chess.type(result.captured) !== 'K') {
      const capColor = Chess.color(result.captured);
      if (capColor === 'w') playCaptured.black.push(result.captured);
      else playCaptured.white.push(result.captured);
    }
    updatePlayUI();
  }

  function updatePlayUI() {
    const state = playBoard.state;
    const status = Chess.gameStatus(state);

    const statusEl = document.getElementById('play-status');
    const checkEl = document.getElementById('play-check');

    if (status.type === 'checkmate') {
      const winner = status.winner === 'w' ? 'White' : 'Black';
      statusEl.textContent = `Checkmate! ${winner} wins!`;
      checkEl.textContent = '★ Game over';
      playBoard.setInteractive(false);
    } else if (status.type === 'stalemate') {
      statusEl.textContent = 'Stalemate — Draw!';
      checkEl.textContent = '½-½';
      playBoard.setInteractive(false);
    } else if (status.type === 'draw50') {
      statusEl.textContent = '50-move rule — Draw!';
      checkEl.textContent = '½-½';
    } else if (status.type === 'check') {
      statusEl.textContent = (state.turn === 'w' ? 'White' : 'Black') + ' to move';
      checkEl.textContent = 'Check!';
    } else {
      statusEl.textContent = (state.turn === 'w' ? 'White' : 'Black') + ' to move';
      checkEl.textContent = '';
    }

    // Move history
    renderMoveHistory('play-history', playHistory);

    // Captured pieces
    document.querySelector('#captured-white .pieces').textContent =
      playCaptured.white.map(p => PIECE_SYMBOLS[p] || '').join('');
    document.querySelector('#captured-black .pieces').textContent =
      playCaptured.black.map(p => PIECE_SYMBOLS[p] || '').join('');

    // FEN
    document.getElementById('play-fen').textContent = Chess.toFen(state);
  }

  function renderMoveHistory(containerId, history) {
    const el = document.getElementById(containerId);
    el.innerHTML = '';
    for (let i = 0; i < history.length; i += 2) {
      const pair = document.createElement('div');
      pair.className = 'move-pair';
      const num = document.createElement('span');
      num.className = 'move-num';
      num.textContent = (Math.floor(i / 2) + 1) + '.';
      pair.appendChild(num);

      const w = document.createElement('span');
      w.className = 'move-white' + (i === history.length - 1 ? ' current' : '');
      w.textContent = history[i].san;
      pair.appendChild(w);

      if (history[i + 1]) {
        const b = document.createElement('span');
        b.className = 'move-black' + (i + 1 === history.length - 1 ? ' current' : '');
        b.textContent = history[i + 1].san;
        pair.appendChild(b);
      }
      el.appendChild(pair);
    }
    el.scrollTop = el.scrollHeight;
  }

  document.getElementById('reset-play').addEventListener('click', () => {
    playBoard.reset();
    playBoard.setInteractive(true);
    playHistory = [];
    playCaptured = { white: [], black: [] };
    document.getElementById('play-status').textContent = 'White to move';
    document.getElementById('play-check').textContent = '';
    document.getElementById('play-history').innerHTML = '';
    document.querySelector('#captured-white .pieces').textContent = '';
    document.querySelector('#captured-black .pieces').textContent = '';
    document.getElementById('play-fen').textContent = '';
  });

  document.getElementById('flip-board-play').addEventListener('click', () => playBoard.flip());

  document.getElementById('undo-play').addEventListener('click', () => {
    if (playHistory.length === 0) return;
    playHistory.pop();
    playCaptured = { white: [], black: [] };
    // Rebuild from scratch
    let state = Chess.parseFen(Chess.INIT_FEN);
    for (const move of playHistory) {
      const parsed = Chess.parseSan(state, move.san);
      if (parsed) {
        const result = Chess.makeMove(state, parsed.from, parsed.to, parsed.promotion);
        if (result) {
          state = result.state;
          if (result.captured && Chess.type(result.captured) !== 'K') {
            const capColor = Chess.color(result.captured);
            if (capColor === 'w') playCaptured.black.push(result.captured);
            else playCaptured.white.push(result.captured);
          }
        }
      }
    }
    playBoard.setState(state);
    playBoard.setInteractive(true);
    if (playHistory.length > 0) {
      const last = playHistory[playHistory.length - 1];
      playBoard.setLastMove(last.from, last.to);
    } else {
      playBoard.setLastMove(null, null);
    }
    updatePlayUI();
  });

  updatePlayUI();

  // ========================
  // OPENING EXPLORER TAB
  // ========================
  const explorerBoard = new ChessBoard('board-openings', { interactive: false });

  let explorerOpening = null;
  let explorerStep = 0;
  let explorerStates = [];

  // Populate selects
  const openingSelect = document.getElementById('opening-select');
  const trainerOpeningSelect = document.getElementById('trainer-opening-select');

  for (const o of OPENINGS) {
    const opt1 = document.createElement('option');
    opt1.value = o.id;
    opt1.textContent = o.name;
    openingSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = o.id;
    opt2.textContent = o.name;
    trainerOpeningSelect.appendChild(opt2);
  }

  openingSelect.addEventListener('change', () => {
    const id = openingSelect.value;
    if (!id) { explorerOpening = null; explorerBoard.reset(); return; }
    explorerOpening = OPENINGS_MAP[id];
    explorerStep = 0;
    buildExplorerStates();
    renderExplorer();
    renderOpeningInfo();
  });

  function buildExplorerStates() {
    explorerStates = [Chess.parseFen(Chess.INIT_FEN)];
    let state = Chess.parseFen(Chess.INIT_FEN);
    for (const san of explorerOpening.moves) {
      const parsed = Chess.parseSan(state, san);
      if (!parsed) break;
      const result = Chess.makeMove(state, parsed.from, parsed.to, parsed.promotion);
      if (!result) break;
      state = result.state;
      explorerStates.push(state);
    }
  }

  function renderExplorer() {
    if (!explorerOpening) return;
    const state = explorerStates[explorerStep];
    explorerBoard.setState(state);

    if (explorerStep > 0) {
      // Find what last move was
      const prevState = explorerStates[explorerStep - 1];
      const san = explorerOpening.moves[explorerStep - 1];
      const parsed = Chess.parseSan(prevState, san);
      if (parsed) explorerBoard.setLastMove(parsed.from, parsed.to);
    } else {
      explorerBoard.setLastMove(null, null);
    }

    // Progress text
    const total = explorerOpening.moves.length;
    document.getElementById('opening-move-progress').textContent =
      `Move ${explorerStep} / ${total}`;

    // Move list display
    renderExplorerMoves();
  }

  function renderExplorerMoves() {
    const el = document.getElementById('opening-moves-display');
    el.innerHTML = '';
    const moves = explorerOpening.moves;
    for (let i = 0; i < moves.length; i += 2) {
      const pair = document.createElement('div');
      pair.className = 'move-pair';
      const num = document.createElement('span');
      num.className = 'move-num';
      num.textContent = (Math.floor(i / 2) + 1) + '.';
      pair.appendChild(num);

      const w = document.createElement('span');
      w.className = 'move-white' + (explorerStep === i + 1 ? ' current' : '');
      w.textContent = moves[i];
      const capturedI = i;
      w.addEventListener('click', () => { explorerStep = capturedI + 1; renderExplorer(); });
      pair.appendChild(w);

      if (moves[i + 1]) {
        const b = document.createElement('span');
        b.className = 'move-black' + (explorerStep === i + 2 ? ' current' : '');
        b.textContent = moves[i + 1];
        const capturedI2 = i + 1;
        b.addEventListener('click', () => { explorerStep = capturedI2 + 1; renderExplorer(); });
        pair.appendChild(b);
      }
      el.appendChild(pair);
    }
  }

  function renderOpeningInfo() {
    if (!explorerOpening) return;
    const o = explorerOpening;
    document.getElementById('opening-info').innerHTML = `
      <strong>${o.name}</strong>
      <div style="margin-bottom:6px;color:#4cc9f0;font-size:0.8rem">${o.category} · ECO ${o.eco || '?'}</div>
      <p>${o.description}</p>
      <p><strong style="color:#e94560">Ideas:</strong> ${o.ideas}</p>
      <p><strong style="color:#e94560">Main lines:</strong> ${o.mainLine}</p>
    `;
  }

  document.getElementById('prev-opening-move').addEventListener('click', () => {
    if (!explorerOpening || explorerStep <= 0) return;
    explorerStep--;
    renderExplorer();
  });

  document.getElementById('next-opening-move').addEventListener('click', () => {
    if (!explorerOpening || explorerStep >= explorerOpening.moves.length) return;
    explorerStep++;
    renderExplorer();
  });

  document.getElementById('reset-opening').addEventListener('click', () => {
    explorerStep = 0;
    if (explorerOpening) renderExplorer();
    else explorerBoard.reset();
  });

  document.getElementById('flip-board-openings').addEventListener('click', () => explorerBoard.flip());

  // ========================
  // OPENING TRAINER TAB
  // ========================
  const trainerBoard = new ChessBoard('board-trainer', {
    interactive: true,
    onMove: handleTrainerMove
  });

  let trainerOpening = null;
  let trainerSide = 'white';
  let trainerMoveIdx = 0;
  let trainerStates = [];
  let trainerScore = { correct: 0, attempts: 0 };
  let trainerActive = false;
  let trainerHistory = [];

  document.getElementById('trainer-start').addEventListener('click', startTrainer);

  function startTrainer() {
    const id = trainerOpeningSelect.value;
    if (!id) {
      document.getElementById('trainer-message').textContent = 'Please select an opening first!';
      return;
    }
    trainerOpening = OPENINGS_MAP[id];
    trainerSide = document.querySelector('input[name="trainer-side"]:checked').value;
    trainerMoveIdx = 0;
    trainerScore = { correct: 0, attempts: 0 };
    trainerHistory = [];
    trainerActive = true;

    // Build states
    trainerStates = [Chess.parseFen(Chess.INIT_FEN)];
    let state = Chess.parseFen(Chess.INIT_FEN);
    for (const san of trainerOpening.moves) {
      const parsed = Chess.parseSan(state, san);
      if (!parsed) break;
      const result = Chess.makeMove(state, parsed.from, parsed.to, parsed.promotion);
      if (!result) break;
      state = result.state;
      trainerStates.push(state);
    }

    trainerBoard.reset();
    trainerBoard.setInteractive(true);
    document.getElementById('trainer-history').innerHTML = '';

    // If playing as Black, computer plays first move for White
    if (trainerSide === 'black') {
      if (trainerOpening.moves.length > 0) {
        setTimeout(() => playTrainerComputerMove(), 500);
      }
    }

    updateTrainerUI();
  }

  function handleTrainerMove(result) {
    if (!trainerActive) return;
    const expectedSan = trainerOpening.moves[trainerMoveIdx];
    trainerScore.attempts++;

    if (result.san === expectedSan) {
      trainerScore.correct++;
      trainerMoveIdx++;
      trainerHistory.push(result.san);
      trainerBoard.flash(result.to, 'correct');
      updateTrainerUI();

      if (trainerMoveIdx >= trainerOpening.moves.length) {
        finishTrainer();
        return;
      }
      // Computer plays next move
      setTimeout(() => playTrainerComputerMove(), 600);
    } else {
      // Wrong move — undo it
      trainerBoard.setState(trainerStates[trainerMoveIdx]);
      trainerBoard.setLastMove(null, null);
      if (trainerHistory.length > 0) {
        const last = trainerHistory[trainerHistory.length - 1];
        // Re-highlight last correct move
        const prevState = trainerStates[trainerMoveIdx - 1];
        const parsed = Chess.parseSan(prevState, last);
        if (parsed) trainerBoard.setLastMove(parsed.from, parsed.to);
      }
      trainerBoard.flash(result.to, 'wrong');
      document.getElementById('trainer-message').textContent =
        `Wrong! Expected: ${expectedSan}. Try again!`;
      updateTrainerScore();
    }
  }

  function playTrainerComputerMove() {
    if (!trainerActive || trainerMoveIdx >= trainerOpening.moves.length) return;
    const san = trainerOpening.moves[trainerMoveIdx];
    const result = trainerBoard.applyMoveSan(san);
    if (result) {
      trainerHistory.push(san);
      trainerMoveIdx++;
      updateTrainerUI();
      if (trainerMoveIdx >= trainerOpening.moves.length) {
        finishTrainer();
      }
    }
  }

  function finishTrainer() {
    trainerActive = false;
    trainerBoard.setInteractive(false);
    const pct = Math.round((trainerScore.correct / Math.max(1, trainerScore.attempts)) * 100);
    document.getElementById('trainer-message').textContent =
      `Opening complete! Score: ${trainerScore.correct}/${trainerScore.attempts} (${pct}%)`;
    document.getElementById('trainer-progress').textContent =
      `All ${trainerOpening.moves.length} moves completed!`;
  }

  function updateTrainerUI() {
    if (!trainerOpening) return;
    const totalMoves = trainerOpening.moves.length;
    const userMoves = trainerMoveIdx;

    // Determine which moves the user is responsible for
    const userResponsibleMoves = trainerOpening.moves.filter((_, i) => {
      if (trainerSide === 'white') return i % 2 === 0;
      return i % 2 === 1;
    });
    const userProgress = trainerHistory.filter((_, i) => {
      const moveTotalIdx = trainerHistory.length - (trainerHistory.length - i);
      return true; // simplified
    }).length;

    const isUserTurn = (() => {
      if (!trainerActive) return false;
      const turnColor = trainerBoard.state.turn;
      return (trainerSide === 'white' && turnColor === 'w') ||
             (trainerSide === 'black' && turnColor === 'b');
    })();

    if (trainerActive) {
      document.getElementById('trainer-message').textContent =
        isUserTurn ? `Your turn! (Move ${trainerMoveIdx + 1}/${totalMoves})` : 'Computer is thinking...';
      document.getElementById('trainer-progress').textContent =
        `Progress: ${userMoves}/${totalMoves} moves`;
    }

    updateTrainerScore();
    renderTrainerHistory();
  }

  function updateTrainerScore() {
    document.getElementById('trainer-score').textContent =
      trainerScore.attempts > 0
        ? `Accuracy: ${Math.round(trainerScore.correct / trainerScore.attempts * 100)}% (${trainerScore.correct}/${trainerScore.attempts})`
        : '';
  }

  function renderTrainerHistory() {
    const el = document.getElementById('trainer-history');
    el.innerHTML = '';
    for (let i = 0; i < trainerHistory.length; i += 2) {
      const pair = document.createElement('div');
      pair.className = 'move-pair';
      const num = document.createElement('span');
      num.className = 'move-num';
      num.textContent = (Math.floor(i / 2) + 1) + '.';
      pair.appendChild(num);
      const w = document.createElement('span');
      w.className = 'move-white';
      w.textContent = trainerHistory[i];
      pair.appendChild(w);
      if (trainerHistory[i + 1]) {
        const b = document.createElement('span');
        b.className = 'move-black';
        b.textContent = trainerHistory[i + 1];
        pair.appendChild(b);
      }
      el.appendChild(pair);
    }
    el.scrollTop = el.scrollHeight;
  }

  document.getElementById('trainer-hint').addEventListener('click', () => {
    if (!trainerActive || trainerMoveIdx >= trainerOpening.moves.length) return;
    const san = trainerOpening.moves[trainerMoveIdx];
    const parsed = Chess.parseSan(trainerBoard.state, san);
    if (parsed) {
      trainerBoard.showHints([parsed.from, parsed.to]);
      document.getElementById('trainer-message').textContent =
        `Hint: ${san}`;
    }
  });

  document.getElementById('trainer-next').addEventListener('click', () => {
    if (!trainerActive || trainerMoveIdx >= trainerOpening.moves.length) return;
    const san = trainerOpening.moves[trainerMoveIdx];
    const result = trainerBoard.applyMoveSan(san);
    if (result) {
      trainerHistory.push(san);
      trainerMoveIdx++;
      trainerBoard.clearHints();
      updateTrainerUI();
      if (trainerMoveIdx >= trainerOpening.moves.length) {
        finishTrainer();
        return;
      }
      // If it's now computer's turn
      const nextSide = trainerBoard.state.turn;
      const isUserNext = (trainerSide === 'white' && nextSide === 'w') ||
                         (trainerSide === 'black' && nextSide === 'b');
      if (!isUserNext) {
        setTimeout(() => playTrainerComputerMove(), 400);
      }
    }
  });

  document.getElementById('trainer-restart').addEventListener('click', startTrainer);

  document.getElementById('flip-board-trainer').addEventListener('click', () => trainerBoard.flip());

  // ========================
  // THEORY TAB
  // ========================
  const topicsList = document.getElementById('theory-topics');
  const theoryContent = document.getElementById('theory-content');

  for (const topic of THEORY_TOPICS) {
    const li = document.createElement('li');
    li.textContent = topic.title;
    li.dataset.id = topic.id;
    li.addEventListener('click', () => {
      document.querySelectorAll('#theory-topics li').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      theoryContent.innerHTML = topic.content;
    });
    topicsList.appendChild(li);
  }

  // Load first topic by default
  if (THEORY_TOPICS.length > 0) {
    topicsList.firstChild.classList.add('active');
    theoryContent.innerHTML = THEORY_TOPICS[0].content;
  }
});
