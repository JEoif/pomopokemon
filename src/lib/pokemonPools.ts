import type { RarityTier } from '../types';

/**
 * Pokemon pools organized by rarity tier.
 * R1 = base/common forms | R2 = mid-evos + interesting singles + starters
 * R3 = final evolutions + powerful singles | R4 = sub-legends | R5 = box legends & mythicals
 * Covers Gen 1–9 (IDs 1–1025).  Gen 1-3 are complete (all 386 included).
 */

// ──────────────────────────────────────────────────────────────
// RARITY 1 — Commun (55%)
// ──────────────────────────────────────────────────────────────
export const RARITY_1_POOL: number[] = [
  // === Gen 1 ===
  10,  // Caterpie
  11,  // Metapod
  13,  // Weedle
  14,  // Kakuna
  16,  // Pidgey
  19,  // Rattata
  21,  // Spearow
  23,  // Ekans
  29,  // Nidoran♀
  32,  // Nidoran♂
  41,  // Zubat
  43,  // Oddish
  46,  // Paras
  48,  // Venonat
  50,  // Diglett
  52,  // Meowth
  56,  // Mankey
  60,  // Poliwag
  66,  // Machop
  69,  // Bellsprout
  74,  // Geodude
  84,  // Doduo
  86,  // Seel
  88,  // Grimer
  90,  // Shellder
  96,  // Drowzee
  98,  // Krabby
  100, // Voltorb
  102, // Exeggcute
  109, // Koffing
  118, // Goldeen
  129, // Magikarp
  172, // Pichu
  174, // Igglybuff
  218, // Slugma
  // === Gen 2 ===
  161, // Sentret
  163, // Hoothoot
  165, // Ledyba
  167, // Spinarak
  170, // Chinchou
  173, // Cleffa
  177, // Natu
  183, // Marill
  187, // Hoppip
  191, // Sunkern
  194, // Wooper
  204, // Pineco
  216, // Teddiursa
  220, // Swinub
  223, // Remoraid
  231, // Phanpy
  238, // Smoochum
  239, // Elekid
  240, // Magby
  // === Gen 3 ===
  261, // Poochyena
  263, // Zigzagoon
  265, // Wurmple
  266, // Silcoon
  268, // Cascoon
  270, // Lotad
  273, // Seedot
  276, // Taillow
  278, // Wingull
  283, // Surskit
  285, // Shroomish
  290, // Nincada
  293, // Whismur
  298, // Azurill
  300, // Skitty
  307, // Meditite
  309, // Electrike
  316, // Gulpin
  320, // Wailmer
  322, // Numel
  325, // Spoink
  328, // Trapinch
  331, // Cacnea
  339, // Barboach
  343, // Baltoy
  353, // Shuppet
  361, // Snorunt
  363, // Spheal
  366, // Clamperl
  // === Gen 4 ===
  396, // Starly
  399, // Bidoof
  403, // Shinx
  420, // Cherubi
  436, // Bronzor
  449, // Hippopotas
  // === Gen 5 ===
  504, // Patrat
  506, // Lillipup
  509, // Purrloin
  519, // Pidove
  524, // Roggenrola
  532, // Timburr
  535, // Tympole
  540, // Sewaddle
  546, // Cottonee
  548, // Petilil
  557, // Dwebble
  // === Gen 6 ===
  659, // Bunnelby
  661, // Fletchling
  664, // Scatterbug
  667, // Litleo
  669, // Flabébé
  672, // Skiddo
  677, // Espurr
  682, // Spritzee
  684, // Swirlix
  686, // Inkay
  // === Gen 7 ===
  731, // Pikipek
  734, // Yungoos
  736, // Grubbin
  739, // Crabrawler
  741, // Oricorio
  742, // Cutiefly
  744, // Rockruff
  746, // Wishiwashi
  747, // Mareanie
  749, // Mudbray
  751, // Dewpider
  753, // Fomantis
  755, // Morelull
  757, // Salandit
  759, // Stufful
  761, // Bounsweet
  // === Gen 8 ===
  819, // Skwovet
  824, // Blipbug
  827, // Nickit
  829, // Gossifleur
  831, // Wooloo
  833, // Chewtle
  835, // Yamper
  837, // Rolycoly
  840, // Applin
  843, // Silicobra
  845, // Cramorant
  846, // Arrokuda
  848, // Toxel
  850, // Sizzlipede
  852, // Clobbopus
  856, // Hatenna
  859, // Impidimp
  868, // Milcery
  871, // Pincurchin
  872, // Snom
  878, // Cufant
  // === Gen 9 ===
  915, // Lechonk
  917, // Tarountula
  919, // Nymble
  921, // Pawmi
  924, // Tandemaus
  926, // Fidough
  928, // Smoliv
  932, // Nacli
  937, // Tadbulb
  939, // Wattrel
  941, // Maschiff
  943, // Shroodle
  948, // Bramblin
  950, // Toedscool
  960, // Wiglett
  963, // Finizen
  969, // Glimmet
  971, // Greavard
  973, // Flamigo
  974, // Cetoddle
  996, // Frigibax
];

