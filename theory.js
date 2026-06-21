/**
 * Chess theory content for the Theory Guide tab.
 */
const THEORY_TOPICS = [
  {
    id: 'principles',
    title: 'Opening Principles',
    content: `
<h2>Opening Principles</h2>
<p>Chess openings follow a set of fundamental principles that have been refined over centuries of play. Understanding these will help you in any opening you face.</p>

<h3>1. Control the Center</h3>
<p>The four central squares — e4, e5, d4, d5 — are the most important real estate on the board. Pieces in the center have maximum mobility and influence.</p>
<div class="highlight-box">
  <strong>Key Principle:</strong> Occupy or control the center with pawns and pieces. The side with better central control typically has more active pieces.
</div>

<h3>2. Develop Your Pieces</h3>
<p>Bring your pieces to active squares quickly. Every tempo wasted in development is time your opponent uses to build a better position.</p>
<ul>
  <li>Develop knights before bishops (usually)</li>
  <li>Don't move the same piece twice without good reason</li>
  <li>Aim to have all pieces developed before launching an attack</li>
  <li>Connect your rooks by castling and moving the queen</li>
</ul>

<h3>3. King Safety — Castle Early</h3>
<p>An uncastled king in the center is a liability. Castle early to bring your king to safety and connect your rooks.</p>
<div class="highlight-box">
  <strong>Rule of thumb:</strong> Castle within the first 10 moves. The longer you wait, the more danger your king faces.
</div>

<h3>4. Don't Move the Queen Too Early</h3>
<p>The queen is powerful but vulnerable. Moving it out early invites attacks that cost you tempo when you have to retreat.</p>

<h3>5. Don't Bring Out the Same Piece Twice</h3>
<p>Unless absolutely necessary, don't move an already-developed piece again in the opening. You're essentially giving your opponent a free move.</p>

<h3>6. Don't Grab Pawns at the Cost of Development</h3>
<p>Pawn grabbing in the opening often leads to a lag in development and a vulnerable position. Material is less important than activity in the opening.</p>
`
  },
  {
    id: 'pawn-structures',
    title: 'Pawn Structures',
    content: `
<h2>Pawn Structures</h2>
<p>Pawn structures define the character of a chess game. They determine where the pieces belong, what plans each side should follow, and often persist into the endgame.</p>

<h3>Isolated Pawn</h3>
<p>A pawn with no friendly pawns on adjacent files. It's a weakness (can't be defended by pawns) but also a strength (controls space and the square in front can be a strong outpost).</p>
<ul>
  <li><strong>Example:</strong> The IQP (Isolated Queen's Pawn) arising from QGA, Nimzo, Tarrasch</li>
  <li>Active piece play compensates for the structural weakness</li>
  <li>In endgames, isolated pawns become critical weaknesses</li>
</ul>

<h3>Doubled Pawns</h3>
<p>Two pawns of the same color on the same file. Generally a structural weakness but can control important squares.</p>
<div class="highlight-box">
  <strong>Example:</strong> In the Nimzo-Indian, Black often plays ...Bxc3, giving White doubled pawns. White gets the bishop pair as compensation.
</div>

<h3>Passed Pawn</h3>
<p>A pawn with no enemy pawn blocking it or on adjacent files. Passed pawns are powerful — "a passed pawn must be pushed!" (Nimzowitsch)</p>

<h3>Backward Pawn</h3>
<p>A pawn that can't be defended by other pawns and can't advance safely. The square in front of it becomes a chronic weakness.</p>

<h3>Pawn Chains</h3>
<p>A diagonal chain of pawns, each protecting the next. Attack a pawn chain at its base.</p>
<ul>
  <li><strong>French Defence:</strong> White d4-e5 chain vs Black d5-e6 chain</li>
  <li>White attacks base at d5; Black attacks base at d4</li>
</ul>

<h3>Open and Half-Open Files</h3>
<ul>
  <li><strong>Open file:</strong> No pawns of either color. Rooks love open files.</li>
  <li><strong>Half-open file:</strong> No friendly pawns, but enemy pawn present. Still useful for rooks.</li>
  <li>Place rooks on open files and connect them to control key columns.</li>
</ul>
`
  },
  {
    id: 'tactics',
    title: 'Tactical Motifs',
    content: `
<h2>Tactical Motifs</h2>
<p>Tactics are short-term calculations that win material or deliver checkmate. Every position is potentially tactical. Learn to spot these patterns.</p>

<h3>Fork</h3>
<p>One piece attacks two or more enemy pieces simultaneously. Knights are especially good at forks.</p>
<div class="highlight-box">
  <strong>Example:</strong> A knight on c7 forking the king on e8 and rook on a8 — a "royal fork."
</div>

<h3>Pin</h3>
<p>Attacking a piece that cannot move without exposing a more valuable piece behind it.</p>
<ul>
  <li><strong>Absolute pin:</strong> Pinned against the king (piece literally cannot move)</li>
  <li><strong>Relative pin:</strong> Pinned against a valuable piece (could move but at material cost)</li>
</ul>

<h3>Skewer</h3>
<p>Like a reverse pin. Attack a valuable piece that must move, exposing a less valuable piece behind it.</p>

<h3>Discovered Attack</h3>
<p>Moving one piece reveals an attack by another piece behind it. Discovered checks are especially powerful.</p>

<h3>Double Check</h3>
<p>A discovered check where the moving piece also gives check. The only response is to move the king — blocking and capturing are both impossible.</p>

<h3>Zwischenzug (Intermezzo)</h3>
<p>An "in-between move" — instead of the expected reply, an unexpected move that changes the calculation entirely. Very common in tactics.</p>

<h3>Deflection</h3>
<p>Forcing a piece away from its defensive duty, exposing weaknesses it was protecting.</p>

<h3>Decoy</h3>
<p>Luring a piece to a specific square where it can be exploited.</p>

<h3>Back Rank Checkmate</h3>
<p>Delivering checkmate on the opponent's back rank when their king is trapped behind pawns.</p>
<div class="highlight-box">
  <strong>Prevention:</strong> Create a "luft" — move a pawn to give your king an escape square.
</div>

<h3>Smothered Mate</h3>
<p>A knight delivers checkmate to a king surrounded (smothered) by its own pieces. Usually set up with a queen sacrifice.</p>
`
  },
  {
    id: 'strategy',
    title: 'Strategic Concepts',
    content: `
<h2>Strategic Concepts</h2>
<p>Strategy is long-term planning — knowing what plans to execute based on the position's characteristics. Unlike tactics, strategy unfolds over many moves.</p>

<h3>Piece Activity</h3>
<p>Active pieces outperform passive pieces. Always ask: "What is my worst-placed piece, and how can I improve it?"</p>

<h3>Outposts</h3>
<p>A square that cannot be attacked by enemy pawns, where your piece — especially a knight — can sit permanently. A knight on an outpost in the center or on the 5th rank is a very powerful piece.</p>
<div class="highlight-box">
  <strong>Classic example:</strong> A knight on d5 in the Sicilian that can't be dislodged by pawns is a dominant outpost.
</div>

<h3>Weak Squares</h3>
<p>Squares that can no longer be defended by pawns. These become targets for enemy pieces. Avoid creating unnecessary pawn moves that create weak squares.</p>

<h3>Open Files and Rook Placement</h3>
<p>Rooks belong on open files. The 7th rank is especially powerful (absolute 7th or "pig on the 7th").</p>

<h3>Bishop vs Knight</h3>
<ul>
  <li><strong>Open positions:</strong> Bishops are usually stronger (long diagonals, mobility)</li>
  <li><strong>Closed positions:</strong> Knights are usually stronger (can maneuver around pawns)</li>
  <li><strong>Bishop pair:</strong> Two bishops working together are a powerful long-term advantage</li>
</ul>

<h3>The Minority Attack</h3>
<p>Using fewer pawns to attack more pawns on one wing, creating weaknesses. Common in QGD positions.</p>

<h3>Prophylaxis</h3>
<p>Preventing your opponent's plans before they become threats. A key strategic concept from Petrosian.</p>

<h3>Piece Coordination</h3>
<p>Make sure your pieces work together harmoniously. Individual strong pieces are less valuable than coordinated ones.</p>
`
  },
  {
    id: 'endgame',
    title: 'Endgame Basics',
    content: `
<h2>Endgame Basics</h2>
<p>Many games are decided in the endgame. Understanding basic endgame principles can save (or win) many games.</p>

<h3>King Activation</h3>
<p>In the endgame, the king becomes a powerful fighting piece. Centralize your king immediately in endings.</p>
<div class="highlight-box">
  <strong>Key transition:</strong> When queens are exchanged, bring your king to the center as fast as possible.
</div>

<h3>The Opposition</h3>
<p>When kings face each other with one square between them, the side that does NOT have to move has the "opposition" and has a strategic advantage in pawn endgames.</p>

<h3>Pawn Endings</h3>
<ul>
  <li><strong>Key squares:</strong> If your king reaches a key square, the pawn promotes</li>
  <li><strong>Rule of the square:</strong> Can the king catch a passed pawn? Count the diagonal square</li>
  <li><strong>Zugzwang:</strong> Being forced to move when any move worsens your position</li>
</ul>

<h3>Rook Endings</h3>
<p>The most common endgame. Rooks should be active — behind passed pawns (yours or enemy's).</p>
<ul>
  <li><strong>Lucena position:</strong> Winning procedure with rook and pawn vs rook</li>
  <li><strong>Philidor position:</strong> Drawing technique with rook vs rook and pawn</li>
  <li><strong>Back rank activity:</strong> Use the rook actively, not passively</li>
</ul>

<h3>Bishop Endings</h3>
<ul>
  <li>Same-color bishops: More drawish, pawns on opposite color to bishop are weak</li>
  <li>Opposite-color bishops: Very drawish even with extra pawns</li>
  <li>Wrong color bishop: A bishop that can't control the promotion square</li>
</ul>

<h3>Knight vs Bishop</h3>
<p>In closed positions with fixed pawns, knights often outperform bishops. In open positions, the bishop's long-range power shines.</p>

<h3>Queen Endings</h3>
<p>Complex but queen usually wins against pawns close to promotion. Key technique: Use the queen to slow the pawn while bringing the king over.</p>
`
  },
  {
    id: 'time-space',
    title: 'Time & Space',
    content: `
<h2>Time & Space</h2>
<p>Two of the three fundamental elements of chess (the third being material). Understanding tempo and space gives you a strategic framework.</p>

<h3>Tempo</h3>
<p>A "tempo" is one move. Gaining tempo means accomplishing something while forcing your opponent to react. Losing tempo means making unnecessary moves.</p>
<ul>
  <li>Developing with tempo (developing while attacking something)</li>
  <li>Avoiding moving the same piece twice</li>
  <li>Intermezzo moves that gain tempo</li>
</ul>
<div class="highlight-box">
  <strong>Example:</strong> 1.e4 e5 2.Nf3 — White develops and attacks e5 simultaneously. One move accomplishes two goals.
</div>

<h3>Space</h3>
<p>Space is the number of squares controlled or accessible to your pieces. More space = more mobility = more options.</p>
<ul>
  <li><strong>Space advantage:</strong> Your pieces are more active and have more options</li>
  <li><strong>Limited space:</strong> Your pieces become cramped and hard to coordinate</li>
  <li>Hypermodern openings deliberately cede space then counterattack</li>
</ul>

<h3>Hypermodern vs Classical</h3>
<ul>
  <li><strong>Classical:</strong> Occupy the center immediately with pawns (1.e4, 1.d4)</li>
  <li><strong>Hypermodern:</strong> Control the center from the flanks, invite opponent to build a center, then undermine it</li>
  <li>Examples of hypermodern: King's Indian, Grünfeld, Nimzo-Indian, Reti</li>
</ul>

<h3>The Reti Opening (1.Nf3)</h3>
<p>A hypermodern approach — White develops the knight and prepares to fianchetto, controlling d5 from a distance. Very flexible.</p>
<div class="highlight-box">
  Can transpose into English Opening, King's Indian Attack, Queen's Gambit, or many other systems.
</div>
`
  },
  {
    id: 'famous-games',
    title: 'Famous Openings in History',
    content: `
<h2>Famous Openings in History</h2>
<p>Learning about famous games and their openings is one of the best ways to understand why openings work and what ideas they contain.</p>

<h3>The Immortal Game (1851)</h3>
<p><strong>Anderssen vs Kieseritzky</strong> — King's Gambit</p>
<p>Adolf Anderssen sacrificed both rooks, a bishop, and his queen to deliver a spectacular checkmate. Demonstrated the power of initiative over material.</p>
<div class="highlight-box">
  Opening: <span class="move-notation">1.e4 e5 2.f4 exf4 3.Bc4</span> (Bishop's Gambit variation of King's Gambit)
</div>

<h3>The Opera Game (1858)</h3>
<p><strong>Morphy vs Allies</strong> — Philidor Defence</p>
<p>Paul Morphy showed the devastating effect of superior development. His opponents moved pawns while he developed all pieces, then delivered a brilliant combination.</p>
<div class="highlight-box">
  Lesson: Development and piece activity trump material in open positions.
</div>

<h3>Game of the Century (1956)</h3>
<p><strong>Byrne vs Fischer (13 years old!)</strong> — Grünfeld Defence</p>
<p>Bobby Fischer played a stunning queen sacrifice on move 17, leading to a beautiful finish. Announced his genius to the world.</p>
<div class="highlight-box">
  Opening: <span class="move-notation">1.Nf3 Nf6 2.c4 g6 3.Nc3 Bg7 4.d4 O-O 5.Bf4 d5 6.Qb3</span>
</div>

<h3>Deep Blue vs Kasparov, Game 2 (1997)</h3>
<p>The first time a computer defeated a world champion in a match. The Ruy Lopez Opening led to a stunning positional sacrifice by Deep Blue that Kasparov called one of the greatest moves ever played by a computer.</p>

<h3>Popularizers of Openings</h3>
<div class="opening-grid">
  <div class="opening-card"><strong>Bobby Fischer</strong><span>Poisoned Pawn Sicilian, Najdorf, Ruy Lopez</span></div>
  <div class="opening-card"><strong>Garry Kasparov</strong><span>King's Indian, Najdorf, Grünfeld</span></div>
  <div class="opening-card"><strong>Magnus Carlsen</strong><span>London System, 1.d4 systems, flexibility</span></div>
  <div class="opening-card"><strong>Anatoly Karpov</strong><span>Caro-Kann, Nimzo-Indian, Ruy Lopez</span></div>
  <div class="opening-card"><strong>Mikhail Tal</strong><span>King's Gambit, wild complications</span></div>
  <div class="opening-card"><strong>Paul Morphy</strong><strong></strong><span>Classical rapid development principles</span></div>
</div>
`
  },
  {
    id: 'openings-overview',
    title: 'Opening Categories',
    content: `
<h2>Opening Categories</h2>
<p>Chess openings are organized by ECO (Encyclopedia of Chess Openings) codes and can be grouped into categories based on White's first move.</p>

<h3>Open Games — 1.e4 e5</h3>
<p>Both sides open with e-pawn moves. Typically leads to open, tactical play with early piece activity.</p>
<div class="opening-grid">
  <div class="opening-card"><strong>Ruy López</strong><span>1.e4 e5 2.Nf3 Nc6 3.Bb5 — ECO C60</span></div>
  <div class="opening-card"><strong>Italian Game</strong><span>1.e4 e5 2.Nf3 Nc6 3.Bc4 — ECO C50</span></div>
  <div class="opening-card"><strong>Scotch Game</strong><span>1.e4 e5 2.Nf3 Nc6 3.d4 — ECO C44</span></div>
  <div class="opening-card"><strong>King's Gambit</strong><span>1.e4 e5 2.f4 — ECO C30</span></div>
  <div class="opening-card"><strong>Petrov's Defence</strong><span>1.e4 e5 2.Nf3 Nf6 — ECO C42</span></div>
  <div class="opening-card"><strong>Four Knights</strong><span>1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 — ECO C46</span></div>
</div>

<h3>Semi-Open Games — 1.e4</h3>
<p>Black responds to 1.e4 without 1...e5, creating asymmetrical positions.</p>
<div class="opening-grid">
  <div class="opening-card"><strong>Sicilian Defence</strong><span>1.e4 c5 — ECO B20 (most popular!)</span></div>
  <div class="opening-card"><strong>French Defence</strong><span>1.e4 e6 — ECO C00</span></div>
  <div class="opening-card"><strong>Caro-Kann</strong><span>1.e4 c6 — ECO B10</span></div>
  <div class="opening-card"><strong>Pirc Defence</strong><span>1.e4 d6 — ECO B07</span></div>
  <div class="opening-card"><strong>Scandinavian</strong><span>1.e4 d5 — ECO B01</span></div>
  <div class="opening-card"><strong>Alekhine's Defence</strong><span>1.e4 Nf6 — ECO B02</span></div>
</div>

<h3>Closed Games — 1.d4 d5</h3>
<p>Typically more strategic, positional play. Centers are often closed or semi-closed.</p>
<div class="opening-grid">
  <div class="opening-card"><strong>Queen's Gambit</strong><span>1.d4 d5 2.c4 — ECO D06</span></div>
  <div class="opening-card"><strong>London System</strong><span>1.d4 2.Nf3 3.Bf4 — ECO D02</span></div>
  <div class="opening-card"><strong>Catalan</strong><span>1.d4 Nf6 2.c4 e6 3.g3 — ECO E00</span></div>
  <div class="opening-card"><strong>Colle System</strong><span>1.d4 2.Nf3 3.e3 — ECO D05</span></div>
</div>

<h3>Indian Defences — 1.d4 Nf6</h3>
<p>Hypermodern systems where Black controls the center from the flanks.</p>
<div class="opening-grid">
  <div class="opening-card"><strong>King's Indian</strong><span>1.d4 Nf6 2.c4 g6 — ECO E60</span></div>
  <div class="opening-card"><strong>Nimzo-Indian</strong><span>1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 — ECO E20</span></div>
  <div class="opening-card"><strong>Grünfeld</strong><span>1.d4 Nf6 2.c4 g6 3.Nc3 d5 — ECO D70</span></div>
  <div class="opening-card"><strong>Bogo-Indian</strong><span>1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ — ECO E11</span></div>
  <div class="opening-card"><strong>Queen's Indian</strong><span>1.d4 Nf6 2.c4 e6 3.Nf3 b6 — ECO E12</span></div>
  <div class="opening-card"><strong>Dutch Defence</strong><span>1.d4 f5 — ECO A80</span></div>
</div>

<h3>Flank Openings</h3>
<div class="opening-grid">
  <div class="opening-card"><strong>English Opening</strong><span>1.c4 — ECO A10</span></div>
  <div class="opening-card"><strong>Reti Opening</strong><span>1.Nf3 — ECO A04</span></div>
  <div class="opening-card"><strong>Bird's Opening</strong><span>1.f4 — ECO A02</span></div>
  <div class="opening-card"><strong>Larsen's Opening</strong><span>1.b3 — ECO A01</span></div>
</div>
`
  }
];

const THEORY_MAP = {};
for (const t of THEORY_TOPICS) THEORY_MAP[t.id] = t;
