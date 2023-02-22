import toggles from 'button_dictionary/toggle_dictionary.json';
import cycles from 'button_dictionary/cycle_dictionary.json';
import composites from 'button_dictionary/composite_dictionary.json';
import badges from 'button_dictionary/badge_dictionary.json';

// Prepare the toggles
const toggleDict = toggles.reduce((tot, item) => { return { ...tot, [item]: { "type": "simple_toggle" } }; }, {});

// Add base child to badges with isCheckmark
for (const item in badges) {
  if (badges[item].isCheckmark) {
    badges[item]["badge"] = "CHECKMARK";
  }
}

const jointDict = { "cycle": cycles, "composite": composites, "badge": badges };
const complexDict = Object.keys(jointDict).reduce((tot, type) => {
  const oneDict = Object.keys(jointDict[type]).reduce((itot, item) => {
    return { ...itot, [item]: { "type": type, ...jointDict[type][item] } };
  }, {})
  return { ...tot, ...oneDict };
}, {});

export const itemDict = { ...toggleDict, ...complexDict };