// ──────────────────────────────────────────────────────────────
// RARITY 2 — Peu Commun (31%) — Mid-evos, starters, cool singles
// ──────────────────────────────────────────────────────────────
export const RARITY_2_POOL: number[] = [
  // === Gen 1 starters ===
  1,   // Bulbasaur
  4,   // Charmander
  7,   // Squirtle
  // === Gen 1 cool bases ===
  27,  // Sandshrew
  37,  // Vulpix
  54,  // Psyduck
  58,  // Growlithe
  63,  // Abra
  72,  // Tentacool
  77,  // Ponyta
  81,  // Magnemite
  92,  // Gastly
  // === Gen 1 mid-evos & singles ===
  17,  // Pidgeotto
  20,  // Raticate
  24,  // Arbok
  25,  // Pikachu
  30,  // Nidorina
  33,  // Nidorino
  35,  // Clefairy
  39,  // Jigglypuff
  42,  // Golbat
  44,  // Gloom
  47,  // Parasect
  49,  // Venomoth
  57,  // Primeape
  61,  // Poliwhirl
  64,  // Kadabra
  67,  // Machoke
  70,  // Weepinbell
  75,  // Graveler
  79,  // Slowpoke
  82,  // Magneton
  83,  // Farfetch'd
  93,  // Haunter
  95,  // Onix
  97,  // Hypno
  104, // Cubone
  111, // Rhyhorn
  113, // Chansey
  115, // Kangaskhan
  116, // Horsea
  117, // Seadra
  120, // Staryu
  122, // Mr. Mime
  123, // Scyther
  124, // Jynx
  125, // Electabuzz
  126, // Magmar
  128, // Tauros
  132, // Ditto
  133, // Eevee
  138, // Omanyte
  140, // Kabuto
  147, // Dratini
  148, // Dragonair
  // === Gen 2 starters ===
  152, // Chikorita
  155, // Cyndaquil
  158, // Totodile
  // === Gen 2 mid-evos & singles ===
  153, // Bayleef
  156, // Quilava
  159, // Croconaw
  175, // Togepi
  176, // Togetic
  178, // Xatu
  179, // Mareep
  180, // Flaaffy
  188, // Skiploom
  190, // Aipom
  193, // Yanma
  198, // Murkrow
  200, // Misdreavus
  202, // Wobbuffet
  203, // Girafarig
  205, // Forretress
  207, // Gligar
  209, // Snubbull
  215, // Sneasel
  221, // Piloswine
  226, // Mantine
  228, // Houndour
  236, // Tyrogue
  246, // Larvitar
  247, // Pupitar
  // === Gen 2 singles ===
  201, // Unown
  206, // Dunsparce
  211, // Qwilfish
  213, // Shuckle
  214, // Heracross
  222, // Corsola
  225, // Delibird
  234, // Stantler
  235, // Smeargle
  // === Gen 3 starters ===
  252, // Treecko
  255, // Torchic
  258, // Mudkip
  // === Gen 3 mid-evos & singles ===
  253, // Grovyle
  256, // Combusken
  259, // Marshtomp
  271, // Lombre
  274, // Nuzleaf
  279, // Pelipper
  280, // Ralts
  281, // Kirlia
  287, // Slakoth
  288, // Vigoroth
  294, // Loudred
  296, // Makuhita
  299, // Nosepass
  304, // Aron
  301, // Delcatty
  305, // Lairon
  315, // Roselia
  318, // Carvanha
  329, // Vibrava
  333, // Swablu
  341, // Corphish
  345, // Lileep
  347, // Anorith
  349, // Feebas
  355, // Duskull
  356, // Dusclops
  358, // Chimecho
  360, // Wynaut
  364, // Sealeo
  371, // Bagon
  372, // Shelgon
  374, // Beldum
  375, // Metang
  // === Gen 3 singles ===
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
  // === Gen 4 starters ===
  387, // Turtwig
  390, // Chimchar
  393, // Piplup
  // === Gen 4 cool bases ===
  408, // Cranidos
  410, // Shieldon
  415, // Combee
  443, // Gible
  447, // Riolu
  // === Gen 4 singles ===
  417, // Pachirisu
  441, // Chatot
  446, // Munchlax
  455, // Carnivine
  479, // Rotom
  587, // Emolga
  // === Gen 5 starters ===
  495, // Snivy
  498, // Tepig
  501, // Oshawott
  // === Gen 5 cool bases ===
  529, // Drilbur
  551, // Sandile
  559, // Scraggy
  564, // Tirtouga
  566, // Archen
  570, // Zorua
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
  636, // Larvesta
  // === Gen 5 singles ===
  531, // Audino
  538, // Throh
  539, // Sawk
  556, // Maractus
  590, // Foongus
  615, // Cryogonal
  618, // Stunfisk
  626, // Bouffalant
  631, // Heatmor
  632, // Durant
  // === Gen 6 starters ===
  650, // Chespin
  653, // Fennekin
  656, // Froakie
  // === Gen 6 cool bases & singles ===
  674, // Pancham
  676, // Furfrou
  679, // Honedge
  688, // Binacle
  690, // Skrelp
  692, // Clauncher
  694, // Helioptile
  696, // Tyrunt
  698, // Amaura
  702, // Dedenne
  703, // Carbink
  704, // Goomy
  707, // Klefki
  708, // Phantump
  710, // Pumpkaboo
  712, // Bergmite
  714, // Noibat
  // === Gen 7 starters ===
  722, // Rowlet
  725, // Litten
  728, // Popplio
  // === Gen 7 cool bases & singles ===
  764, // Comfey
  765, // Oranguru
  766, // Passimian
  767, // Wimpod
  769, // Sandygast
  771, // Pyukumuku
  772, // Type: Null
  774, // Minior
  775, // Komala
  776, // Turtonator
  777, // Togedemaru
  778, // Mimikyu
  779, // Bruxish
  780, // Drampa
  781, // Dhelmise
  782, // Jangmo-o
  // === Gen 8 starters ===
  810, // Grookey
  813, // Scorbunny
  816, // Sobble
  // === Gen 8 cool bases & singles ===
  821, // Rookidee
  854, // Sinistea
  870, // Falinks
  874, // Stonjourner
  875, // Eiscue
  876, // Indeedee
  877, // Morpeko
  880, // Dracozolt
  881, // Arctozolt
  882, // Dracovish
  883, // Arctovish
  885, // Dreepy
  // === Gen 9 starters ===
  906, // Sprigatito
  909, // Fuecoco
  912, // Quaxly
  // === Gen 9 cool bases & singles ===
  931, // Squawkabilly
  935, // Charcadet
  962, // Bombirdier
  965, // Varoom
  967, // Cyclizar
  968, // Orthworm
  977, // Dondozo
  978, // Tatsugiri
  999, // Gimmighoul
  1011, // Dipplin
  1012, // Poltchageist
  1014, // Okidogi
  1015, // Munkidori
  1016, // Fezandipiti
];

