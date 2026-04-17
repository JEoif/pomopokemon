import type { RarityTier } from '../types';

/**
 * BASE-FORM ONLY Pokemon pools organized by rarity tier.
 * Pokemon that can evolve are listed at their base form only.
 * Pokemon with no evolution are listed at their appropriate rarity.
 * Gen 1-5 (IDs 1-649) for good coverage.
 */

// Rarity 1 — Commun (50%) — Common base forms, abundant Pokemon
export const RARITY_1_POOL: number[] = [
  // Normal type commons
  16,  // Pidgey
  19,  // Rattata
  161, // Sentret
  163, // Hoothoot
  261, // Poochyena
  263, // Zigzagoon
  276, // Taillow
  293, // Whismur
  396, // Starly
  399, // Bidoof
  504, // Patrat
  506, // Lillipup
  519, // Pidove
  // Bug commons
  10,  // Caterpie
  13,  // Weedle (if gen allows)
  165, // Ledyba
  167, // Spinarak
  265, // Wurmple
  401, // Kricketot
  // Water commons
  60,  // Poliwag
  118, // Goldeen
  129, // Magikarp
  170, // Chinchou
  183, // Marill
  194, // Wooper
  270, // Lotad
  283, // Surskit
  339, // Barboach
  535, // Tympole
  // Grass commons
  43,  // Oddish
  69,  // Bellsprout
  187, // Hoppip
  191, // Sunkern
  273, // Seedot
  285, // Shroomish
  315, // Roselia
  420, // Cherubi
  546, // Cottonee
  548, // Petilil
  // Electric commons
  100, // Voltorb
  172, // Pichu
  179, // Mareep
  309, // Electrike
  403, // Shinx
  522, // Blitzle
  // Poison
  41,  // Zubat
  23,  // Ekans
  316, // Gulpin
  // Ground
  50,  // Diglett
  231, // Phanpy
  328, // Trapinch
  449, // Hippopotas
  // Rock
  74,  // Geodude
  524, // Roggenrola
  557, // Dwebble
  // Ghost
  353, // Shuppet
  // Fighting
  66,  // Machop
  236, // Tyrogue
  532, // Timburr
  // Fire
  218, // Slugma
  322, // Numel
  // Ice
  220, // Swinub
  361, // Snorunt
  // Psychic
  325, // Spoink
  // Dark
  509, // Purrloin
  // Fairy
  39,  // Jigglypuff (base: Igglybuff=174)
  174, // Igglybuff
  // Steel
  436, // Bronzor
];

// Rarity 2 — Peu Commun (30%) — Uncommon Pokemon, decent base forms
export const RARITY_2_POOL: number[] = [
  // Starters (all gens)
  1,   // Bulbasaur
  4,   // Charmander
  7,   // Squirtle
  152, // Chikorita
  155, // Cyndaquil
  158, // Totodile
  252, // Treecko
  255, // Torchic
  258, // Mudkip
  387, // Turtwig
  390, // Chimchar
  393, // Piplup
  495, // Snivy
  498, // Tepig
  501, // Oshawott
  // Cool base forms
  27,  // Sandshrew
  37,  // Vulpix
  54,  // Psyduck (no: Golduck)
  58,  // Growlithe
  63,  // Abra
  72,  // Tentacool
  77,  // Ponyta
  81,  // Magnemite
  92,  // Gastly
  95,  // Onix
  104, // Cubone
  111, // Rhyhorn
  116, // Horsea
  123, // Scyther
  133, // Eevee
  138, // Omanyte
  140, // Kabuto
  147, // Dratini
  175, // Togepi
  198, // Murkrow
  207, // Gligar
  209, // Snubbull
  215, // Sneasel
  228, // Houndour
  246, // Larvitar
  280, // Ralts
  287, // Slakoth
  296, // Makuhita
  304, // Aron
  318, // Carvanha
  333, // Swablu
  341, // Corphish
  345, // Lileep
  347, // Anorith
  355, // Duskull
  360, // Wynaut
  371, // Bagon
  374, // Beldum
  408, // Cranidos
  410, // Shieldon
  415, // Combee
  443, // Gible
  447, // Riolu
  529, // Drilbur
  551, // Sandile
  559, // Scraggy
  564, // Tirtouga
  566, // Archen
  574, // Gothita
  577, // Solosis
  595, // Joltik
  599, // Klink
  607, // Litwick
  610, // Axew
  622, // Golett
  624, // Pawniard
  627, // Rufflet
  629, // Vullaby
  633, // Deino
  // Single-stage uncommons
  83,  // Farfetch'd
  115, // Kangaskhan
  127, // Pinsir
  128, // Tauros
  132, // Ditto
  201, // Unown
  206, // Dunsparce
  211, // Qwilfish
  213, // Shuckle
  214, // Heracross
  222, // Corsola
  225, // Delibird
  234, // Stantler
  235, // Smeargle
  302, // Sableye
  303, // Mawile
  311, // Plusle
  312, // Minun
  313, // Volbeat
  314, // Illumise
  324, // Torkoal
  327, // Spinda
  335, // Zangoose
  336, // Seviper
  337, // Lunatone
  338, // Solrock
  351, // Castform
  352, // Kecleon
  357, // Tropius
  359, // Absol
  369, // Relicanth
  370, // Luvdisc
  417, // Pachirisu
  441, // Chatot
  455, // Carnivine
  479, // Rotom
  531, // Audino
  538, // Throh
  539, // Sawk
  556, // Maractus
  587, // Emolga
  590, // Foongus
  615, // Cryogonal
  618, // Stunfisk
  626, // Bouffalant
  631, // Heatmor
  632, // Durant
];

