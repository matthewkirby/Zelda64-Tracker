// This is a js file instead of json as that allows me in the future to define whole blocks that can be
// added piecemeal to layouts instead of copying it everytime

// Helper function to convert a toggle item to a checkToggle (toggle item with a checkmark badge)
const defCT = (item) => {
  return { name: item, type: "checkToggle" };
}

// Anything here can be used in a layout by spreading
const layoutChunks = {
  oot_child_songs_wcheck: [defCT("OOT_ZELDAS_LULLABY"), defCT("OOT_EPONAS_SONG"), defCT("OOT_SARIAS_SONG"), defCT("OOT_SUNS_SONG"), defCT("OOT_SONG_OF_TIME"), defCT("OOT_SONG_OF_STORMS")],
  oot_warp_songs_wcheck: [defCT("OOT_MINUET"), defCT("OOT_BOLERO"), defCT("OOT_SERENADE"), defCT("OOT_NOCTURNE"), defCT("OOT_REQUIEM"), defCT("OOT_PRELUDE")],
  oot_stones: ["OOT_KOKIRI_EMERALD", "OOT_GORON_RUBY", "OOT_ZORA_SAPPHIRE"],
  oot_labeled_stones: ["OOT_KOKIRI_EMERALD_LABELED", "OOT_GORON_RUBY_LABELED", "OOT_ZORA_SAPPHIRE_LABELED"],
  oot_labeled_medallions_ootr: ["OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED", "OOT_LIGHT_MEDALLION_LABELED"],
  oot_labeled_medallions_ootmm: ["OOT_LIGHT_MEDALLION_LABELED", "OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED"],

  mm_labeled_remains: ["MM_ODOLWAS_REMAINS_LABELED", "MM_GOHTS_REMAINS_LABELED", "MM_GYORGS_REMAINS_LABELED", "MM_TWINMOLDS_REMAINS_LABELED"],
  mm_top_songs_wcheck: [defCT("MM_SONG_OF_TIME"), defCT("MM_SONG_OF_HEALING"), defCT("MM_EPONAS_SONG"), defCT("MM_SONG_OF_SOARING"), defCT("MM_SONG_OF_STORMS")],
  mm_bottom_songs_wcheck: [defCT("MM_SONATA_OF_AWAKENING"), defCT("MM_GORON_LULLABY"), defCT("MM_NEW_WAVE_BOSSA_NOVA"), defCT("MM_ELEGY_OF_EMPTINESS"), defCT("MM_OATH_TO_ORDER")]
}