// ──────────────────────────────────────────────────────────────
// RARITY 3 — Rare (12%) — Final evolutions, powerful singles
// ──────────────────────────────────────────────────────────────
export const RARITY_3_POOL: number[] = [
  // === Gen 1 finals ===
  2,   // Ivysaur
  3,   // Venusaur
  5,   // Charmeleon
  6,   // Charizard
  8,   // Wartortle
  9,   // Blastoise
  12,  // Butterfree
  15,  // Beedrill
  18,  // Pidgeot
  22,  // Fearow
  26,  // Raichu
  28,  // Sandslash
  31,  // Nidoqueen
  34,  // Nidoking
  36,  // Clefable
  38,  // Ninetales
  40,  // Wigglytuff
  45,  // Vileplume
  51,  // Dugtrio
  53,  // Persian
  55,  // Golduck
  59,  // Arcanine
  62,  // Poliwrath
  65,  // Alakazam
  68,  // Machamp
  71,  // Victreebel
  73,  // Tentacruel
  76,  // Golem
  78,  // Rapidash
  80,  // Slowbro
  85,  // Dodrio
  87,  // Dewgong
  89,  // Muk
  91,  // Cloyster
  94,  // Gengar
  99,  // Kingler
  101, // Electrode
  103, // Exeggutor
  105, // Marowak
  106, // Hitmonlee
  107, // Hitmonchan
  108, // Lickitung
  110, // Weezing
  112, // Rhydon
  114, // Tangela
  119, // Seaking
  121, // Starmie
  127, // Pinsir
  130, // Gyarados
  131, // Lapras
  134, // Vaporeon
  135, // Jolteon
  136, // Flareon
  137, // Porygon
  139, // Omastar
  141, // Kabutops
  142, // Aerodactyl
  143, // Snorlax
  149, // Dragonite
  // === Gen 1 strong singles ===
  212, // Scizor (evo of Scyther)
  // === Gen 2 finals ===
  154, // Meganium
  157, // Typhlosion
  160, // Feraligatr
  162, // Furret
  164, // Noctowl
  166, // Ledian
  168, // Ariados
  169, // Crobat
  171, // Lanturn
  181, // Ampharos
  182, // Bellossom
  184, // Azumarill
  186, // Politoed
  189, // Jumpluff
  192, // Sunflora
  195, // Quagsire
  196, // Espeon
  197, // Umbreon
  199, // Slowking
  208, // Steelix
  210, // Granbull
  217, // Ursaring
  219, // Magcargo
  224, // Octillery
  227, // Skarmory
  229, // Houndoom
  230, // Kingdra
  232, // Donphan
  233, // Porygon2
  237, // Hitmontop
  241, // Miltank
  242, // Blissey
  248, // Tyranitar
  185, // Sudowoodo
  // === Gen 3 finals ===
  254, // Sceptile
  257, // Blaziken
  260, // Swampert
  262, // Mightyena
  264, // Linoone
  267, // Beautifly
  269, // Dustox
  272, // Ludicolo
  275, // Shiftry
  277, // Swellow
  282, // Gardevoir
  284, // Masquerain
  286, // Breloom
  289, // Slaking
  291, // Ninjask
  292, // Shedinja
  295, // Exploud
  297, // Hariyama
  306, // Aggron
  308, // Medicham
  310, // Manectric
  317, // Swalot
  319, // Sharpedo
  321, // Wailord
  323, // Camerupt
  326, // Grumpig
  330, // Flygon
  332, // Cacturne
  334, // Altaria
  340, // Whiscash
  342, // Crawdaunt
  344, // Claydol
  346, // Cradily
  348, // Armaldo
  350, // Milotic
  354, // Banette
  362, // Glalie
  365, // Walrein
  367, // Huntail
  368, // Gorebyss
  373, // Salamence
  376, // Metagross
  // === Gen 3 singles ===
  423, // Gastrodon
  442, // Spiritomb
  452, // Drapion
  // === Gen 4 finals ===
  389, // Torterra
  392, // Infernape
  395, // Empoleon
  445, // Garchomp
  448, // Lucario
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
  // === Gen 5 finals ===
  497, // Serperior
  500, // Emboar
  503, // Samurott
  530, // Excadrill
  534, // Conkeldurr
  553, // Krookodile
  560, // Scrafty
  571, // Zoroark
  596, // Galvantula
  601, // Klinklang
  604, // Eelektross
  609, // Chandelure
  612, // Haxorus
  623, // Golurk
  625, // Bisharp
  635, // Hydreigon
  637, // Volcarona
  // === Gen 6 singles & finals ===
  652, // Chesnaught
  655, // Delphox
  658, // Greninja
  666, // Vivillon
  675, // Pangoro
  681, // Aegislash
  683, // Aromatisse
  685, // Slurpuff
  695, // Heliolisk
  697, // Tyrantrum
  699, // Aurorus
  700, // Sylveon
  701, // Hawlucha
  706, // Goodra
  709, // Trevenant
  711, // Gourgeist
  713, // Avalugg
  715, // Noivern
  // === Gen 7 finals & strong singles ===
  724, // Decidueye
  727, // Incineroar
  730, // Primarina
  733, // Toucannon
  738, // Vikavolt
  745, // Lycanroc
  748, // Toxapex
  750, // Mudsdale
  752, // Araquanid
  754, // Lurantis
  756, // Shiinotic
  758, // Salazzle
  760, // Bewear
  763, // Tsareena
  773, // Silvally
  784, // Kommo-o
  808, // Meltan
  809, // Melmetal
  // === Gen 8 finals & strong singles ===
  812, // Rillaboom
  815, // Cinderace
  818, // Inteleon
  823, // Corviknight
  826, // Orbeetle
  834, // Drednaw
  839, // Coalossal
  844, // Sandaconda
  849, // Toxtricity
  851, // Centiskorch
  858, // Hatterene
  861, // Grimmsnarl
  869, // Alcremie
  873, // Frosmoth
  879, // Copperajah
  884, // Duraludon
  887, // Dragapult
  // === Gen 8 cross-gen evolutions ===
  899, // Wyrdeer
  900, // Kleavor
  901, // Ursaluna
  902, // Basculegion
  903, // Sneasler
  904, // Overqwil
  905, // Enamorus
  // === Gen 9 finals & strong singles ===
  908, // Meowscarada
  911, // Skeledirge
  914, // Quaquaval
  916, // Oinkologne
  918, // Spidops
  920, // Lokix
  923, // Pawmot
  925, // Maushold
  927, // Dachsbun
  930, // Arboliva
  934, // Garganacl
  936, // Armarouge
  938, // Bellibolt
  940, // Kilowattrel
  942, // Mabosstiff
  944, // Grafaiai
  949, // Brambleghast
  951, // Toedscruel
  957, // Tinkaton
  961, // Wugtrio
  964, // Palafin
  966, // Revavroom
  970, // Glimmora
  972, // Houndstone
  975, // Cetitan
  976, // Veluza
  979, // Annihilape
  980, // Clodsire
  981, // Farigiraf
  982, // Dudunsparce
  983, // Kingambit
  998, // Baxcalibur
  1000, // Gholdengo
  1017, // Ogerpon
  1018, // Archaludon
  1019, // Hydrapple
  // === Gen 9 Paradox Pokémon ===
  984, // Great Tusk
  985, // Scream Tail
  986, // Brute Bonnet
  987, // Flutter Mane
  988, // Slither Wing
  989, // Sandy Shocks
  990, // Iron Treads
  991, // Iron Bundle
  992, // Iron Hands
  993, // Iron Jugulis
  994, // Iron Moth
  995, // Iron Thorns
];

