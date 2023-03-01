const OOT_DUNGEONS = ["DEKU", "DCVN", "JABU", "FRST", "FIRE", "WATR", "SHDW", "SPRT"];
const OOT_DUNGEONS_LABELS = ["Deku Tree", "Dodongo's Cavern", "Jabu Jabu",
  "Forest Temple", "Fire Temple", "Water Temple", "Shadow Temple", "Spirit Temple"];

const MM_DUNGEONS = ["WOOD", "SNOW", "GBAY", "STWR"];
const MM_DUNGEON_LABELS = ["Woodfall Temple", "Snowhead Temple", "Great Bay Temple",
  "Stone Tower Temple"];

const BASE_IDENTIFIERS = ["", "FREE"];
const BASE_LABELS = ["Unknown", "Free"];

export const dungeonTextOptions = {
  "oot": {
    identifiers: [ ...BASE_IDENTIFIERS, ...OOT_DUNGEONS ],
    labels: [ ...BASE_LABELS, ...OOT_DUNGEONS_LABELS ]
  },
  "mm": {
    identifiers: [ ...BASE_IDENTIFIERS, ...MM_DUNGEONS ],
    labels: [ ...BASE_LABELS, ...MM_DUNGEON_LABELS]
  },
  "ootmm": {
    identifiers: [ ...BASE_IDENTIFIERS, ...OOT_DUNGEONS, ...MM_DUNGEONS ],
    labels: [ ...BASE_LABELS, ...OOT_DUNGEONS_LABELS, ...MM_DUNGEON_LABELS ]
  }
};