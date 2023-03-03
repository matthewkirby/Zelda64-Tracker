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

  mm_labeled_remains: ["MM_ODOLWAS_REMAINS_LABELED", "MM_GOHTS_REMAINS_LABELED", "MM_GYORGS_REMAINS_LABELED", "MM_TWINMOLDS_REMAINS_LABELED"]
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
      "OOT_PROGRESSIVE_SCALE", "OOT_GOLDEN_SKULLTULA", { type: "squish", items: [...layoutChunks.oot_labeled_stones], nCols: 2}, "OOT_TRIFORCE", "OOT_BOTTLE_RUTOS",
      "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
      "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
      "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
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

      { type: "3x3grid", items: [ ...layoutChunks.oot_stones ], size: 1 }, "OOT_BOMB_BAG", "OOT_BOW", "OOT_PROGRESSIVE_HOOKSHOT", "OOT_HAMMER",
        "MM_COMPOSITE_IKANA_ACCESS", "MM_DEKU_MASK", "MM_GORON_MASK_WKEG", "MM_ZORA_MASK", "MM_FIERCE_DEITY_MASK",

      "OOT_BOOMERANG", "OOT_MAGIC_WLENS", "OOT_BOTTLE_RUTOS", "OOT_COMPOSITE_SPELLS", "OOT_COMPOSITE_BOOTS",
        "MM_HOOKSHOT", "MM_BOW", "MM_BOTTLE", "MM_MAGIC_WLENS", "MM_BOMB_BAG_WBLAST_MASK",

      "OOT_PROGRESSIVE_STRENGTH", "OOT_PROGRESSIVE_SCALE", "OOT_MIRROR_SHIELD", "OOT_COMPOSITE_ARROWS", "OOT_GO_MODE",
        "MM_GO_MODE", defCT("MM_OATH_TO_ORDER"), "MM_FIRE_ARROWS", "MM_ICE_ARROWS", "MM_LIGHT_ARROWS",

      defCT("OOT_ZELDAS_LULLABY"), defCT("OOT_EPONAS_SONG"), defCT("OOT_SONG_OF_STORMS"), defCT("OOT_NOCTURNE"), defCT("OOT_REQUIEM"),
        defCT("MM_SONATA_OF_AWAKENING"), defCT("MM_GORON_LULLABY"), defCT("MM_NEW_WAVE_BOSSA_NOVA"), defCT("MM_ELEGY_OF_EMPTINESS"), defCT("MM_EPONAS_SONG")
    ]
  }
}

const defaultLayoutKey = "uninitialized";

export { defaultLayoutKey, trackerLayoutList };