// ──────────────────────────────────────────────────────────────
// RARITY 4 — Épique (1.5%) — Sub-legendaries, Ultra Beasts
// ──────────────────────────────────────────────────────────────
export const RARITY_4_POOL: number[] = [
  // === Gen 1 ===
  144, // Articuno
  145, // Zapdos
  146, // Moltres
  // === Gen 2 ===
  243, // Raikou
  244, // Entei
  245, // Suicune
  // === Gen 3 ===
  377, // Regirock
  378, // Regice
  379, // Registeel
  380, // Latias
  381, // Latios
  // === Gen 4 ===
  480, // Uxie
  481, // Mesprit
  482, // Azelf
  485, // Heatran
  486, // Regigigas
  488, // Cresselia
  // === Gen 5 ===
  638, // Cobalion
  639, // Terrakion
  640, // Virizion
  641, // Tornadus
  642, // Thundurus
  645, // Landorus
  // === Gen 7 Tapus & Ultra Beasts ===
  785, // Tapu Koko
  786, // Tapu Lele
  787, // Tapu Bulu
  788, // Tapu Fini
  793, // Nihilego
  794, // Buzzwole
  795, // Pheromosa
  796, // Xurkitree
  797, // Celesteela
  798, // Kartana
  799, // Guzzlord
  803, // Poipole
  805, // Stakataka
  806, // Blacephalon
  // === Gen 8 ===
  891, // Kubfu
  894, // Regieleki
  895, // Regidrago
  896, // Glastrier
  897, // Spectrier
  // === Gen 9 ===
  1001, // Wo-Chien
  1002, // Chien-Pao
  1003, // Ting-Lu
  1004, // Chi-Yu
  1005, // Roaring Moon
  1006, // Iron Valiant
  1009, // Walking Wake
  1010, // Iron Leaves
  1020, // Gouging Fire
  1021, // Raging Bolt
  1022, // Iron Boulder
  1023, // Iron Crown
];

