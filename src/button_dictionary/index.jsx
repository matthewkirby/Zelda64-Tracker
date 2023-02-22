import toggles from 'button_dictionary/toggle_dictionary.json';
import cycles from 'button_dictionary/cycle_dictionary.json';
const toggleDict = toggles.reduce((tot, item) => { return { ...tot, [item]: { "type": "simple_toggle" } }; }, {});

const cycleDict = {}
for (let key in cycles) {
  cycleDict[key] = { "type": "cycle", ...cycles[key] };
}

export const itemDict = { ...toggleDict, ...cycleDict };