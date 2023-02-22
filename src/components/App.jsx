import React from 'react';

import itemDict from 'assets/button_dictionary.json';
import 'style/App.css';

import { Item } from 'components/Item'

// This component has code that runs every time it is rendered that only needs to run on the first time it is rendered.
// I believe there is a hook that can be used to resolve this. So look into it


// This element will be defined externally and selected via a dropdown or url parameter and passed to this componentent
const tempTrackerLayoutIdList = [
"OOT_BOW", "MM_BOW", "OOT_SLINGSHOT", "OOT_BOOMERANG", "OOT_HAMMER", "OOT_MIRROR_SHIELD",
"OOT_OCARINA", "OOT_BEANS", "OOT_GERUDO_CARD", "MM_FIRE_ARROWS", "MM_ICE_ARROWS", "MM_LIGHT_ARROWS",
"OOT_PROGRESSIVE_STRENGTH",
]


const initializeTrackerState = (layout) => {
  const initialState = layout.reduce((tot, item) => {
    if (item.type === "simple_toggle") {
      return { ...tot, [item.name]: false };
    } if (item.type === "cycle") {
      const defaultValue = item.opts.disableZero ? 0 : 1;
      return { ...tot, [item.name]: defaultValue };
    } else {
      console.error(Error(`Item type ${item.type} has no defined behavior in initializeTrackerState.`));
    }
  }, {});
  console.log(initialState);
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
      {trackerLayout.map((item) =>
          <Item
            key={item.name}
            itemInfo={item}
            itemState={trackerState[item.name]}
            updateSingleItem={updateSingleItem}
          />
      )}
    </div>
  );
}