// ──────────────────────────────────────────────────────────────
// RARITY 5 — Légendaire (0.5%) — Box legendaries & mythicals
// ──────────────────────────────────────────────────────────────
export const RARITY_5_POOL: number[] = [
  // === Gen 1 ===
  150, // Mewtwo
  151, // Mew
  // === Gen 2 ===
  249, // Lugia
  250, // Ho-Oh
  251, // Celebi
  // === Gen 3 ===
  382, // Kyogre
  383, // Groudon
  384, // Rayquaza
  385, // Jirachi
  386, // Deoxys
  // === Gen 4 ===
  483, // Dialga
  484, // Palkia
  487, // Giratina
  491, // Darkrai
  492, // Shaymin
  493, // Arceus
  // === Gen 5 ===
  494, // Victini
  643, // Reshiram
  644, // Zekrom
  646, // Kyurem
  647, // Keldeo
  648, // Meloetta
  649, // Genesect
  // === Gen 6 ===
  716, // Xerneas
  717, // Yveltal
  718, // Zygarde
  719, // Diancie
  720, // Hoopa
  721, // Volcanion
  // === Gen 7 ===
  791, // Solgaleo
  792, // Lunala
  800, // Necrozma
  801, // Magearna
  802, // Marshadow
  804, // Naganadel
  807, // Zeraora
  // === Gen 8 ===
  888, // Zacian
  889, // Zamazenta
  890, // Eternatus
  892, // Urshifu
  893, // Zarude
  898, // Calyrex
  // === Gen 9 ===
  1007, // Koraidon
  1008, // Miraidon
  1024, // Terapagos
  1025, // Pecharunt
];

