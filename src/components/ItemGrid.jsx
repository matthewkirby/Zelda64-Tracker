import React from 'react';
import PropTypes from 'prop-types';

import 'style/tracker.css';
import 'style/itemgrid.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'
import { DungeonDropdownBox } from './DungeonDropdownBox';
import { ExpandingTab } from './ExpandableTab';


import { firebaseRemoveRef, firebaseChangeRef } from 'firebase.js';

const expandIdList = (trackerLayoutIds) => {
  return trackerLayoutIds.reduce((tot, item) => {
    if (typeof item === "string") {
      if (!(item in itemDict)) {
        console.log(`Could not find ${item} to place in grid.`);
        return [ ...tot ];
      } else {
        return [ ...tot, {"name": item, ...itemDict[item]} ];
      }
    } else if (typeof item === "object" && item.type === "squish") {
      const squishDict = { "type": "squish", "nCols": item.nCols, "items": [] };
      for (const subItem of item.items) {
        squishDict.items.push({"name": subItem, ...itemDict[subItem]});
      }
      return [ ...tot, squishDict ];
    } else {
      console.log(`Unknown item in grid, ${item}. Skipping.`);
      return [ ...tot ];
    }
  }, []);
}

let tempCountRenders = 0;

const ItemGrid = ({ trackerLayoutIds, trackerOptions, visibleTabs, useFirebase, trackerState, setTrackerState }) => {
  tempCountRenders += 1;
  // console.log(`Rendering Itemgrid #${tempCountRenders}`)

  const trackerLayout = expandIdList(trackerLayoutIds);

  // Hook to update an item's state
  const updateSingleItem = (pendingState, isDefault=false) => {
    updateSingleItem2(Object.keys(pendingState)[0], Object.values(pendingState)[0]);
  }
  const updateSingleItem2 = (item, value, fromDbSync=false) => {
    const isDefaultValue = !Boolean(value);
    let newState = { ...trackerState };

    if (isDefaultValue && item in newState) {
      if (useFirebase && !fromDbSync) { firebaseRemoveRef(item); }
      else { delete newState[item]; }
    } else {
      if (useFirebase && !fromDbSync) { firebaseChangeRef(item, value); }
      else { newState[item] = value; }
    }
    if (!useFirebase || fromDbSync) {
      setTrackerState(newState)
    }
  }




  // Render
  return (
    <>
      <div className='itemgrid' id='tracker' style={trackerOptions.calc.trackerStyle} onContextMenu={(e)=>e.preventDefault()}>
        {trackerLayout.map((item, i) =>
          <Item
            key={i}
            itemInfo={item}
            trackerState={trackerState}
            updateSingleItem={updateSingleItem}
            trackerOptions={trackerOptions}
          />
        )}
      </div>
      {trackerOptions.dungeonRewardOptions.interactionType === "dropdown" &&
        <ExpandingTab
          key="drewards" label="Dungeon Rewards" isVisible={visibleTabs.state.drewards}
          onClick={() => visibleTabs.hook("drewards")} trackerOptions={trackerOptions}
        >
          <DungeonDropdownBox
            key={"ddb"}
            trackerState={trackerState}
            trackerLayout={trackerLayout}
            updateSingleItem={updateSingleItem}
            trackerOptions={trackerOptions}
          />
        </ExpandingTab>
      }
    </>
  );
}

ItemGrid.propTypes = {
  trackerLayoutIds: PropTypes.array.isRequired,
  trackerOptions: PropTypes.shape().isRequired,
  visibleTabs: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.bool).isRequired,
    hook: PropTypes.func.isRequired
  }),
  useFirebase: PropTypes.bool.isRequired
}

export { ItemGrid };