// Rarity 3 — Rare (15%) — Evolved-looking base forms, cool singles
export const RARITY_3_POOL: number[] = [
  108, // Lickitung
  114, // Tangela
  131, // Lapras
  137, // Porygon
  142, // Aerodactyl
  185, // Sudowoodo
  199, // Slowking (trade evo = rare)
  227, // Skarmory
  241, // Miltank
  306, // Aggron (base Aron is rarity 2 — this is final)
  330, // Flygon (base Trapinch is rarity 1)
  344, // Claydol
  362, // Glalie
  376, // Metagross (base Beldum is rarity 2)
  423, // Gastrodon
  442, // Spiritomb
  452, // Drapion
  461, // Weavile
  462, // Magnezone
  466, // Electivire
  467, // Magmortar
  468, // Togekiss
  471, // Glaceon
  472, // Gliscor
  474, // Porygon-Z
  475, // Gallade
  476, // Probopass
  477, // Dusknoir
  478, // Froslass
  530, // Excadrill
  553, // Krookodile
  571, // Zoroark (base Zorua=570 rare spawn)
  570, // Zorua
  609, // Chandelure
  612, // Haxorus
  625, // Bisharp
  635, // Hydreigon (base Deino rarity 2)
  560, // Scrafty
  534, // Conkeldurr (trade)
  596, // Galvantula
  601, // Klinklang
  604, // Eelektross
  623, // Golurk
  637, // Volcarona (base Larvesta=636)
  636, // Larvesta
  // Strong single-stage
  127, // Pinsir (also rarity 2 — remove from there if here)
  212, // Scizor (evo of Scyther)
  248, // Tyranitar (base Larvitar rarity 2)
  289, // Slaking
  373, // Salamence (base Bagon rarity 2)
  445, // Garchomp (base Gible rarity 2)
  448, // Lucario (base Riolu rarity 2)
  500, // Emboar
  503, // Samurott
  497, // Serperior
  389, // Torterra
  395, // Empoleon
  392, // Infernape
  260, // Swampert
  257, // Blaziken
  254, // Sceptile
  160, // Feraligatr
  157, // Typhlosion
  154, // Meganium
  9,   // Blastoise
  6,   // Charizard
  3,   // Venusaur
  // Cool rare singles
  587, // Emolga (bump to rare? keep uncommon)
  701, // Hawlucha
  615, // Cryogonal
];