// All pools indexed by rarity for quick lookup
export const RARITY_POOLS: Record<RarityTier, number[]> = {
  1: RARITY_1_POOL,
  2: RARITY_2_POOL,
  3: RARITY_3_POOL,
  4: RARITY_4_POOL,
  5: RARITY_5_POOL,
};

// ──────────────────────────────────────────────────────────────
// TYPE POOLS — PokeAPI type IDs (1=Normal,2=Fighting,3=Flying,4=Poison,
//   5=Ground,6=Rock,7=Bug,8=Ghost,9=Steel,10=Fire,11=Water,12=Grass,
//   13=Electric,14=Psychic,15=Ice,16=Dragon,17=Dark,18=Fairy)
// ──────────────────────────────────────────────────────────────
export const TYPE_POOLS: Record<number, number[]> = {
  // Normal (1)
  1: [16, 19, 21, 52, 83, 84, 108, 113, 115, 128, 132, 133, 137, 143, 161,
      163, 174, 202, 203, 206, 234, 235, 241, 261, 263, 276, 287, 293, 327,
      351, 352, 396, 399, 417, 441, 446, 504, 506, 519, 531, 626, 676, 765,
      766, 775, 819, 831, 915],
  // Fighting (2)
  2: [56, 66, 106, 107, 236, 296, 447, 532, 538, 539, 559, 624, 674, 739,
      760, 766, 870, 979, 984, 992],
  // Flying (3)
  3: [16, 21, 84, 276, 396, 519, 627, 661, 701, 722, 731, 821, 912, 940, 962, 973],
  // Poison (4)
  4: [23, 29, 32, 41, 43, 69, 88, 316, 690, 747, 757],
  // Ground (5)
  5: [50, 74, 104, 111, 194, 231, 328, 339, 449, 529, 551, 622, 659, 749, 843, 980],
  // Rock (6)
  6: [74, 95, 111, 138, 140, 304, 345, 347, 408, 410, 524, 557, 564, 566,
      688, 696, 698, 712, 744, 932, 968, 974, 989, 995],
  // Bug (7)
  7: [10, 13, 46, 48, 165, 167, 265, 266, 268, 283, 290, 313, 314, 401, 415,
      540, 557, 595, 636, 664, 736, 742, 751, 824, 850, 917, 919],
  // Ghost (8)
  8: [92, 200, 353, 355, 442, 607, 622, 679, 708, 710, 854, 885, 971, 1012],
  // Steel (9)
  9: [81, 304, 374, 436, 599, 624, 707, 772, 878, 957, 990, 993, 995, 1018],
  // Fire (10)
  10: [4, 37, 58, 77, 155, 218, 228, 240, 255, 322, 390, 498, 607, 636, 653,
       667, 725, 757, 813, 850, 909, 935, 1020],
  // Water (11)
  11: [7, 54, 60, 72, 86, 90, 98, 116, 118, 129, 158, 170, 183, 258, 270, 283,
       318, 339, 341, 366, 501, 535, 564, 656, 690, 692, 728, 746, 747, 751,
       816, 833, 846, 882, 883, 912, 963, 977],
  // Grass (12)
  12: [1, 43, 69, 102, 152, 187, 191, 252, 270, 273, 285, 315, 345, 387, 420,
       495, 546, 548, 556, 590, 650, 672, 704, 722, 753, 761, 810, 829, 906,
       928, 948, 950, 1011],
  // Electric (13)
  13: [25, 81, 100, 125, 172, 179, 239, 309, 403, 417, 479, 522, 587, 595,
       694, 777, 835, 848, 871, 937, 939, 921, 991, 994, 1021],
  // Psychic (14)
  14: [63, 79, 96, 102, 122, 124, 177, 196, 202, 280, 325, 343, 360, 374,
       436, 474, 574, 577, 605, 677, 786, 856, 876, 985, 987, 1015],
  // Ice (15)
  15: [86, 220, 238, 361, 363, 478, 615, 712, 872, 874, 875, 883, 896, 974, 985, 991],
  // Dragon (16)
  16: [147, 148, 333, 371, 372, 443, 610, 633, 704, 714, 782, 885, 996, 984,
       988, 993, 998, 1007, 1008, 1019, 1020, 1021],
  // Dark (17)
  17: [197, 198, 215, 228, 261, 302, 318, 353, 359, 430, 442, 509, 551, 559,
       570, 624, 629, 633, 686, 827, 859, 941, 983, 1001, 1002, 1003, 1004, 1005],
  // Fairy (18)
  18: [35, 39, 173, 174, 175, 183, 209, 280, 303, 546, 574, 669, 682, 684,
       700, 702, 742, 764, 777, 778, 868, 906, 926, 1016],
};

