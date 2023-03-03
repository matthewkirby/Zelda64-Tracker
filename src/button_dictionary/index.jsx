import toggles from 'button_dictionary/toggle_dictionary.json';
import cycles from 'button_dictionary/cycle_dictionary.json';
import composites from 'button_dictionary/composite_dictionary.json';
import badges from 'button_dictionary/badge_dictionary.json';
import counters from 'button_dictionary/counter_dictionary.json';
import dungeonRewards from 'button_dictionary/dungeon_reward_dictionary.json';

// Prepare the toggles
export const toggleDict = toggles.reduce((tot, item) => {
  if (typeof item === "string")
    return { ...tot, [item]: { "type": "toggle", "name": item } };
  return { ...tot, [item.name]: { "type": "toggle", "name": item.name, ...item } };
}, {});

const jointDict = { "cycle": cycles, "composite": composites, "badge": badges, "counter": counters, "dungeonReward": dungeonRewards };
const complexDict = Object.keys(jointDict).reduce((tot, type) => {
  const oneDict = Object.keys(jointDict[type]).reduce((itot, item) => {
    if (item !== "TEMPLATE") {
      return { ...itot, [item]: { "type": type, ...jointDict[type][item] } };
    }
  }, {})
  return { ...tot, ...oneDict };
}, {});

export const itemDict = { ...toggleDict, ...complexDict };