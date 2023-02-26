// This is a js file instead of json as that allows me in the future to define whole blocks that can be
// added piecemeal to layouts instead of copying it everytime

const layoutChunks = {
  oot_child_songs: ["OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SARIAS_SONG_WCHECK", "OOT_SUNS_SONG_WCHECK", "OOT_SONG_OF_TIME_WCHECK", "OOT_SONG_OF_STORMS_WCHECK"],
  oot_warp_songs: ["OOT_MINUET_WCHECK", "OOT_BOLERO_WCHECK", "OOT_SERENADE_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK", "OOT_PRELUDE_WCHECK"]
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
      "OOT_PROGRESSIVE_SCALE", "OOT_GOLDEN_SKULLTULA", { type: "squish", items:["OOT_KOKIRI_EMERALD_LABELED", "OOT_GORON_RUBY_LABELED", "OOT_ZORA_SAPPHIRE_LABELED"], nCols: 2}, "OOT_TRIFORCE", "OOT_BOTTLE_RUTOS",
      "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
      "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
      "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
      "OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SARIAS_SONG_WCHECK", "OOT_SUNS_SONG_WCHECK", "OOT_SONG_OF_TIME_WCHECK", "OOT_SONG_OF_STORMS_WCHECK",
      "OOT_MINUET_WCHECK", "OOT_BOLERO_WCHECK", "OOT_SERENADE_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK", "OOT_PRELUDE_WCHECK"
    ]
  }
}


export { trackerLayoutList };