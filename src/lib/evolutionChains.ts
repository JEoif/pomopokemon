import type { EvolutionChain } from '../types';

/**
 * Static evolution chain data for all Pokemon in our pools.
 * Includes French names and mega evolution IDs where applicable.
 *
 * Mega evolutions use the base Pokemon ID since PokeAPI stores mega
 * artwork at: /pokemon/other/official-artwork/{id}.png for megas
 * We'll use a special URL pattern for mega sprites.
 *
 * Note: Only Pokemon present in our rarity pools need chains here.
 * Pokemon not listed = single-stage (no evolution).
 */

// Helper to build chains concisely
function chain(
  baseId: number,
  stages: [number, string][],
  mega?: { id: number; nameFr: string }
): EvolutionChain {
  return {
    baseId,
    stages: stages.map(([id, nameFr]) => ({ id, nameFr })),
    megaFinalId: mega?.id,
    megaNameFr: mega?.nameFr,
  };
}

export const EVOLUTION_CHAINS: EvolutionChain[] = [
  // ===== GEN 1 STARTERS =====
  chain(1, [[1, 'Bulbizarre'], [2, 'Herbizarre'], [3, 'Florizarre']], { id: 3, nameFr: 'Mega-Florizarre' }),
  chain(4, [[4, 'Salameche'], [5, 'Reptincel'], [6, 'Dracaufeu']], { id: 6, nameFr: 'Mega-Dracaufeu' }),
  chain(7, [[7, 'Carapuce'], [8, 'Carabaffe'], [9, 'Tortank']], { id: 9, nameFr: 'Mega-Tortank' }),

  // ===== GEN 1 POKEMON =====
  chain(10, [[10, 'Chenipan'], [11, 'Chrysacier'], [12, 'Papilusion']]),
  chain(13, [[13, 'Aspicot'], [14, 'Coconfort'], [15, 'Dardargnan']], { id: 15, nameFr: 'Mega-Dardargnan' }),
  chain(16, [[16, 'Roucool'], [17, 'Roucoups'], [18, 'Roucarnage']], { id: 18, nameFr: 'Mega-Roucarnage' }),
  chain(19, [[19, 'Rattata'], [20, 'Rattatac']]),
  chain(23, [[23, 'Abo'], [24, 'Arbok']]),
  chain(27, [[27, 'Sabelette'], [28, 'Sablaireau']]),
  chain(35, [[35, 'Melofee'], [36, 'Melodelfe']]),
  chain(37, [[37, 'Goupix'], [38, 'Feunard']]),
  chain(39, [[39, 'Rondoudou'], [40, 'Grodoudou']]),
  chain(41, [[41, 'Nosferapti'], [42, 'Nosferalto'], [169, 'Nostenfer']]),
  chain(43, [[43, 'Mystherbe'], [44, 'Ortide'], [45, 'Rafflesia']]),
  chain(50, [[50, 'Taupiqueur'], [51, 'Triopikeur']]),
  chain(54, [[54, 'Psykokwak'], [55, 'Akwakwak']]),
  chain(58, [[58, 'Caninos'], [59, 'Arcanin']]),
  chain(60, [[60, 'Ptitard'], [61, 'Tetarte'], [62, 'Tartard']]),
  chain(63, [[63, 'Abra'], [64, 'Kadabra'], [65, 'Alakazam']], { id: 65, nameFr: 'Mega-Alakazam' }),
  chain(66, [[66, 'Machoc'], [67, 'Machopeur'], [68, 'Mackogneur']]),
  chain(69, [[69, 'Chetiflor'], [70, 'Boustiflor'], [71, 'Empiflor']]),
  chain(72, [[72, 'Tentacool'], [73, 'Tentacruel']]),
  chain(74, [[74, 'Racaillou'], [75, 'Gravalanch'], [76, 'Grolem']]),
  chain(77, [[77, 'Ponyta'], [78, 'Galopa']]),
  chain(79, [[79, 'Ramoloss'], [80, 'Flagadoss']]),
  chain(81, [[81, 'Magneti'], [82, 'Magneton'], [462, 'Magnezone']]),
  chain(92, [[92, 'Fantominus'], [93, 'Spectrum'], [94, 'Ectoplasma']], { id: 94, nameFr: 'Mega-Ectoplasma' }),
  chain(95, [[95, 'Onix'], [208, 'Steelix']], { id: 208, nameFr: 'Mega-Steelix' }),
  chain(100, [[100, 'Voltorbe'], [101, 'Electrode']]),
  chain(104, [[104, 'Osselait'], [105, 'Ossatueur']]),
  chain(111, [[111, 'Rhinocorne'], [112, 'Rhinoferos'], [464, 'Rhinastoc']]),
  chain(116, [[116, 'Hypotrempe'], [117, 'Hypocean'], [230, 'Hyporoi']]),
  chain(118, [[118, 'Poissirene'], [119, 'Poissoroy']]),
  chain(123, [[123, 'Insecateur'], [212, 'Cizayox']], { id: 212, nameFr: 'Mega-Cizayox' }),
  chain(129, [[129, 'Magicarpe'], [130, 'Leviator']], { id: 130, nameFr: 'Mega-Leviator' }),
  chain(133, [[133, 'Evoli'], [134, 'Aquali']]), // Eevee has multiple, simplified
  chain(137, [[137, 'Porygon'], [233, 'Porygon2'], [474, 'Porygon-Z']]),
  chain(138, [[138, 'Amonita'], [139, 'Amonistar']]),
  chain(140, [[140, 'Kabuto'], [141, 'Kabutops']]),
  chain(142, [[142, 'Ptera']], { id: 142, nameFr: 'Mega-Ptera' }),
  chain(147, [[147, 'Minidraco'], [148, 'Draco'], [149, 'Dracolosse']]),

  // ===== GEN 2 =====
  chain(152, [[152, 'Germignon'], [153, 'Macronium'], [154, 'Meganium']]),
  chain(155, [[155, 'Hericendre'], [156, 'Feurisson'], [157, 'Typhlosion']]),
  chain(158, [[158, 'Kaiminus'], [159, 'Crocrodil'], [160, 'Aligatueur']]),
  chain(161, [[161, 'Fouinette'], [162, 'Fouinar']]),
  chain(163, [[163, 'Hoothoot'], [164, 'Noarfang']]),
  chain(165, [[165, 'Coxy'], [166, 'Coxyclaque']]),
  chain(167, [[167, 'Mimigal'], [168, 'Migalos']]),
  chain(170, [[170, 'Loupio'], [171, 'Lanturn']]),
  chain(172, [[172, 'Pichu'], [25, 'Pikachu'], [26, 'Raichu']]),
  chain(174, [[174, 'Toudoudou'], [39, 'Rondoudou'], [40, 'Grodoudou']]),
  chain(175, [[175, 'Togepi'], [176, 'Togetic'], [468, 'Togekiss']]),
  chain(179, [[179, 'Wattouat'], [180, 'Lainergie'], [181, 'Pharamp']], { id: 181, nameFr: 'Mega-Pharamp' }),
  chain(183, [[183, 'Marill'], [184, 'Azumarill']]),
  chain(187, [[187, 'Granivol'], [188, 'Floravol'], [189, 'Cotovol']]),
  chain(191, [[191, 'Tournegrin'], [192, 'Heliatronc']]),
  chain(194, [[194, 'Axoloto'], [195, 'Maraiste']]),
  chain(198, [[198, 'Cornetre'], [430, 'Corboss']]),
  chain(207, [[207, 'Scorplane'], [472, 'Scorvol']]),
  chain(209, [[209, 'Snubbull'], [210, 'Granbull']]),
  chain(215, [[215, 'Farfuret'], [461, 'Dimoret']]),
  chain(218, [[218, 'Limagma'], [219, 'Volcaropod']]),
  chain(220, [[220, 'Marcacrin'], [221, 'Cochignon'], [473, 'Mammochon']]),
  chain(228, [[228, 'Malosse'], [229, 'Demolosse']], { id: 229, nameFr: 'Mega-Demolosse' }),
  chain(231, [[231, 'Phanpy'], [232, 'Donphan']]),
  chain(236, [[236, 'Debugant'], [106, 'Kicklee']]), // simplified — Tyrogue -> multiple
  chain(246, [[246, 'Embrylex'], [247, 'Ymphect'], [248, 'Tyranocif']], { id: 248, nameFr: 'Mega-Tyranocif' }),

  // ===== GEN 3 =====
  chain(252, [[252, 'Arcko'], [253, 'Massko'], [254, 'Jungko']], { id: 254, nameFr: 'Mega-Jungko' }),
  chain(255, [[255, 'Poussifeu'], [256, 'Galifeu'], [257, 'Brasegali']], { id: 257, nameFr: 'Mega-Brasegali' }),
  chain(258, [[258, 'Gobou'], [259, 'Flobio'], [260, 'Laggron']], { id: 260, nameFr: 'Mega-Laggron' }),
  chain(261, [[261, 'Medhyena'], [262, 'Grahyena']]),
  chain(263, [[263, 'Zigzaton'], [264, 'Lineon']]),
  chain(265, [[265, 'Chenipotte'], [266, 'Armulys'], [267, 'Charmillon']]),
  chain(270, [[270, 'Nenupiot'], [271, 'Lombre'], [272, 'Ludicolo']]),
  chain(273, [[273, 'Grainipiot'], [274, 'Pifeuil'], [275, 'Tengalice']]),
  chain(276, [[276, 'Nirondelle'], [277, 'Heledelle']]),
  chain(280, [[280, 'Tarsal'], [281, 'Kirlia'], [282, 'Gardevoir']], { id: 282, nameFr: 'Mega-Gardevoir' }),
  chain(283, [[283, 'Arakdo'], [284, 'Maskadra']]),
  chain(285, [[285, 'Balignon'], [286, 'Chapignon']]),
  chain(287, [[287, 'Parecool'], [288, 'Vigoroth'], [289, 'Monaflemit']]),
  chain(293, [[293, 'Chuchmur'], [294, 'Ramboum'], [295, 'Brouhabam']]),
  chain(296, [[296, 'Makuhita'], [297, 'Hariyama']]),
  chain(304, [[304, 'Galekid'], [305, 'Galegon'], [306, 'Galeking']], { id: 306, nameFr: 'Mega-Galeking' }),
  chain(309, [[309, 'Dynavolt'], [310, 'Elecsprint']], { id: 310, nameFr: 'Mega-Elecsprint' }),
  chain(315, [[315, 'Roselia'], [407, 'Roserade']]),
  chain(316, [[316, 'Gloupti'], [317, 'Avaltout']]),
  chain(318, [[318, 'Carvanha'], [319, 'Sharpedo']], { id: 319, nameFr: 'Mega-Sharpedo' }),
  chain(322, [[322, 'Chamallot'], [323, 'Camerupt']], { id: 323, nameFr: 'Mega-Camerupt' }),
  chain(325, [[325, 'Spoink'], [326, 'Groret']]),
  chain(328, [[328, 'Kraknoix'], [329, 'Vibraninf'], [330, 'Libegon']]),
  chain(333, [[333, 'Tylton'], [334, 'Altaria']], { id: 334, nameFr: 'Mega-Altaria' }),
  chain(339, [[339, 'Barloche'], [340, 'Barbicha']]),
  chain(341, [[341, 'Ecrapince'], [342, 'Colhomard']]),
  chain(345, [[345, 'Lilia'], [346, 'Vacilys']]),
  chain(347, [[347, 'Anorith'], [348, 'Armaldo']]),
  chain(353, [[353, 'Polichombr'], [354, 'Branette']], { id: 354, nameFr: 'Mega-Branette' }),
  chain(355, [[355, 'Skelenox'], [356, 'Teraclope'], [477, 'Noctunoir']]),
  chain(361, [[361, 'Stalgamin'], [362, 'Oniglali']], { id: 362, nameFr: 'Mega-Oniglali' }),
  chain(371, [[371, 'Draby'], [372, 'Drackhaus'], [373, 'Drattak']], { id: 373, nameFr: 'Mega-Drattak' }),
  chain(374, [[374, 'Terhal'], [375, 'Metang'], [376, 'Metalosse']], { id: 376, nameFr: 'Mega-Metalosse' }),

  // ===== GEN 4 =====
  chain(387, [[387, 'Tortipouss'], [388, 'Boskara'], [389, 'Torterra']]),
  chain(390, [[390, 'Ouisticram'], [391, 'Chimpenfeu'], [392, 'Simiabraz']]),
  chain(393, [[393, 'Tiplouf'], [394, 'Prinplouf'], [395, 'Pingoleon']]),
  chain(396, [[396, 'Etourmi'], [397, 'Etourvol'], [398, 'Etouraptor']]),
  chain(399, [[399, 'Keunotor'], [400, 'Castorno']]),
  chain(401, [[401, 'Crikzik'], [402, 'Melokrik']]),
  chain(403, [[403, 'Lixy'], [404, 'Luxio'], [405, 'Luxray']]),
  chain(408, [[408, 'Kranidos'], [409, 'Charkos']]),
  chain(410, [[410, 'Dinoclier'], [411, 'Bastiodon']]),
  chain(415, [[415, 'Apitrini'], [416, 'Apireine']]),
  chain(420, [[420, 'Ceribou'], [421, 'Ceriflor']]),
  chain(436, [[436, 'Archeomire'], [437, 'Archeodonc']]),
  chain(443, [[443, 'Griknot'], [444, 'Carmache'], [445, 'Carchacrok']], { id: 445, nameFr: 'Mega-Carchacrok' }),
  chain(447, [[447, 'Riolu'], [448, 'Lucario']], { id: 448, nameFr: 'Mega-Lucario' }),
  chain(449, [[449, 'Hippopotas'], [450, 'Hippodocus']]),

  // ===== GEN 5 =====
  chain(495, [[495, 'Vipélierre'], [496, 'Lianaja'], [497, 'Majaspic']]),
  chain(498, [[498, 'Gruikui'], [499, 'Grotichon'], [500, 'Roitiflam']]),
  chain(501, [[501, 'Moustillon'], [502, 'Mateloutre'], [503, 'Clamiral']]),
  chain(504, [[504, 'Ratentif'], [505, 'Miradar']]),
  chain(506, [[506, 'Ponchiot'], [507, 'Ponchien'], [508, 'Mastouffe']]),
  chain(509, [[509, 'Chacripan'], [510, 'Leopardus']]),
  chain(519, [[519, 'Poichigeon'], [520, 'Colombeau'], [521, 'Deflaisan']]),
  chain(522, [[522, 'Zebibron'], [523, 'Zeblitz']]),
  chain(524, [[524, 'Nodulithe'], [525, 'Geolithe'], [526, 'Gigalithe']]),
  chain(529, [[529, 'Rototaupe'], [530, 'Minotaupe']]),
  chain(532, [[532, 'Charpenti'], [533, 'Ouvrifier'], [534, 'Betochef']]),
  chain(535, [[535, 'Tritonde'], [536, 'Batracne'], [537, 'Crapustule']]),
  chain(546, [[546, 'Doudouvet'], [547, 'Farfaduvet']]),
  chain(548, [[548, 'Chlorobule'], [549, 'Fragilady']]),
  chain(551, [[551, 'Mascaiman'], [552, 'Escroco'], [553, 'Crocorible']]),
  chain(557, [[557, 'Crabicoque'], [558, 'Crabaraque']]),
  chain(559, [[559, 'Baggiguane'], [560, 'Baggaid']]),
  chain(564, [[564, 'Carapagos'], [565, 'Megapagos']]),
  chain(566, [[566, 'Arkéapti'], [567, 'Aéroptéryx']]),
  chain(570, [[570, 'Zorua'], [571, 'Zoroark']]),
  chain(574, [[574, 'Scrutella'], [575, 'Mesmérella'], [576, 'Sidérella']]),
  chain(577, [[577, 'Nucléos'], [578, 'Méios'], [579, 'Symbios']]),
  chain(590, [[590, 'Trompignon'], [591, 'Gaulet']]),
  chain(595, [[595, 'Statitik'], [596, 'Mygavolt']]),
  chain(599, [[599, 'Tic'], [600, 'Clic'], [601, 'Cliticlic']]),
  chain(605, [[605, 'Lewsor'], [606, 'Neitram']]),
  chain(607, [[607, 'Funecire'], [608, 'Melancolux'], [609, 'Lugulabre']]),
  chain(610, [[610, 'Coupenotte'], [611, 'Incisache'], [612, 'Tranchodon']]),
  chain(622, [[622, 'Gringolem'], [623, 'Golemastoc']]),
  chain(624, [[624, 'Scalpion'], [625, 'Scalproie']]),
  chain(627, [[627, 'Furaiglon'], [628, 'Gueriaigle']]),
  chain(629, [[629, 'Vostourno'], [630, 'Vaututrice']]),
  chain(633, [[633, 'Solochi'], [634, 'Diamat'], [635, 'Trioxhydre']]),
  chain(636, [[636, 'Pyronille'], [637, 'Pyrax']]),
];

