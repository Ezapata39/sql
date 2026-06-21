/**
 * Chess openings database with moves, names, and descriptions.
 * Moves are in SAN notation.
 */
const OPENINGS = [
  {
    id: 'ruy-lopez',
    name: "Ruy López (Spanish Game)",
    category: 'Open Games (1.e4 e5)',
    color: 'white',
    moves: ['e4','e5','Nf3','Nc6','Bb5'],
    description: "One of the oldest and most respected openings. White develops the bishop to b5, putting pressure on Black's e5-supporting knight. Named after 16th-century Spanish priest Ruy López de Segura.",
    ideas: "White aims for central control, rapid development, and long-term positional pressure. The bishop on b5 threatens to win the e5 pawn by eliminating its defender.",
    mainLine: "After 3...a6 (Morphy Defence), White typically retreats the bishop. The Berlin Defence (3...Nf6) is also extremely popular at the highest level.",
    eco: 'C60-C99'
  },
  {
    id: 'italian',
    name: "Italian Game",
    category: 'Open Games (1.e4 e5)',
    color: 'white',
    moves: ['e4','e5','Nf3','Nc6','Bc4'],
    description: "A classic and straightforward opening. White places the bishop on c4, targeting the f7 pawn — the weakest point in Black's position. Very popular at club level and in computer games.",
    ideas: "Fast piece development, quick kingside castling. The bishop on c4 can be very aggressive and sets up tactical threats.",
    mainLine: "After 3...Bc5 we reach the Giuoco Piano. 3...Nf6 leads to the Two Knights Defence, where complications can arise.",
    eco: 'C50-C59'
  },
  {
    id: 'sicilian',
    name: "Sicilian Defence",
    category: 'Semi-Open Games (1.e4)',
    color: 'black',
    moves: ['e4','c5'],
    description: "The most popular reply to 1.e4. Black immediately fights for central space without mirroring White's move. Creates asymmetrical positions full of dynamic play.",
    ideas: "Black gets a half-open c-file and imbalanced position. Black often counterattacks on the queenside while White attacks the kingside.",
    mainLine: "Major variations: Najdorf (2...d6 3...a6), Dragon (2...d6 3...g6), Scheveningen (2...d6 3...e6), Classical (2...Nc6).",
    eco: 'B20-B99'
  },
  {
    id: 'sicilian-najdorf',
    name: "Sicilian Najdorf",
    category: 'Semi-Open Games (1.e4)',
    color: 'black',
    moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6'],
    description: "The most popular variation of the Sicilian, beloved by Fischer and Kasparov. Black's 5...a6 prepares ...e5 and queenside expansion while preventing Nb5.",
    ideas: "Extremely dynamic. Black creates counterplay while White typically launches a kingside attack. One of the most deeply analyzed openings in chess.",
    mainLine: "White's main responses: 6.Bg5 (English Attack), 6.Be3 (English Attack), 6.Be2 (Classical), 6.f4 (Fischer-Sozin).",
    eco: 'B90-B99'
  },
  {
    id: 'french',
    name: "French Defence",
    category: 'Semi-Open Games (1.e4)',
    color: 'black',
    moves: ['e4','e6','d4','d5'],
    description: "A solid, strategic defence. Black challenges White's center immediately with ...d5 after establishing ...e6. Creates a very solid but initially cramped position.",
    ideas: "Black's position is solid but the c8-bishop can be difficult to activate. Black counterattacks with ...c5 to strike at the center.",
    mainLine: "Main variations: Winawer (3.Nc3 Bb4), Classical (3.Nc3 Nf6), Advance (3.e5), Exchange (3.exd5).",
    eco: 'C00-C19'
  },
  {
    id: 'caro-kann',
    name: "Caro-Kann Defence",
    category: 'Semi-Open Games (1.e4)',
    color: 'black',
    moves: ['e4','c6','d4','d5'],
    description: "A solid reply to 1.e4, preparing ...d5 with pawn support. Less committal than the French as the c8-bishop remains free. Favored by Petrosian, Karpov, and Short.",
    ideas: "Solid structure with good endgame prospects. Black avoids the passive bishop problem of the French while maintaining solidity.",
    mainLine: "Main lines: Classical (3.Nc3 dxe4 4.Nxe4), Advance (3.e5), Fantasy (3.f3), Exchange (3.exd5).",
    eco: 'B10-B19'
  },
  {
    id: 'queens-gambit',
    name: "Queen's Gambit",
    category: 'Closed Games (1.d4)',
    color: 'white',
    moves: ['d4','d5','c4'],
    description: "One of the oldest openings. White offers the c4 pawn to gain central control. A 'gambit' in name only — if Black takes it, White easily regains the pawn with superior center.",
    ideas: "Control the center with pawns and pieces. If accepted (QGA), White gets rapid development. If declined (QGD), solid positional play ensues.",
    mainLine: "QGD main line: 3...e6. QGA: 3...dxc4. Also: Slav Defence (3...c6), Semi-Slav (3...c6 4.Nc3 e6).",
    eco: 'D06-D69'
  },
  {
    id: 'kings-indian',
    name: "King's Indian Defence",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O'],
    description: "A hyper-modern defence where Black allows White to build a big center, then counterattacks it. Beloved by Fischer, Kasparov, and many attacking players.",
    ideas: "Black fianchettoes the kingside bishop and later plays ...e5 to challenge White's center. Extremely dynamic and double-edged.",
    mainLine: "Main lines: Classical (6.Be2), Sämisch (6.f3), Four Pawns Attack (6.f4), Averbakh (6.Be3).",
    eco: 'E60-E99'
  },
  {
    id: 'nimzo-indian',
    name: "Nimzo-Indian Defence",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','Nf6','c4','e6','Nc3','Bb4'],
    description: "Black immediately pins White's c3-knight with the bishop, preventing e4. Highly strategic and considered one of the most reliable defences to 1.d4.",
    ideas: "Black disrupts White's pawn center plans. By pinning the knight, Black prevents e2-e4. Often leads to doubled pawns after ...Bxc3.",
    mainLine: "Main lines: Rubinstein (4.e3), Classical (4.Qc2), Sämisch (4.a3), Leningrad (4.Bg5).",
    eco: 'E20-E59'
  },
  {
    id: 'london',
    name: "London System",
    category: 'Closed Games (1.d4)',
    color: 'white',
    moves: ['d4','d5','Nf3','Nf6','Bf4','e6','e3'],
    description: "A solid, reliable system for White. The bishop develops to f4 early, creating a stable setup. Very popular at club level and increasingly at top level.",
    ideas: "White builds a solid pyramid of pawns and pieces. The Bf4 is safe and well-placed. Easy to learn, hard to beat.",
    mainLine: "White typically follows with Bd3, c3, Nbd2, and O-O for a very solid setup that works against most Black setups.",
    eco: 'D02'
  },
  {
    id: 'english',
    name: "English Opening",
    category: 'Flank Openings',
    color: 'white',
    moves: ['c4'],
    description: "A flexible hypermodern opening. White controls the center from the flank with the c-pawn. Can transpose into many other openings.",
    ideas: "Flexibility. White avoids 1.d4 or 1.e4 theory while maintaining good options. Can become a reversed Sicilian, King's Indian Attack, etc.",
    mainLine: "Very complex depending on Black's response. 1...e5 leads to reversed Sicilian positions. 1...c5 enters a symmetrical variation.",
    eco: 'A10-A39'
  },
  {
    id: 'catalan',
    name: "Catalan Opening",
    category: 'Closed Games (1.d4)',
    color: 'white',
    moves: ['d4','Nf6','c4','e6','g3','d5','Bg2','Be7','Nf3','O-O','O-O'],
    description: "A strategic opening combining the Queen's Gambit with a kingside fianchetto. Puts long-term pressure on the d5 pawn and queenside.",
    ideas: "The Bg2 exerts long-term pressure along the a8-h1 diagonal. The Catalan bishop is a powerful long-term weapon.",
    mainLine: "Open Catalan (4...dxc4) and Closed Catalan (4...d5) are the main branches.",
    eco: 'E00-E09'
  },
  {
    id: 'pirates-defence',
    name: "Pirc Defence",
    category: 'Semi-Open Games (1.e4)',
    color: 'black',
    moves: ['e4','d6','d4','Nf6','Nc3','g6'],
    description: "A hypermodern defence allowing White to build a big center, then undermining it. Flexible and can lead to rich positions.",
    ideas: "Black fianchettoes the kingside bishop and waits to counterattack White's center. Similar strategy to King's Indian.",
    mainLine: "Main lines: Austrian Attack (4.f4), Classical (4.Nf3), 150 Attack (4.Be3). White can choose aggressive or positional approaches.",
    eco: 'B07-B09'
  },
  {
    id: 'petroff',
    name: "Petrov's Defence",
    category: 'Open Games (1.e4 e5)',
    color: 'black',
    moves: ['e4','e5','Nf3','Nf6'],
    description: "An extremely solid defence where Black immediately counterattacks. Very popular at the top level for its reliability and drawing tendency.",
    ideas: "Black counterattacks immediately rather than defending. Leads to symmetrical, often simplified positions that are hard for White to win.",
    mainLine: "After 3.Nxe5 d6 4.Nf3 Nxe4 we reach the Classical Petrov. Very well-analyzed and theoretically well-understood.",
    eco: 'C42-C43'
  },
  {
    id: 'queens-gambit-accepted',
    name: "Queen's Gambit Accepted",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','d5','c4','dxc4','Nf3','Nf6','e3','e6','Bxc4','c5'],
    description: "Black accepts the gambit pawn! White regains it easily but Black gets free development in return.",
    ideas: "Black accepts temporarily ceding the center for rapid development. White typically recaptures on c4 and builds a strong center.",
    mainLine: "After 4.e3 e6 5.Bxc4, White has a strong center and bishop pair. Black must counterplay with ...c5 quickly.",
    eco: 'D20-D29'
  },
  {
    id: 'scotch',
    name: "Scotch Game",
    category: 'Open Games (1.e4 e5)',
    color: 'white',
    moves: ['e4','e5','Nf3','Nc6','d4','exd4','Nxd4'],
    description: "An aggressive approach where White immediately opens the center with d4. Very popular at the top level, favored by Kasparov.",
    ideas: "White opens the position immediately and fights for center control. Can lead to very sharp tactical play.",
    mainLine: "After 4.Nxd4, Black can play 4...Nf6 (Schmidt), 4...Bc5 (Classical), or 4...Qh4 (Haxo Gambit).",
    eco: 'C44-C45'
  },
  {
    id: 'dutch',
    name: "Dutch Defence",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','f5'],
    description: "An aggressive and ambitious reply to 1.d4. Black immediately fights for e4 control and prepares kingside play.",
    ideas: "Black stakes a claim on the kingside. The f-pawn controls e4 but weakens the kingside slightly. Very unbalancing.",
    mainLine: "Main variations: Stonewall (with ...d5 ...e6 ...c6), Classical/Ilyin-Zhenevsky, Leningrad (with ...g6 ...Bg7).",
    eco: 'A80-A99'
  },
  {
    id: 'kings-gambit',
    name: "King's Gambit",
    category: 'Open Games (1.e4 e5)',
    color: 'white',
    moves: ['e4','e5','f4'],
    description: "One of the oldest and most romantic gambits. White sacrifices a pawn for rapid development and a strong center. Very attacking.",
    ideas: "White offers the f4 pawn to open the f-file and gain attacking chances. After ...exf4, White plays d4 with a strong center.",
    mainLine: "If 2...exf4 (King's Gambit Accepted): 3.Nf3 preventing ...Qh4+. If 2...d5 (Falkbeer Counter-Gambit) Black fights back.",
    eco: 'C30-C39'
  },
  {
    id: 'grunfeld',
    name: "Grünfeld Defence",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','Nf6','c4','g6','Nc3','d5'],
    description: "A hypermodern defence where Black allows White a powerful center, then immediately attacks it with ...d5. Favored by Fischer and Kasparov.",
    ideas: "Black temporarily allows White's center then counterattacks with ...d5 and later ...c5. The Bg7 becomes a powerful attacking weapon.",
    mainLine: "After 4.cxd5 Nxd5 5.e4, White has a classical center. Main lines: Exchange (5.Nxd5), Russian System (5.Qb3), Classical.",
    eco: 'D70-D99'
  },
  {
    id: 'four-knights',
    name: "Four Knights Game",
    category: 'Open Games (1.e4 e5)',
    color: 'white',
    moves: ['e4','e5','Nf3','Nc6','Nc3','Nf6'],
    description: "A classical and symmetrical opening where both sides develop their knights first. Solid and principled.",
    ideas: "Both sides develop rapidly and symmetrically. White can enter sharp lines or maintain solid development.",
    mainLine: "Spanish Four Knights (4.Bb5), Scotch Four Knights (4.d4), Italian Four Knights (4.Bc4).",
    eco: 'C46-C49'
  },
  {
    id: 'bogo-indian',
    name: "Bogo-Indian Defence",
    category: 'Closed Games (1.d4)',
    color: 'black',
    moves: ['d4','Nf6','c4','e6','Nf3','Bb4+'],
    description: "Similar to Nimzo-Indian but avoids 3.Nc3. Black checks with the bishop, gaining a tempo or the bishop pair.",
    ideas: "Black checks with the bishop forcing White to block. After the exchange, Black gets the bishop pair. Solid and flexible.",
    mainLine: "White can block with 4.Bd2 or 4.Nbd2. The position is solid with chances for both sides.",
    eco: 'E11'
  }
];

// Build lookup by id
const OPENINGS_MAP = {};
for (const o of OPENINGS) OPENINGS_MAP[o.id] = o;
