import React from 'react';

import 'style/App.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'

// console.log(Object.keys(itemDict).length, itemDict)

// This component has code that runs every time it is rendered that only needs to run on the first time it is rendered.
// I believe there is a hook that can be used to resolve this. So look into it


// This element will be defined externally and selected via a dropdown or url parameter and passed to this componentent
// const tempTrackerLayoutIdList = [
//   "OOT_FOREST_MEDALLION", "OOT_FIRE_MEDALLION", "OOT_WATER_MEDALLION", "OOT_SHADOW_MEDALLION", "OOT_SPIRIT_MEDALLION", "OOT_LIGHT_MEDALLION",
//   "OOT_PROGRESSIVE_SCALE", "BLANK", "BLANK", "BLANK", "BLANK", "OOT_BOTTLE_RUTOS",
//   "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
//   "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
//   "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
//   "OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SARIAS_SONG_WCHECK", "OOT_SUNS_SONG_WCHECK", "OOT_SONG_OF_TIME_WCHECK", "OOT_SONG_OF_STORMS_WCHECK",
//   "OOT_MINUET_WCHECK", "OOT_BOLERO_WCHECK", "OOT_SERENADE_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK", "OOT_PRELUDE_WCHECK"
// ]
const tempTrackerLayoutIdList = ["OOT_FOREST_MEDALLION", "MM_BOMB_BAG_WKEG", "OOT_SLINGSHOT", "OOT_COMPOSITE_SPELLS"]

const initializeTrackerState = (layout) => {
  const initialState = layout.reduce((tot, item) => {
    if (item.type === "simple_toggle") {
      return { ...tot, [item.name]: false };
    } if (item.type === "cycle") {
      const defaultValue = item.disableZero ? 0 : 1;
      return { ...tot, [item.name]: defaultValue };
    } else if (item.type === "badge" || item.type === "composite") {
      return { ...tot, [item.name]: [false, false] };
    } else {
      console.error(Error(`Item ${item.name} with type ${item.type} has no defined behavior in initializeTrackerState.`));
    }
  }, {});
  return initialState;
}




export function Tracker() {
  const trackerLayoutIdList = [ ...tempTrackerLayoutIdList ]; // This is a temp line. It will be a prop from a higher level comp with setup options.
  const trackerLayout = trackerLayoutIdList.reduce((tot, item) => {
    return [ ...tot, {"name": [item], ...itemDict[item]} ]
  }, []);

  const [trackerState, setTrackerState] = React.useState(initializeTrackerState(trackerLayout));


  const updateSingleItem = (pendingState) => {
    const newState = { ...trackerState, ...pendingState };
    setTrackerState(newState);
  }
  
  return (
    <div className='tracker' id='tracker' onContextMenu={(e)=>e.preventDefault()}>
      {trackerLayout.map((item, i) =>
        <Item
          key={i}
          itemInfo={item}
          itemState={trackerState[item.name]}
          updateSingleItem={updateSingleItem}
        />
      )}
    </div>
  );
}