// Index by baseId for O(1) lookup
export const CHAIN_BY_BASE_ID: Map<number, EvolutionChain> = new Map(
  EVOLUTION_CHAINS.map((c) => [c.baseId, c])
);

// Also index by ANY stage ID -> chain (so we can find chain from evolved form)
export const CHAIN_BY_ANY_ID: Map<number, EvolutionChain> = new Map(
  EVOLUTION_CHAINS.flatMap((c) => c.stages.map((s) => [s.id, c] as const))
);

// French names for single-stage Pokemon (not in evolution chains)
export const SINGLE_STAGE_NAMES_FR: Record<number, string> = {
  83: 'Canarticho',
  108: 'Excelangue',
  114: 'Saquedeneu',
  115: 'Kangourex',
  127: 'Scarabrute',
  128: 'Tauros',
  131: 'Lokhlass',
  132: 'Metamorph',
  142: 'Ptera',
  143: 'Ronflex',
  150: 'Mewtwo',
  151: 'Mew',
  185: 'Simularbre',
  196: 'Mentali',
  199: 'Roigada',
  201: 'Zarbi',
  206: 'Insolourdo',
  211: 'Qwilfish',
  213: 'Caratroc',
  214: 'Scarhino',
  222: 'Corayon',
  225: 'Cadoizo',
  234: 'Cerfrousse',
  235: 'Queulorior',
  241: 'Ecrémeuh',
  249: 'Lugia',
  250: 'Ho-Oh',
  251: 'Celebi',
  302: 'Tenefix',
  303: 'Mysdibule',
  311: 'Posipi',
  312: 'Negapi',
  313: 'Muciole',
  314: 'Lumivole',
  324: 'Chartor',
  327: 'Spinda',
  335: 'Mangriff',
  336: 'Seviper',
  337: 'Seleroc',
  338: 'Solaroc',
  344: 'Kaorine',
  351: 'Morpheo',
  352: 'Kecleon',
  357: 'Tropius',
  359: 'Absol',
  369: 'Relicanth',
  370: 'Lovdisc',
  377: 'Regirock',
  378: 'Regice',
  379: 'Registeel',
  380: 'Latias',
  381: 'Latios',
  382: 'Kyogre',
  383: 'Groudon',
  384: 'Rayquaza',
  385: 'Jirachi',
  386: 'Deoxys',
  417: 'Pachirisu',
  423: 'Tritosor',
  441: 'Pijako',
  442: 'Spiritomb',
  446: 'Goinfrex',
  452: 'Drascore',
  455: 'Vortente',
  461: 'Dimoret',
  462: 'Magnezone',
  466: 'Elekable',
  467: 'Maganon',
  468: 'Togekiss',
  471: 'Givrali',
  472: 'Scorvol',
  474: 'Porygon-Z',
  475: 'Gallame',
  476: 'Tarinorme',
  477: 'Noctunoir',
  478: 'Momartik',
  479: 'Motisma',
  480: 'Crehelf',
  481: 'Crefollet',
  482: 'Crefadet',
  483: 'Dialga',
  484: 'Palkia',
  485: 'Heatran',
  486: 'Regigigas',
  487: 'Giratina',
  488: 'Cresselia',
  491: 'Darkrai',
  492: 'Shaymin',
  493: 'Arceus',
  494: 'Victini',
  531: 'Nanmeouie',
  534: 'Betochef',
  538: 'Judokrak',
  539: 'Karaclee',
  553: 'Crocorible',
  556: 'Maracachi',
  560: 'Baggaid',
  571: 'Zoroark',
  587: 'Emolga',
  601: 'Cliticlic',
  604: 'Ohmassacre',
  609: 'Lugulabre',
  612: 'Tranchodon',
  615: 'Hexagel',
  618: 'Limonde',
  623: 'Golemastoc',
  625: 'Scalproie',
  626: 'Frison',
  631: 'Aflamanoir',
  632: 'Fermite',
  635: 'Trioxhydre',
  637: 'Pyrax',
  638: 'Cobaltium',
  639: 'Terrakium',
  640: 'Viridium',
  641: 'Boreas',
  642: 'Fulguris',
  643: 'Reshiram',
  644: 'Zekrom',
  645: 'Demeteros',
  646: 'Kyurem',
  647: 'Keldeo',
  648: 'Meloetta',
  649: 'Genesect',
  701: 'Brutalibré',
};

/**
 * Get the French name for any Pokemon ID.
 * First checks evolution chains, then single-stage names.
 * Returns null if not found (will need API fallback).
 */
export function getFrenchName(pokemonId: number): string | null {
  // Check evolution chains
  const chain = CHAIN_BY_ANY_ID.get(pokemonId);
  if (chain) {
    const stage = chain.stages.find((s) => s.id === pokemonId);
    if (stage) return stage.nameFr;
  }
  // Check single-stage names
  return SINGLE_STAGE_NAMES_FR[pokemonId] ?? null;
}

/**
 * Get evolution chain for a Pokemon (by any stage ID).
 */
export function getEvolutionChain(pokemonId: number): EvolutionChain | null {
  return CHAIN_BY_ANY_ID.get(pokemonId) ?? null;
}

/**
 * Check if a Pokemon ID is a base form (first stage of its chain, or single-stage).
 */
export function isBaseForm(pokemonId: number): boolean {
  const chain = CHAIN_BY_ANY_ID.get(pokemonId);
  if (!chain) return true; // Single-stage = always base
  return chain.stages[0].id === pokemonId;
}
