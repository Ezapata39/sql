const OPENINGS = [
  // ── OPEN GAMES ──────────────────────────────────────────────────
  {
    id:'ruy-lopez', name:'Ruy López (Spanish Game)', category:'Open Games',
    eco:'C60', color:'white',
    moves:['e4','e5','Nf3','Nc6','Bb5'],
    description:'One of the oldest and most respected openings. The bishop pins Black\'s knight, indirectly pressuring the e5 pawn. Named after 16th-century Spanish priest Ruy López de Segura.',
    ideas:'Long-term pressure on e5, rapid development, strong center. White often plays c3 and d4 to build a classical center.',
    mainLine:'3...a6 Morphy Defence is most popular. 3...Nf6 Berlin is extremely solid at top level. After 4.Ba4 Nf6 5.O-O the Open (5...Nxe4) and Closed (5...Be7) arise.'
  },
  {
    id:'ruy-lopez-berlin', name:'Berlin Defence (Ruy López)', category:'Open Games',
    eco:'C65', color:'black',
    moves:['e4','e5','Nf3','Nc6','Bb5','Nf6','O-O','Nxe4','d4','Nd6','Bxc6','dxc6','dxe5','Nf5'],
    description:'The "Berlin Wall" — extremely solid and drawish. Favoured by Kramnik to defeat Kasparov in the 2000 World Championship match.',
    ideas:'Black gives up the bishop pair but gets solid doubled pawns and a rock-solid structure. In the endgame Black holds easily.',
    mainLine:'After 7.Re1 Nc5 8.Nxe5 Nxe5 9.d4 White regains the pawn with a slight endgame advantage that is hard to convert.'
  },
  {
    id:'italian', name:'Italian Game', category:'Open Games',
    eco:'C50', color:'white',
    moves:['e4','e5','Nf3','Nc6','Bc4'],
    description:'Classic opening targeting the f7 square. The bishop on c4 is active and creates immediate tactical threats. Extremely popular at all levels.',
    ideas:'Fast development, kingside attack potential. After castling, White can play d3 or d4 depending on the variation.',
    mainLine:'3...Bc5 = Giuoco Piano. 3...Nf6 = Two Knights. Main Giuoco line: 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb4+ 7.Nc3.'
  },
  {
    id:'giuoco-piano', name:'Giuoco Piano', category:'Open Games',
    eco:'C54', color:'white',
    moves:['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d4','exd4','cxd4','Bb4+','Nc3','Nxe4','O-O'],
    description:'The "Quiet Game" that becomes anything but quiet. One of the oldest openings, with roots in the 16th century.',
    ideas:'White builds a strong center with c3+d4 while Black counterattacks immediately. Very dynamic and tactical.',
    mainLine:'After 8.Nc3 Nxe4 9.O-O Bxc3 10.d5 we get sharp tactical play. The Moeller Attack (5.O-O) is another key line.'
  },
  {
    id:'scotch', name:'Scotch Game', category:'Open Games',
    eco:'C45', color:'white',
    moves:['e4','e5','Nf3','Nc6','d4','exd4','Nxd4'],
    description:'White opens the center immediately with 3.d4. Popularised by Kasparov. Very active and leads to open play.',
    ideas:'Control the center, get active pieces. After 4.Nxd4, the position is already unbalanced.',
    mainLine:'4...Nf6 (Schmidt), 4...Bc5 (Classical), 4...Qh4 (Haxo). Classical: 5.Nb3 Bb6 6.Nc3 is the main line.'
  },
  {
    id:'kings-gambit', name:"King's Gambit", category:'Open Games',
    eco:'C30', color:'white',
    moves:['e4','e5','f4'],
    description:'One of the oldest and most romantic openings. White offers a pawn for rapid development and attacking play. The gambit of the romantic era.',
    ideas:'Open the f-file after exf4. Play d4 with a huge center. Attack the kingside with Nf3, Bc4, and rook to f1.',
    mainLine:'2...exf4 (Accepted): 3.Nf3 g5 4.h4 g4 5.Ne5 (Kieseritzky). 2...d5 (Falkbeer Counter-Gambit). 2...Bc5 (Classical).'
  },
  {
    id:'kings-gambit-accepted', name:"King's Gambit Accepted", category:'Open Games',
    eco:'C34', color:'white',
    moves:['e4','e5','f4','exf4','Nf3','g5','h4','g4','Ne5'],
    description:'The sharpest line of the King\'s Gambit. Black tries to hold the pawn with g5, White attacks immediately.',
    ideas:'White sacrifices the knight with Ne5-d3 and attacks. Incredibly sharp tactical chess.',
    mainLine:'5...Nf6 6.Nxg4 Nxe4 7.d3 or 5...d6 6.Nxg4 Nf6 7.Nxf6+ Qxf6 8.Nc3 with compensation.'
  },
  {
    id:'petroff', name:"Petrov's Defence", category:'Open Games',
    eco:'C42', color:'black',
    moves:['e4','e5','Nf3','Nf6'],
    description:'Extremely solid counterattack. Beloved at top level for its reliability. Not exciting but very hard to beat.',
    ideas:'Black counterattacks immediately. After 3.Nxe5 d6 4.Nf3 Nxe4 we reach a symmetrical but unbalanced position.',
    mainLine:'Classical: 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 6.Bd3 Nc6 7.O-O Be7 very solid. Steinitz: 3.d4 Nxe4 4.Bd3.'
  },
  {
    id:'four-knights', name:'Four Knights Game', category:'Open Games',
    eco:'C47', color:'white',
    moves:['e4','e5','Nf3','Nc6','Nc3','Nf6'],
    description:'Classical opening where both sides develop all four knights early. Principled and solid.',
    ideas:'Both sides develop rapidly. White can choose Spanish, Italian, or Scotch paths.',
    mainLine:'4.Bb5 (Spanish Four Knights), 4.d4 (Scotch Four Knights), 4.Bc4 (Italian Four Knights).'
  },
  {
    id:'vienna', name:'Vienna Game', category:'Open Games',
    eco:'C25', color:'white',
    moves:['e4','e5','Nc3'],
    description:'A flexible opening that supports the e4 pawn and prepares f4 (Vienna Gambit) or Bc4. Less forcing than 2.Nf3 so White retains more options.',
    ideas:'Flexible: White can play f4 (gambit), Bc4 (positional), or Nf3 later. Avoids the heavily-analysed Berlin and Petroff.',
    mainLine:'2...Nf6 (modern main line), 2...Nc6 (symmetrical), 2...Bc5 (classical). After 2...Nf6 3.f4 d5 4.fxe5 Nxe4 is very sharp.'
  },
  {
    id:'vienna-gambit', name:'Vienna Gambit', category:'Open Games',
    eco:'C29', color:'white',
    moves:['e4','e5','Nc3','Nf6','f4','d5','fxe5','Nxe4','Nf3','Bc5','d4','Nxc3','bxc3','Bb6'],
    description:'White plays f4 in the Vienna, creating a King\'s Gambit-like position but with the knight already on c3.',
    ideas:'Open f-file, aggressive attack. After 3.f4 d5 the position is razor-sharp and both sides must know the theory.',
    mainLine:'4.fxe5 Nxe4 5.Nf3 Bc5 6.d4 Nxc3 7.bxc3 Bb6 8.Bd3 and White has strong centre and initiative.'
  },
  {
    id:'vienna-meitner', name:"Vienna — Meitner-Mieses Gambit", category:'Open Games',
    eco:'C27', color:'white',
    moves:['e4','e5','Nc3','Nf6','Bc4','Nxe4','Qh5'],
    description:'Extremely aggressive. White plays Bc4 then Qh5 after the knight captures, threatening Qxf7# immediately.',
    ideas:'Quick attack on f7. Black must be careful — a single mistake can be fatal. Often used as a surprise weapon.',
    mainLine:"3...Nxe4?! 4.Qh5! Nd6 5.Bb3 Nc6 6.Nb5 g6 7.Qf3 f5 8.Qd5 Qe7 9.Nxc7+ Kd8 10.Nxa8. Black's best is probably 3...Bc5."
  },

  // ── SEMI-OPEN GAMES ──────────────────────────────────────────────
  {
    id:'sicilian', name:'Sicilian Defence', category:'Semi-Open Games',
    eco:'B20', color:'black',
    moves:['e4','c5'],
    description:'The most popular reply to 1.e4 at all levels. Asymmetrical position with rich middlegame play. Black fights for the center without mirroring.',
    ideas:'Half-open c-file for Black. Queenside counterplay vs White\'s kingside attack. Most deeply analysed opening in chess.',
    mainLine:'2.Nf3 then: 2...d6 (Najdorf/Dragon), 2...Nc6 (Classical), 2...e6 (Scheveningen/Kan), 2...g6 (Accelerated Dragon).'
  },
  {
    id:'sicilian-najdorf', name:'Sicilian Najdorf', category:'Semi-Open Games',
    eco:'B96', color:'black',
    moves:['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6'],
    description:"The most popular chess opening at the top level. Played by Fischer and Kasparov. Black's a6 prepares queenside expansion and prevents Nb5.",
    ideas:'Dynamic counterplay. White usually attacks kingside, Black counterattacks queenside. Extremely rich and deep theory.',
    mainLine:'6.Bg5 (English Attack), 6.Be3 (Scheveningen-style), 6.Be2 (Classical), 6.f4 (Fischer-Sozin), 6.Bc4 (Sozin).'
  },
  {
    id:'sicilian-dragon', name:'Sicilian Dragon', category:'Semi-Open Games',
    eco:'B70', color:'black',
    moves:['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','g6','Be3','Bg7','f3','O-O','Qd2','Nc6','Bc4','Bd7','O-O-O'],
    description:"Named after the dragon-like pawn formation. Black fianchettoes the bishop creating a powerful diagonal. One of chess's most explosive openings.",
    ideas:'The Dragon bishop on g7 is enormously powerful. Black attacks on the queenside, White attacks with h4-h5 on the kingside. Race attacks.',
    mainLine:'Yugoslav Attack (Be3,f3,Qd2,Bc4,O-O-O) is the main challenge. White plays h4-h5, Black plays ...Rb8, ...b5, ...b4.'
  },
  {
    id:'sicilian-scheveningen', name:'Sicilian Scheveningen', category:'Semi-Open Games',
    eco:'B80', color:'black',
    moves:['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','e6'],
    description:'Solid Sicilian with pawns on d6 and e6. More restrained than the Najdorf or Dragon. Very flexible and solid.',
    ideas:'Black keeps a solid structure. The d6+e6 pawn duo forms a solid wall. Black can later play ...a6, ...Qc7, ...Be7.',
    mainLine:'6.Be2 (Classical), 6.g4 (Keres Attack — very sharp!), 6.f4 (English Attack), 6.Be3 (Flexible).'
  },
  {
    id:'french', name:'French Defence', category:'Semi-Open Games',
    eco:'C00', color:'black',
    moves:['e4','e6','d4','d5'],
    description:'Solid, strategic defence. Black challenges the center immediately with ...d5. Solid but initially cramped position.',
    ideas:'Very solid structure. The c8-bishop can be problematic (French bishop). Black counterattacks with ...c5.',
    mainLine:'3.Nc3 (Winawer/Classical), 3.Nd2 (Tarrasch), 3.e5 (Advance), 3.exd5 (Exchange). Winawer: 3...Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3.'
  },
  {
    id:'french-advance', name:'French Advance', category:'Semi-Open Games',
    eco:'C02', color:'white',
    moves:['e4','e6','d4','d5','e5','c5','c3','Nc6','Nf3','Qb6'],
    description:'White closes the center with e5, gaining space. Leads to very specific strategic positions that both sides must understand well.',
    ideas:'White keeps a space advantage with e5. Black attacks the center with ...c5 and ...Qb6 targeting d4.',
    mainLine:'6.a3 (Milner-Barry Gambit line), 6.Bd3 (solid), 6.Be2 (flexible). After 6.a3 Nge7 7.b4 cxd4 8.cxd4 is very sharp.'
  },
  {
    id:'caro-kann', name:'Caro-Kann Defence', category:'Semi-Open Games',
    eco:'B10', color:'black',
    moves:['e4','c6','d4','d5'],
    description:'Solid reply to 1.e4. Prepares ...d5 with c6 support. Black avoids the passive bishop problem of the French.',
    ideas:'Very solid structure, good endgame prospects. Black keeps the c8-bishop active unlike in the French.',
    mainLine:'3.Nc3 dxe4 4.Nxe4 (Classical), 3.e5 (Advance), 3.exd5 cxd5 (Exchange). Classical: 4...Bf5 5.Ng3 Bg6 6.h4 h6 7.Nf3.'
  },
  {
    id:'scandinavian', name:'Scandinavian Defence', category:'Semi-Open Games',
    eco:'B01', color:'black',
    moves:['e4','d5','exd5','Qxd5','Nc3','Qa5'],
    description:'Black immediately counterattacks with 1...d5. After the capture, the queen comes out early (1...Qxd5) or a gambit is played (1...Nf6).',
    ideas:'Immediate central counterplay. Black accepts the queen moving twice in the opening in exchange for solid development.',
    mainLine:'2.exd5 Qxd5 3.Nc3 Qa5 (main) or 3...Qd6. After 3...Qa5 4.d4 Nf6 5.Nf3 Bf5 6.Bd2 is solid for Black.'
  },
  {
    id:'pirc', name:'Pirc Defence', category:'Semi-Open Games',
    eco:'B07', color:'black',
    moves:['e4','d6','d4','Nf6','Nc3','g6'],
    description:'Hypermodern — Black allows White to build a big center then undermines it. Flexible and rich in counterplay.',
    ideas:'Black fianchettoes and waits to counterattack. The Bg7 will put pressure on the center and queenside.',
    mainLine:'4.f4 (Austrian Attack — very aggressive), 4.Be3 (Classical), 4.Nf3 Bg7 5.Be2 (150 Attack with Be3).'
  },
  {
    id:'alekhine', name:"Alekhine's Defence", category:'Semi-Open Games',
    eco:'B02', color:'black',
    moves:['e4','Nf6'],
    description:'Provocative! Black invites White to chase the knight around the board, hoping the pawns become overextended.',
    ideas:'Black provokes White to overextend with pawns (Four Pawns Attack) or plays quietly. Then attacks the center.',
    mainLine:'2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4 (Four Pawns Attack) or 4.Nf3 (Modern Variation).'
  },

  // ── CLOSED GAMES ─────────────────────────────────────────────────
  {
    id:'queens-gambit', name:"Queen's Gambit", category:'Closed Games',
    eco:'D06', color:'white',
    moves:['d4','d5','c4'],
    description:"One of the oldest openings. White offers the c-pawn to gain central control. A 'gambit' in name only.",
    ideas:'Control the center. If accepted, White regains easily. If declined, positional battle for the center.',
    mainLine:'3...dxc4 (QGA), 3...e6 (QGD), 3...c6 (Slav), 3...c6+e6 (Semi-Slav). QGD main: 4.Nc3 Be7 5.Bf4 Nf6 6.e3.'
  },
  {
    id:'qgd', name:"Queen's Gambit Declined", category:'Closed Games',
    eco:'D50', color:'black',
    moves:['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3','O-O','Nf3','h6','Bh4','b6'],
    description:'Solid and classical. Black declines the gambit and builds a solid center. Very popular at all levels.',
    ideas:'Solid structure. Black aims to equalise then outplay in the endgame. The "Orthodox" QGD is a reliable workhorse.',
    mainLine:'After 7.Bxf6 (exchange) or 7.Nf3 (keeping tension). Exchange: 7...Bxf6 8.cxd5 exd5 9.Bd3 0-0 minority attack.'
  },
  {
    id:'qga', name:"Queen's Gambit Accepted", category:'Closed Games',
    eco:'D20', color:'black',
    moves:['d4','d5','c4','dxc4','Nf3','Nf6','e3','e6','Bxc4','c5','O-O','a6'],
    description:'Black accepts the gambit pawn! White regains it but Black gets free development and a solid position.',
    ideas:'Black accepts temporary imbalance for active piece play. Must play ...c5 to counterattack the center quickly.',
    mainLine:'5.e3 e6 6.Bxc4 c5 7.O-O a6 8.Qe2 b5 9.Bb3 Bb7 10.Rd1 Nbd7 — the main tabiya.'
  },
  {
    id:'slav', name:'Slav Defence', category:'Closed Games',
    eco:'D10', color:'black',
    moves:['d4','d5','c4','c6'],
    description:'Very solid defence where Black supports d5 with c6. Keeps the c8-bishop outside the pawn chain (unlike QGD with ...e6).',
    ideas:'Solid central control. The bishop on c8 remains free. Black can develop normally without blocking pieces.',
    mainLine:'3.Nf3 Nf6 4.Nc3 dxc4 (main line accepting), 4...e6 (Semi-Slav), 4...a6 (Chebanenko). Exchange: 3.cxd5 cxd5 = equal.'
  },
  {
    id:'semi-slav', name:'Semi-Slav Defence', category:'Closed Games',
    eco:'D43', color:'black',
    moves:['d4','d5','c4','c6','Nc3','Nf6','Nf3','e6'],
    description:'Combines Slav and QGD — pawns on c6 and e6. Very solid and leads to the richest, most complex positions in chess.',
    ideas:'Incredibly complex. Black has the option of ...dxc4 or keeping the center. Many wildly different variations.',
    mainLine:'5.e3 (Meran: 5...Nbd7 6.Bd3 dxc4 7.Bxc4 b5), 5.Bg5 (Botvinnik/Moscow), Anti-Moscow: 5...h6 6.Bh4 dxc4.'
  },
  {
    id:'london', name:'London System', category:'Closed Games',
    eco:'D02', color:'white',
    moves:['d4','d5','Nf3','Nf6','Bf4','e6','e3','Bd6','Bg3','O-O','Nbd2','c5','c3'],
    description:'Solid, reliable system. White develops Bf4 early, creating a stable pyramid. Very popular at club level and increasingly at top level.',
    ideas:'Simple development scheme. Bf4 is well-placed. Easy to learn, very hard to dynamically break down.',
    mainLine:'White typically plays Bd3, Nbd2, O-O, c3 — a very solid setup that can be used against almost anything.'
  },
  {
    id:'kings-indian', name:"King's Indian Defence", category:'Closed Games',
    eco:'E62', color:'black',
    moves:['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O'],
    description:'Hypermodern masterpiece. Black allows White a big center then counterattacks violently. Favourite of Fischer and Kasparov.',
    ideas:'Kingside counterattack with ...e5, ...Nf4, ...f5. White attacks queenside. Very dynamic and complex.',
    mainLine:'Classical (6.Be2), Sämisch (6.f3), Four Pawns (6.f4), Averbakh (6.Be3), Mar del Plata (7.O-O e5 8.d5 Nc5 9.Nd2 a5).'
  },
  {
    id:'kings-indian-classical', name:"King's Indian — Classical", category:'Closed Games',
    eco:'E92', color:'black',
    moves:['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5','Ne7','Ne1','Nd7','Nd3','f5'],
    description:'The main line of the Classical King\'s Indian. Leads to the famous Mar del Plata race attacks.',
    ideas:'White attacks queenside (c4-c5, b4, a4), Black attacks kingside (f5-f4, g5, h5). Race to see who gets there first.',
    mainLine:'11.f3 f5 12.g4 (Kingside counter-thrust) or 11.Nd2 f5 12.exf5 gxf5 13.f4 (blocking) are main continuations.'
  },
  {
    id:'nimzo-indian', name:'Nimzo-Indian Defence', category:'Closed Games',
    eco:'E20', color:'black',
    moves:['d4','Nf6','c4','e6','Nc3','Bb4'],
    description:'Black immediately pins the c3-knight with the bishop. Highly strategic, considered one of the most reliable defences to 1.d4.',
    ideas:'Disrupt White\'s center plans. Pin prevents e4. Often leads to doubled pawns after ...Bxc3.',
    mainLine:'4.e3 (Rubinstein), 4.Qc2 (Classical), 4.a3 (Sämisch), 4.Bg5 (Leningrad). After 4.e3: 4...O-O 5.Bd3 d5 6.Nf3.'
  },
  {
    id:'queens-indian', name:"Queen's Indian Defence", category:'Closed Games',
    eco:'E12', color:'black',
    moves:['d4','Nf6','c4','e6','Nf3','b6'],
    description:'Hypermodern alternative to the Nimzo-Indian. Black fianchettoes the queenside bishop to control the center from a distance.',
    ideas:'The Bb7 controls the long diagonal. Black avoids doubled pawns (unlike Nimzo). Very solid and flexible.',
    mainLine:'4.a3 (preventing ...Bb4), 4.g3 (Fianchetto system), 4.Nc3 (transposing to Nimzo). After 4.g3: 4...Bb7 5.Bg2 Be7 6.O-O O-O.'
  },
  {
    id:'grunfeld', name:'Grünfeld Defence', category:'Closed Games',
    eco:'D85', color:'black',
    moves:['d4','Nf6','c4','g6','Nc3','d5'],
    description:'Hypermodern masterpiece. Black allows White a dominant center then immediately attacks it with ...d5. Favoured by Fischer and Kasparov.',
    ideas:'The Bg7 becomes a powerful weapon attacking d4. After ...dxc4 and ...c5, Black strikes at the center.',
    mainLine:'Exchange (4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7 7.Be3), Russian (5.Qb3), Classical (5.Nf3).'
  },
  {
    id:'dutch', name:'Dutch Defence', category:'Closed Games',
    eco:'A80', color:'black',
    moves:['d4','f5'],
    description:'Ambitious and aggressive. Black fights for e4 control and prepares kingside play. Very unbalancing.',
    ideas:'Control e4, prepare kingside attack. Slightly weakens the kingside but creates active counterplay.',
    mainLine:'Stonewall: 2.c4 Nf6 3.Nc3 e6 4.Nf3 c6 5.e3 d5 6.Bd3 Bd6. Classical/IZ: 3...g6 4.g3 Bg7. Leningrad: 3...g6 4.g3 Bg7 5.Bg2 d6.'
  },
  {
    id:'catalan', name:'Catalan Opening', category:'Closed Games',
    eco:'E00', color:'white',
    moves:['d4','Nf6','c4','e6','g3','d5','Bg2','Be7','Nf3','O-O','O-O'],
    description:'Strategic opening combining the Queen\'s Gambit with a kingside fianchetto. Long-term positional pressure.',
    ideas:'The Bg2 exerts long-term pressure on d5 and the a8-h1 diagonal. The Catalan bishop is a powerful long-term weapon.',
    mainLine:'Open (6...dxc4) and Closed (6...d5 maintained) are main branches. Open: 7.Qc2 a6 8.Qxc4 b5 9.Qc2.'
  },
  {
    id:'benko-gambit', name:'Benko Gambit', category:'Closed Games',
    eco:'A57', color:'black',
    moves:['d4','Nf6','c4','c5','d5','b5'],
    description:'Black sacrifices a pawn (or two) for long-term queenside pressure and open files. A practical weapon favoured by Benko and Kasprov in their youth.',
    ideas:'Black gets the half-open a and b files after bxc4 cxb5 a6. Long-term positional compensation.',
    mainLine:'4.cxb5 a6 5.bxa6 Bxa6 6.Nc3 d6 7.e4 Bxf1 8.Kxf1 g6 is the main line with very complex compensation.'
  },
  {
    id:'benoni', name:'Benoni Defence (Modern)', category:'Closed Games',
    eco:'A70', color:'black',
    moves:['d4','Nf6','c4','c5','d5','e6','Nc3','exd5','cxd5','d6','e4','g6','Nf3','Bg7'],
    description:'Dynamic and aggressive. Black accepts a backward d-pawn but gets active piece play and kingside chances.',
    ideas:'Black\'s bishop on g7 is powerful. Active counterplay with ...Bg4, ...Nbd7-e5, and eventually ...b5 breaks.',
    mainLine:'7.Bd3 (Classical), 7.Be2 (normal), 7.Nf3 (fianchetto). Main line: 7.Bd3 O-O 8.Nf3 Re8 9.O-O Nbd7 10.h3 Ne5.'
  },
  {
    id:'english', name:'English Opening', category:'Flank Openings',
    eco:'A10', color:'white',
    moves:['c4'],
    description:'Flexible hypermodern opening. Controls d5 from the flank. Can transpose into many systems.',
    ideas:'Flexibility above all. Can become reversed Sicilian, King\'s Indian Attack, Queen\'s Gambit reversed, etc.',
    mainLine:'1...e5 (reversed Sicilian), 1...c5 (symmetrical), 1...Nf6 2.Nc3 d5 (QGD reversed), 1...e6 (French setup).'
  },
  {
    id:'english-symmetrical', name:'English — Symmetrical', category:'Flank Openings',
    eco:'A30', color:'white',
    moves:['c4','c5','Nf3','Nf6','Nc3','Nc6','g3','g6','Bg2','Bg7','O-O','O-O','d4','cxd4','Nxd4'],
    description:'Both sides adopt mirror setups. White eventually breaks with d4 to fight for the center.',
    ideas:'Symmetrical positions that White breaks with d4. After the break, middlegame imbalances arise.',
    mainLine:'8...d5 9.cxd5 Nxd5 or 8...d6 9.d3 are main approaches for Black. Both lead to complex middlegames.'
  },
  {
    id:'reti', name:'Réti Opening', category:'Flank Openings',
    eco:'A04', color:'white',
    moves:['Nf3'],
    description:'Hypermodern flexibility. White develops the knight and prepares to control the center from the flanks with g3 and Bg2.',
    ideas:'Maximum flexibility. Can transpose into Catalan, King\'s Indian Attack, English, or QGD. Avoids theory.',
    mainLine:'1...d5 2.c4 (QGD reversed), 1...d5 2.g3 (KIA-style), 1...Nf6 2.c4 (English), 1...e5 2.Nxe5?? is a blunder!'
  },
  {
    id:'kings-indian-attack', name:"King's Indian Attack", category:'Flank Openings',
    eco:'A07', color:'white',
    moves:['Nf3','d5','g3','Nf6','Bg2','e6','O-O','Be7','d3','O-O','Nbd2'],
    description:'A system rather than an opening. White develops in KID formation and can use it against almost any Black setup.',
    ideas:'Very reliable. After f4 and e5, White gets a kingside attack. Works well against French, Sicilian, and QGD setups.',
    mainLine:'Against French: 1.e4 e6 2.d3 d5 3.Nd2 Nf6 4.Ngf3 Be7 5.g3 O-O 6.Bg2. Very solid positional approach.'
  },
  {
    id:'budapest', name:'Budapest Gambit', category:'Closed Games',
    eco:'A52', color:'black',
    moves:['d4','Nf6','c4','e5','dxe5','Ng4'],
    description:'Black offers a pawn for quick development and active piece play. A sharp surprise weapon against 1.d4.',
    ideas:'Active development after 3...Ng4. After 4.Nf3 the Fajarowicz (4...Ne6) or Alekhine (4...Bc5) give Black piece activity.',
    mainLine:'4.e3 Nxe5 5.Nf3 Nxf3+ 6.Qxf3 Qf6! (Fajarowicz) or 4.Nf3 Bc5 5.e3 Nc6 6.Nc3 d6 (Alekhine).'
  },
  {
    id:'trompowsky', name:'Trompowsky Attack', category:'Closed Games',
    eco:'A45', color:'white',
    moves:['d4','Nf6','Bg5'],
    description:'White immediately pins the knight with 2.Bg5 before Black can set up standard defences. A modern surprise weapon.',
    ideas:'Disrupt Black\'s normal development. After 2...Ne4 (main) White retreats or enters complications.',
    mainLine:'2...Ne4 3.Bf4 c5 4.d5 (Torre), 2...e6 3.e4 (aggressive), 2...d5 3.Bxf6 (exchange). Often leads to unique positions.'
  },
  {
    id:'birds', name:"Bird's Opening", category:'Flank Openings',
    eco:'A02', color:'white',
    moves:['f4'],
    description:"1.f4 — a flank opening controlling e5. Leads to reversed Dutch positions. Aggressive but slightly weakens the kingside.",
    ideas:'Control e5. If Black plays 1...e5 (From\'s Gambit), sharp gambit play. Otherwise slow strategic game on f-file.',
    mainLine:"1...d5 2.Nf3 Nf6 3.e3 (solid Dutch setup). 1...e5 2.fxe5?? loses, but 2.e4 (From's Gambit) is playable."
  },
  {
    id:'bogo-indian', name:'Bogo-Indian Defence', category:'Closed Games',
    eco:'E11', color:'black',
    moves:['d4','Nf6','c4','e6','Nf3','Bb4+'],
    description:'Similar to Nimzo-Indian but after 3.Nf3 instead of 3.Nc3. Black checks with the bishop to gain tempo or bishop pair.',
    ideas:'If White blocks with 4.Bd2, Black gets easy development. If 4.Nbd2, White avoids doubled pawns.',
    mainLine:'4.Bd2 Qe7 5.g3 Nc6 6.Bg2 Bxd2+ 7.Qxd2 d6 8.Nc3 e5 9.d5 Ne7 10.O-O O-O — solid for Black.'
  },
];

const OPENINGS_MAP = {};
for (const o of OPENINGS) OPENINGS_MAP[o.id] = o;