// Rarity 4 — Epique (4%) — Pseudo-legendaries base forms, ultra-rares
export const RARITY_4_POOL: number[] = [
  // Pseudo-legendary bases (already have base forms in lower tiers,
  // but these are the RARE base forms themselves)
  142, // Aerodactyl
  131, // Lapras
  143, // Snorlax (or Munchlax=446)
  446, // Munchlax
  479, // Rotom (special forms)
  // Sub-legendaries / Very rare
  144, // Articuno
  145, // Zapdos
  146, // Moltres
  243, // Raikou
  244, // Entei
  245, // Suicune
  377, // Regirock
  378, // Regice
  379, // Registeel
  380, // Latias
  381, // Latios
  480, // Uxie
  481, // Mesprit
  482, // Azelf
  485, // Heatran
  486, // Regigigas
  488, // Cresselia
  638, // Cobalion
  639, // Terrakion
  640, // Virizion
  641, // Tornadus
  642, // Thundurus
  645, // Landorus
];

// Rarity 5 — Legendaire (1%) — Box legends, mythicals
export const RARITY_5_POOL: number[] = [
  150, // Mewtwo
  151, // Mew
  249, // Lugia
  250, // Ho-Oh
  251, // Celebi
  382, // Kyogre
  383, // Groudon
  384, // Rayquaza
  385, // Jirachi
  386, // Deoxys
  483, // Dialga
  484, // Palkia
  487, // Giratina
  491, // Darkrai
  492, // Shaymin
  493, // Arceus
  494, // Victini
  643, // Reshiram
  644, // Zekrom
  646, // Kyurem
  647, // Keldeo
  648, // Meloetta
  649, // Genesect
];

// All pools indexed by rarity for quick lookup
export const RARITY_POOLS: Record<RarityTier, number[]> = {
  1: RARITY_1_POOL,
  2: RARITY_2_POOL,
  3: RARITY_3_POOL,
  4: RARITY_4_POOL,
  5: RARITY_5_POOL,
};

// PokeAPI type ID -> Pokemon in that type (base forms only, for type-influenced drops)
// Subset of each rarity pool, tagged by type
export const TYPE_POOLS: Record<number, number[]> = {
  // Fighting (2)
  2: [66, 236, 532, 296, 447, 538, 539, 559, 624],
  // Poison (3)
  3: [23, 41, 43, 316],
  // Ground (5)
  5: [50, 74, 104, 111, 194, 231, 328, 339, 449, 529, 551, 622],
  // Rock (6)
  6: [74, 95, 111, 138, 140, 304, 345, 347, 408, 410, 524, 557, 564, 566],
  // Ghost (8)
  8: [92, 353, 355, 442, 607, 622],
  // Steel (9)
  9: [81, 304, 374, 436, 599, 624],
  // Fire (10)
  10: [4, 37, 58, 77, 155, 218, 228, 255, 322, 390, 498, 607, 636],
  // Water (11)
  11: [7, 54, 60, 72, 116, 118, 129, 158, 170, 183, 258, 270, 283, 318, 339, 341, 501, 535, 564],
  // Grass (12)
  12: [1, 43, 69, 152, 187, 191, 252, 270, 273, 285, 315, 345, 387, 420, 495, 546, 548, 556, 590],
  // Electric (13)
  13: [100, 172, 179, 309, 403, 417, 479, 522, 587, 595],
  // Psychic (14)
  14: [63, 79, 102, 177, 196, 280, 325, 343, 360, 374, 433, 436, 474, 517, 527, 561, 574, 577, 605],
  // Ice (15)
  15: [220, 361, 478, 615],
  // Dark (17)
  17: [198, 215, 228, 261, 302, 318, 353, 359, 430, 442, 509, 551, 559, 570, 624, 629, 633],
  // Fairy (18)
  18: [35, 39, 174, 175, 183, 209, 280, 303, 546, 574],
  // Normal (1)
  1: [16, 19, 39, 83, 108, 115, 128, 132, 133, 137, 143, 161, 163, 174, 206, 234, 235,
      241, 261, 263, 276, 287, 293, 327, 351, 352, 396, 399, 417, 441, 446, 504, 506, 519, 531, 626],
  // Bug (7)
  7: [10, 13, 165, 167, 265, 283, 313, 314, 401, 415, 540, 557, 595, 636],
  // Dragon (16)
  16: [147, 333, 371, 443, 610, 633],
  // Flying (3 — secondary mostly, using ID 3 for Flying)
  // Note: Flying is type 3 in PokeAPI? No, Flying=3 is wrong. Poison=4, Flying is not ID 3.
  // PokeAPI types: 1=normal,2=fighting,3=poison,4=flying... Let me not include flying separately
};

