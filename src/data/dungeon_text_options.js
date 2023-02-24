const OOT_DUNGEONS = ["FREE", "DEKU", "DCVN", "JABU",
  "FRST", "FIRE", "WATR", "SHDW", "SPRT"];
const OOT_DUNGEONS_LABELS = ["Free", "Deku Tree", "Dodongo's Cavern", "Jabu Jabu",
  "Forest Temple", "Fire Temple", "Water Temple", "Shadow Temple", "Spirit Temple"];

const MM_DUNGEONS = ["WOOD", "SNOW", "GBAY", "STONE"];
const MM_DUNGEON_LABELS = ["Woodfall Temple", "Snowhead Temple", "Great Bay Temple",
  "Stone Tower Temple"];

const UNKNOWN_IDENTIFIER = "";
const UNKNOWN_LABEL = "Unknown";

export const dungeonTextOptions = {
  "oot": {
    identifiers: [ UNKNOWN_IDENTIFIER, ...OOT_DUNGEONS ],
    labels: [ UNKNOWN_LABEL, ...OOT_DUNGEONS_LABELS ]
  },
  "mm": {
    identifiers: [ UNKNOWN_IDENTIFIER, ...MM_DUNGEONS ],
    labels: [ UNKNOWN_LABEL, ...MM_DUNGEON_LABELS]
  },
  "ootmm": {
    identifiers: [ UNKNOWN_IDENTIFIER, ...OOT_DUNGEONS, ...MM_DUNGEONS ],
    labels: [ UNKNOWN_LABEL, ...OOT_DUNGEONS_LABELS, ...MM_DUNGEON_LABELS ]
  }
};