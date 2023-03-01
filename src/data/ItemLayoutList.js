// This is a js file instead of json as that allows me in the future to define whole blocks that can be
// added piecemeal to layouts instead of copying it everytime

// Anything here can be used in a layout by spreading
const layoutChunks = {
  oot_child_songs_wcheck: ["OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SARIAS_SONG_WCHECK", "OOT_SUNS_SONG_WCHECK", "OOT_SONG_OF_TIME_WCHECK", "OOT_SONG_OF_STORMS_WCHECK"],
  oot_warp_songs_wcheck: ["OOT_MINUET_WCHECK", "OOT_BOLERO_WCHECK", "OOT_SERENADE_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK", "OOT_PRELUDE_WCHECK"],
  oot_labeled_stones: ["OOT_KOKIRI_EMERALD_LABELED", "OOT_GORON_RUBY_LABELED", "OOT_ZORA_SAPPHIRE_LABELED"],

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
      "OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED", "OOT_LIGHT_MEDALLION_LABELED",
      "OOT_PROGRESSIVE_SCALE", "OOT_GOLDEN_SKULLTULA", { type: "squish", items: [...layoutChunks.oot_labeled_stones], nCols: 2}, "OOT_TRIFORCE", "OOT_BOTTLE_RUTOS",
      "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
      "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
      "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
      ...layoutChunks.oot_child_songs_wcheck, ...layoutChunks.oot_warp_songs_wcheck
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
      "OOT_KOKIRI_SWORD", "OOT_SLINGSHOT", "BLANK",
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
      ...layoutChunks.oot_labeled_stones, "OOT_PROGRESSIVE_SCALE", "OOT_PROGRESSIVE_HOOKSHOT",
        "OOT_HAMMER", ...layoutChunks.mm_labeled_remains,
      "OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_PROGRESSIVE_STRENGTH", "OOT_BOMB_BAG",
        "OOT_MIRROR_SHIELD", "MM_DEKU_MASK", "MM_GORON_MASK", "MM_ZORA_MASK", "MM_FIERCE_DEITY_MASK",
      "OOT_SHADOW_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED", "OOT_LIGHT_MEDALLION_LABELED", "OOT_BOTTLE_RUTOS", "OOT_BOOMERANG",
        "OOT_GO_MODE", "MM_BOW", "BLANK", "MM_MAGIC_WLENS", "MM_BOTTLE",
      "OOT_MAGIC_WLENS", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_COMPOSITE_SPELLS", "OOT_COMPOSITE_BOOTS",
        "MM_GO_MODE", "MM_OATH_TO_ORDER", "MM_BOMB_BAG", "MM_COMPOSITE_IKANA_ACCESS", "MM_HOOKSHOT",
      "OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SONG_OF_STORMS_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK",
        "MM_EPONAS_SONG_WCHECK", "MM_SONATA_WCHECK", "MM_LULLABY_WCHECK", "MM_BOSSA_NOVA_WCHECK", "MM_ELEGY_WCHECK"
    ]
  }
}

const defaultLayoutKey = "uninitialized";


export { defaultLayoutKey, trackerLayoutList };