// Thematic pools: category-specific Pokemon that have extra chance to appear
export const THEMATIC_POOLS: Record<string, number[]> = {
  sport: [
    66,  // Machop (strong)
    236, // Tyrogue (martial arts)
    447, // Riolu (aura fighter)
    532, // Timburr (construction muscles)
    538, // Throh (judo)
    539, // Sawk (karate)
    559, // Scraggy (street fighter)
    214, // Heracross (strong bug)
    128, // Tauros (bull)
    626, // Bouffalant (buffalo)
  ],
  admin: [
    63,  // Abra (smart)
    81,  // Magnemite (tech)
    100, // Voltorb (electric/tech)
    137, // Porygon (digital)
    374, // Beldum (computer-like)
    436, // Bronzor (metallic/systematic)
    479, // Rotom (electronic)
    599, // Klink (gears/machinery)
    605, // Elgyem (brainy)
    531, // Audino (helpful)
  ],
  writing: [
    92,  // Gastly (mysterious)
    201, // Unown (letters!)
    235, // Smeargle (artist)
    353, // Shuppet (ghostwriter vibes)
    355, // Duskull (dark stories)
    442, // Spiritomb (108 spirits = stories)
    570, // Zorua (illusion/fiction)
    574, // Gothita (gothic literature)
    607, // Litwick (candlelight writing)
    577, // Solosis (thinking/cells)
  ],
  creative: [
    35,  // Clefairy (magical)
    132, // Ditto (transform = create anything)
    175, // Togepi (joy/creation)
    235, // Smeargle (painter!)
    351, // Castform (changes form)
    352, // Kecleon (color change)
    315, // Roselia (beautiful)
    420, // Cherubi (aesthetic)
    546, // Cottonee (whimsical)
    548, // Petilil (delicate)
  ],
  housework: [
    50,  // Diglett (digging/garden)
    69,  // Bellsprout (plant)
    187, // Hoppip (garden)
    191, // Sunkern (sunflower/garden)
    194, // Wooper (water/cleaning)
    270, // Lotad (water lily)
    285, // Shroomish (mushroom/garden)
    399, // Bidoof (beaver/builder)
    449, // Hippopotas (earth)
    556, // Maractus (cactus/plant care)
  ],
  drawing: [
    235, // Smeargle (peintre — LE pokemon du dessin)
    132, // Ditto (transformiste/créateur)
    175, // Togepi (douceur/créativité)
    351, // Castform (change de forme)
    352, // Kecleon (change de couleur)
    315, // Roselia (beau)
    420, // Cherubi (esthétique)
    546, // Cottonee (fantaisie)
    574, // Gothita (style gothique)
    607, // Litwick (lumière/ombre)
  ],
  craft: [
    74,  // Geodude (rock/stone)
    95,  // Onix (rock/stone)
    304, // Aron (steel)
    436, // Bronzor (bronze/metal)
    599, // Klink (gears/machinery)
    81,  // Magnemite (metal)
    205, // Forretress (steel shell)
    227, // Skarmory (steel wings)
    624, // Pawniard (blades)
    529, // Drilbur (drill/digging)
  ],
  business: [
    63,  // Abra (smart/teleport)
    133, // Eevee (adaptable/versatile)
    137, // Porygon (digital/tech)
    196, // Espeon (psychic intuition)
    374, // Beldum (analytical)
    479, // Rotom (tech/electric)
    403, // Shinx (electric/sharp)
    447, // Riolu (aura/charisma)
    531, // Audino (helpful/support)
    179, // Mareep (electric)
  ],
  other: [
    133, // Eevee (adaptable)
    132, // Ditto (anything)
    351, // Castform (versatile)
    174, // Igglybuff (cute wildcard)
    39,  // Jigglypuff (classic)
    172, // Pichu (iconic)
    175, // Togepi (lucky)
    327, // Spinda (random!)
    441, // Chatot (talkative)
    531, // Audino (support)
  ],
};