// ──────────────────────────────────────────────────────────────
// THEMATIC POOLS — Category-specific Pokemon with boosted spawn rate
// ──────────────────────────────────────────────────────────────
export const THEMATIC_POOLS: Record<string, number[]> = {
  sport: [
    56,  // Mankey
    66,  // Machop
    106, // Hitmonlee
    107, // Hitmonchan
    236, // Tyrogue
    237, // Hitmontop
    447, // Riolu
    532, // Timburr
    538, // Throh
    539, // Sawk
    559, // Scraggy
    214, // Heracross
    128, // Tauros
    626, // Bouffalant
    739, // Crabrawler
    760, // Bewear
    766, // Passimian
    870, // Falinks
    979, // Annihilape
    984, // Great Tusk
    992, // Iron Hands
  ],
  admin: [
    63,  // Abra
    81,  // Magnemite
    100, // Voltorb
    137, // Porygon
    374, // Beldum
    436, // Bronzor
    479, // Rotom
    599, // Klink
    605, // Elgyem
    531, // Audino
    772, // Type: Null
    826, // Orbeetle
    993, // Iron Jugulis
    994, // Iron Moth
  ],
  writing: [
    92,  // Gastly
    201, // Unown
    235, // Smeargle
    353, // Shuppet
    355, // Duskull
    442, // Spiritomb
    570, // Zorua
    574, // Gothita
    607, // Litwick
    577, // Solosis
    708, // Phantump
    778, // Mimikyu
    854, // Sinistea
    971, // Greavard
  ],
  creative: [
    35,  // Clefairy
    132, // Ditto
    175, // Togepi
    235, // Smeargle
    351, // Castform
    352, // Kecleon
    315, // Roselia
    420, // Cherubi
    546, // Cottonee
    548, // Petilil
    741, // Oricorio
    778, // Mimikyu
    868, // Milcery
    869, // Alcremie
    1012, // Poltchageist
  ],
  housework: [
    50,  // Diglett
    69,  // Bellsprout
    187, // Hoppip
    191, // Sunkern
    194, // Wooper
    270, // Lotad
    285, // Shroomish
    399, // Bidoof
    449, // Hippopotas
    556, // Maractus
    829, // Gossifleur
    831, // Wooloo
    915, // Lechonk
    926, // Fidough
  ],
  drawing: [
    235, // Smeargle (LE Pokémon du dessin)
    132, // Ditto
    175, // Togepi
    351, // Castform
    352, // Kecleon
    315, // Roselia
    420, // Cherubi
    546, // Cottonee
    574, // Gothita
    607, // Litwick
    741, // Oricorio
    944, // Grafaiai (artiste graffiti!)
    987, // Flutter Mane
    1012, // Poltchageist
  ],
  craft: [
    74,  // Geodude
    95,  // Onix
    304, // Aron
    436, // Bronzor
    599, // Klink
    81,  // Magnemite
    205, // Forretress
    227, // Skarmory
    624, // Pawniard
    529, // Drilbur
    679, // Honedge
    878, // Cufant
    879, // Copperajah
    957, // Tinkaton
    990, // Iron Treads
  ],
  business: [
    63,  // Abra
    133, // Eevee
    137, // Porygon
    196, // Espeon
    374, // Beldum
    479, // Rotom
    403, // Shinx
    447, // Riolu
    531, // Audino
    179, // Mareep
    773, // Silvally
    826, // Orbeetle
    965, // Varoom
    1000, // Gholdengo
  ],
  other: [
    132, // Ditto
    133, // Eevee
    172, // Pichu
    174, // Igglybuff
    175, // Togepi
    327, // Spinda
    351, // Castform
    441, // Chatot
    531, // Audino
    741, // Oricorio
    774, // Minior
    777, // Togedemaru
    778, // Mimikyu
    924, // Tandemaus
  ],
};