const trackerLayoutList = {
  rsl_no_keys: {
    label: "RSL (No Keys)",
    nCols: 6,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "oot",
      identifierType: "text",
      interactionType: "dropdown"
    },
    layout: [
      ...layoutChunks.oot_labeled_medallions_ootr,
      "OOT_PROGRESSIVE_SCALE", "OOT_GOLDEN_SKULLTULA", { type: "inline", items: [...layoutChunks.oot_labeled_stones], nCols: 2}, "OOT_TRIFORCE", "OOT_BOTTLE_RUTOS",
      "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
      "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
      "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_FAIRY_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
      ...layoutChunks.oot_child_songs_wcheck,
      ...layoutChunks.oot_warp_songs_wcheck
    ]
  },
  tsg_multiworld: {
    label: "TSG Multiworld",
    nCols: 3,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "oot",
      identifierType: "text",
      interactionType: "inElement"
    },
    layout: [
      "OOT_KOKIRI_SWORD", "OOT_SLINGSHOT", "OOT_GO_MODE",
      "OOT_BOMB_BAG", "OOT_BOW", "OOT_FOREST_MEDALLION_LABELED",
      "OOT_BOOMERANG", "OOT_HAMMER", "OOT_FIRE_MEDALLION_LABELED",
      "OOT_PROGRESSIVE_HOOKSHOT", "OOT_COMPOSITE_SPELLS", "OOT_WATER_MEDALLION_LABELED",
      "OOT_BOTTLE_RUTOS", "OOT_COMPOSITE_ARROWS", "OOT_SHADOW_MEDALLION_LABELED",
      "OOT_MIRROR_SHIELD", "OOT_PROGRESSIVE_STRENGTH", "OOT_SPIRIT_MEDALLION_LABELED",
      "OOT_COMPOSITE_BOOTS", "OOT_PROGRESSIVE_SCALE", "OOT_LIGHT_MEDALLION_LABELED",
      "OOT_KOKIRI_EMERALD", "OOT_GORON_RUBY", "OOT_ZORA_SAPPHIRE"
    ]
  },
  ootmm_wide: {
    label: "OoTMM Wide",
    nCols: 10,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "ootmm",
      identifierType: "text",
      interactionType: "dropdown"
    },
    layout: [
      ...layoutChunks.oot_labeled_medallions_ootmm, ...layoutChunks.mm_labeled_remains,

      { type: "subgrid", items: [ ...layoutChunks.oot_stones ], size: 1 }, "OOT_BOMB_BAG", "OOT_BOW", "OOT_PROGRESSIVE_HOOKSHOT", "OOT_HAMMER",
        "MM_COMPOSITE_IKANA_ACCESS", "MM_DEKU_MASK", "MM_GORON_MASK_WKEG", "MM_ZORA_MASK", "MM_FIERCE_DEITY_MASK",

      "OOT_BOOMERANG", "OOT_MAGIC_WLENS", "OOT_BOTTLE_RUTOS", "OOT_COMPOSITE_SPELLS", "OOT_COMPOSITE_BOOTS",
        "MM_HOOKSHOT", "MM_BOW", "MM_BOTTLE", "MM_MAGIC_WLENS", "MM_BOMB_BAG_WBLAST_MASK",

      "OOT_PROGRESSIVE_STRENGTH", "OOT_PROGRESSIVE_SCALE", "OOT_MIRROR_SHIELD", "OOT_COMPOSITE_ARROWS",
        { type: "textBorder", color: "gold", text: "Go Mode", item: { type: "inline", items: [ defCT("OOT_GO_MODE"), defCT("MM_GO_MODE") ], nCols: 2 } },
        defCT("MM_OATH_TO_ORDER"), "MM_FIRE_ARROWS", "MM_ICE_ARROWS", "MM_LIGHT_ARROWS",

      defCT("OOT_ZELDAS_LULLABY"), defCT("OOT_EPONAS_SONG"), defCT("OOT_SONG_OF_STORMS"), defCT("OOT_NOCTURNE"), defCT("OOT_REQUIEM"),
        defCT("MM_SONATA_OF_AWAKENING"), defCT("MM_GORON_LULLABY"), defCT("MM_NEW_WAVE_BOSSA_NOVA"), defCT("MM_ELEGY_OF_EMPTINESS"), defCT("MM_EPONAS_SONG")
    ]
  },
  ootmm: {
    label: "OoTMM",
    nCols: 8,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 5,
      defaultColumnGap: 8
    },
    dungeonRewardOptions: {
      dungeonListKey: "ootmm",
      identifierType: "text",
      interactionType: "dropdown"
    },
    layout: [
      { type: "inline", items: [...layoutChunks.oot_labeled_stones, ...layoutChunks.oot_labeled_medallions_ootmm], nCols: 8},

      "OOT_FAIRY_OCARINA", "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS",
      "OOT_COMPOSITE_SPELLS", "OOT_BOTTLE_RUTOS",

      "OOT_KOKIRI_SWORD", "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_FIRE_ARROWS", "OOT_LIGHT_ARROWS", "OOT_HAMMER",
      "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",

      "OOT_GOLDEN_SKULLTULA", "OOT_PROGRESSIVE_SCALE", "OOT_BEANS", "OOT_COMPOSITE_TUNICS", "OOT_WEIRD_EGG",
      "OOT_SKULL_MASK", "OOT_MASK_OF_TRUTH", "OOT_CLAIM_CHECK",

      ...layoutChunks.oot_child_songs_wcheck,
      { type: "subgrid", items: ["OOT_POCKET_CUCCO", "OOT_COJIRO", "OOT_ODD_MUSHROOM", "OOT_ODD_POTION", "OOT_POACHERS_SAW",
        "OOT_BROKEN_SWORD", "OOT_PRESCRIPTION", "OOT_EYEBALL_FROG", "OOT_EYE_DROPS"], size: 2 },
      ...layoutChunks.oot_warp_songs_wcheck,

      { type: "inline", items: ["BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", ], nCols: 8},

      "MM_POSTMANS_HAT", "MM_ALL_NIGHT_MASK", "MM_BLAST_MASK", "MM_GREAT_FAIRYS_MASK", "MM_DEKU_MASK", "MM_BOW",
      "MM_BOMB_BAG_WKEG", "MM_HOOKSHOT",
      
      "MM_KEATON_MASK", "MM_BREMEN_MASK", "MM_BUNNY_HOOD", "MM_DON_GEROS_MASK", "MM_GORON_MASK", "MM_FIRE_ARROWS",
      "MM_ICE_ARROWS", "MM_LIGHT_ARROWS",

      "MM_ROMANIS_MASK", "MM_KAFEIS_MASK", "MM_COUPLES_MASK", "MM_MASK_OF_TRUTH", "MM_ZORA_MASK", "MM_PICTOGRAPH_BOX",
      "MM_ODOLWAS_REMAINS_LABELED", "MM_GOHTS_REMAINS_LABELED",

      "MM_KAMAROS_MASK", "MM_GIBDO_MASK", "MM_GAROS_MASK", "MM_CAPTAINS_HAT", "MM_BOTTLE", "MM_LETTER_TO_MAMA",
      "MM_GYORGS_REMAINS_LABELED", "MM_TWINMOLDS_REMAINS_LABELED",

      ...layoutChunks.mm_top_songs_wcheck, "MM_OCARINA",
      { type: "subgrid", items: ["MM_MOONS_TEAR", "MM_LAND_TITLE_DEED", "MM_SWAMP_TITLE_DEED", "MM_MOUNTAIN_TITLE_DEED", "MM_OCEAN_TITLE_DEED",
        "MM_ROOM_KEY", "MM_LETTER_TO_KAFEI", "MM_PENDANT_OF_MEMORIES", "MM_GOLD_DUST"], size: 2 },
      ...layoutChunks.mm_bottom_songs_wcheck, "MM_MAGIC_WLENS"
       
    ]
  },
  mmr: {
    label: "MMR",
    nCols: 6,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "oot",
      identifierType: "text",
      interactionType: "dropdown"
    },
    layout: [
      "BLANK", ...layoutChunks.mm_labeled_remains, "BLANK",
      "MM_POSTMANS_HAT", "MM_ALL_NIGHT_MASK", "MM_BLAST_MASK", "MM_STONE_MASK", "MM_GREAT_FAIRYS_MASK", "MM_DEKU_MASK",
      "MM_KEATON_MASK", "MM_BREMEN_MASK", "MM_BUNNY_HOOD", "MM_DON_GEROS_MASK", "MM_MASK_OF_SCENTS", "MM_GORON_MASK",
      "MM_ROMANIS_MASK", "MM_CIRCUS_LEADERS_MASK", "MM_KAFEIS_MASK", "MM_COUPLES_MASK", "MM_MASK_OF_TRUTH", "MM_ZORA_MASK", 
      "MM_KAMAROS_MASK", "MM_GIBDO_MASK", "MM_GAROS_MASK", "MM_CAPTAINS_HAT", "MM_GIANTS_MASK", "MM_FIERCE_DEITY_MASK",
      ...layoutChunks.mm_top_songs_wcheck, "MM_OCARINA",
      ...layoutChunks.mm_bottom_songs_wcheck, "MM_MAGIC_WLENS",
      "MM_BOW", "MM_FIRE_ARROWS", "MM_ICE_ARROWS", "MM_LIGHT_ARROWS", "MM_HOOKSHOT", "MM_BOMB_BAG_WKEG",
      "MM_PICTOGRAPH_BOX", "MM_BOTTLE", "MM_MIRROR_SHIELD", "MM_LETTER_TO_KAFEI", "MM_LETTER_TO_MAMA", "MM_ROOM_KEY",
      "MM_MOONS_TEAR", "MM_LAND_TITLE_DEED", "MM_SWAMP_TITLE_DEED", "MM_MOUNTAIN_TITLE_DEED", "MM_OCEAN_TITLE_DEED",  "MM_GOLD_DUST"
    ]
  },








  test: {
    label: "Test",
    nCols: 10,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "ootmm",
      identifierType: "text",
      interactionType: "dropdown"
    },
    layout: [
      "OOT_BOOMERANG", "OOT_MAGIC_WLENS", "OOT_BOTTLE_RUTOS", "OOT_COMPOSITE_SPELLS", "OOT_COMPOSITE_BOOTS",
        "MM_HOOKSHOT", "MM_BOW", "MM_BOTTLE", "MM_MAGIC_WLENS", "MM_BOMB_BAG_WBLAST_MASK",

      { type: "subgrid", items: [ "OOT_BOOMERANG", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_BOOTS" ], size: 1 },
      { type: "subgrid", items: [ ...layoutChunks.oot_labeled_stones ], size: 1 },
      "OOT_FOREST_MEDALLION_LABELED",
      { type: "subgrid", items: [ "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED" ], size: 2 },
      { type: "inline", items: [ ...layoutChunks.mm_labeled_remains ], nCols: 2,}
    ]
  },
  test2: {
    label: "t2",
    nCols: 4,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "ootmm",
      identifierType: "text",
      interactionType: "inElement"
    },
    layout: [
      "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_MIRROR_SHIELD", "OOT_COMPOSITE_ARROWS",

      { type: "textBorder", color: "gold", text: "Go Mode", item: "MM_GO_MODE" },
      { type: "textBorder", color: "gold", text: "Go Mode", item:{ type: "inline", items: [ "OOT_GO_MODE", "MM_GO_MODE" ], nCols: 2 } },
      
      { type: "textBorder", color: "gold", text: "Go Mode", item: { type: "subgrid", items: [ ...layoutChunks.oot_stones ], size: 1 } },
      { type: "textBorder", color: "gold", text: "Go Mode", item: { type: "subgrid", items: [ ...layoutChunks.oot_stones ], size: 2 } },
      
      
      "OOT_PROGRESSIVE_STRENGTH", "OOT_PROGRESSIVE_SCALE", "OOT_MIRROR_SHIELD", "OOT_COMPOSITE_ARROWS", "OOT_COMPOSITE_SPELLS"
    ]
  },


  icon_library: {
    label: "Icon Library (181+2)",
    nCols: 12,
    geometry: {
      units: "px",
      defaultItemSize: 50,
      defaultRowGap: 10,
      defaultColumnGap: 10
    },
    dungeonRewardOptions: {
      dungeonListKey: "ootmm",
      identifierType: "text",
      interactionType: "inElement"
    },
    layout: [
      "BLANK",
      
      "OOT_FOREST_MEDALLION", "OOT_FIRE_MEDALLION", "OOT_WATER_MEDALLION", "OOT_SHADOW_MEDALLION", "OOT_SPIRIT_MEDALLION", "OOT_LIGHT_MEDALLION", "OOT_KOKIRI_EMERALD",
      "OOT_GORON_RUBY", "OOT_ZORA_SAPPHIRE", "OOT_BOW", "OOT_SLINGSHOT", "OOT_BOOMERANG", "OOT_BOMB_BAG", "OOT_HAMMER", "OOT_MIRROR_SHIELD", "OOT_FAIRY_OCARINA", "OOT_BEANS",
      "OOT_GERUDO_CARD", "OOT_BOTTLE", "OOT_MAGIC", "OOT_LENS_OF_TRUTH", "OOT_DINS_FIRE", "OOT_FARORES_WIND", "OOT_NAYRUS_LOVE", "OOT_FIRE_ARROWS", "OOT_ICE_ARROWS",
      "OOT_LIGHT_ARROWS", "OOT_WEIRD_EGG", "OOT_ZELDAS_LETTER", "OOT_KEATON_MASK", "OOT_SKULL_MASK", "OOT_SPOOKY_MASK", "OOT_BUNNY_HOOD", "OOT_MASK_OF_TRUTH", "OOT_POCKET_CUCCO",
      "OOT_COJIRO", "OOT_ODD_MUSHROOM", "OOT_ODD_POTION", "OOT_POACHERS_SAW", "OOT_BROKEN_SWORD", "OOT_PRESCRIPTION", "OOT_EYEBALL_FROG", "OOT_EYE_DROPS", "OOT_CLAIM_CHECK",
      "OOT_KOKIRI_SWORD", "OOT_MASTER_SWORD", "OOT_GORON_TUNIC", "OOT_ZORA_TUNIC", "OOT_IRON_BOOTS", "OOT_HOVER_BOOTS", "OOT_HYLIAN_SHIELD", "OOT_DEKU_SHIELD",
      
      "OOT_ZELDAS_LULLABY", "OOT_EPONAS_SONG", "OOT_SARIAS_SONG", "OOT_SUNS_SONG", "OOT_SONG_OF_TIME", "OOT_SONG_OF_STORMS", "OOT_MINUET", "OOT_BOLERO", "OOT_SERENADE", "OOT_NOCTURNE",
      "OOT_REQUIEM", "OOT_PRELUDE",
      
      "MM_ODOLWAS_REMAINS", "MM_GOHTS_REMAINS", "MM_GYORGS_REMAINS", "MM_TWINMOLDS_REMAINS",
      "MM_POSTMANS_HAT", "MM_ALL_NIGHT_MASK", "MM_BLAST_MASK", "MM_STONE_MASK", "MM_GREAT_FAIRYS_MASK", "MM_DEKU_MASK", "MM_KEATON_MASK", "MM_BREMEN_MASK", "MM_BUNNY_HOOD",
      "MM_DON_GEROS_MASK", "MM_MASK_OF_SCENTS", "MM_GORON_MASK", "MM_ROMANIS_MASK", "MM_CIRCUS_LEADERS_MASK", "MM_KAFEIS_MASK", "MM_COUPLES_MASK", "MM_MASK_OF_TRUTH", "MM_ZORA_MASK",
      "MM_KAMAROS_MASK", "MM_GIBDO_MASK", "MM_GAROS_MASK", "MM_CAPTAINS_HAT", "MM_GIANTS_MASK", "MM_FIERCE_DEITY_MASK", "MM_OCARINA", "MM_MAGIC", "MM_LENS_OF_TRUTH", "MM_BOMB_BAG",
      "MM_POWDER_KEG", "MM_BOW", "MM_FIRE_ARROWS", "MM_ICE_ARROWS", "MM_LIGHT_ARROWS", "MM_HOOKSHOT", "MM_MIRROR_SHIELD", "MM_BEANS", "MM_PICTOGRAPH_BOX", "MM_BOMBERS_NOTEBOOK",
      "MM_HEROS_SHIELD", "MM_MIRROR_SHIELD", "MM_KOKIRI_SWORD", "MM_RAZOR_SWORD", "MM_GILDED_SWORD", "MM_GREAT_FAIRYS_SWORD", "MM_SONG_OF_TIME",
      "MM_SONG_OF_HEALING", "MM_EPONAS_SONG", "MM_SONG_OF_SOARING", "MM_SONG_OF_STORMS", "MM_SONATA_OF_AWAKENING", "MM_GORON_LULLABY", "MM_NEW_WAVE_BOSSA_NOVA",
      "MM_ELEGY_OF_EMPTINESS", "MM_OATH_TO_ORDER", "OOT_RUTOS_LETTER",
      "MM_MOONS_TEAR", "MM_LAND_TITLE_DEED", "MM_SWAMP_TITLE_DEED", "MM_MOUNTAIN_TITLE_DEED", "MM_OCEAN_TITLE_DEED", "MM_ROOM_KEY", "MM_LETTER_TO_KAFEI", "MM_PENDANT_OF_MEMORIES",
      "MM_LETTER_TO_MAMA", "MM_GOLD_DUST", "MM_STRAY_FAIRY_ECT", "OOT_GO_MODE", "MM_GO_MODE", "OOT_RUTOS_LETTER_BADGE", "OOT_LENS_OF_TRUTH_BADGE",
      "MM_LENS_OF_TRUTH_BADGE", "OOT_BOTTLE_RUTOS", "OOT_PROGRESSIVE_STRENGTH", "OOT_PROGRESSIVE_SCALE", "OOT_PROGRESSIVE_HOOKSHOT", "OOT_PROGRESSIVE_SWORD", "OOT_PROGRESSIVE_SHIELD",
      "OOT_PROGRESSIVE_WALLET", "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_PROGRESSIVE_ADULT_TRADE", "OOT_PROGRESSIVE_ADULT_TRADE_SHORTENED", "MM_PROGRESSIVE_WALLET", "MM_PROGRESSIVE_SWORD",
      "MM_PROGRESSIVE_SHIELD", "OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED",
      "OOT_LIGHT_MEDALLION_LABELED", "OOT_KOKIRI_EMERALD_LABELED", "OOT_GORON_RUBY_LABELED", "OOT_ZORA_SAPPHIRE_LABELED", "MM_ODOLWAS_REMAINS_LABELED", "MM_GOHTS_REMAINS_LABELED",
      "MM_GYORGS_REMAINS_LABELED", "MM_TWINMOLDS_REMAINS_LABELED", "OOT_GOLDEN_SKULLTULA", "OOT_TRIFORCE", "MM_BOTTLE", "MM_SSH_TOKEN", "MM_OSH_TOKEN", "MM_STRAY_FAIRY_WFT",
      "MM_STRAY_FAIRY_SHT", "MM_STRAY_FAIRY_GBT", "MM_STRAY_FAIRY_STT",  "OOT_COMPOSITE_SPELLS", "OOT_COMPOSITE_ARROWS", "OOT_COMPOSITE_BOOTS", "OOT_COMPOSITE_TUNICS",
      "MM_COMPOSITE_IKANA_ACCESS", "OOT_MAGIC_WLENS",  "MM_MAGIC_WLENS", "MM_BOMB_BAG_WKEG", "MM_GORON_MASK_WKEG", "MM_BOMB_BAG_WBLAST_MASK",

      "CHECKMARK"
    ]
  },
}

const defaultLayoutKey = "uninitialized";

export { defaultLayoutKey, trackerLayoutList };