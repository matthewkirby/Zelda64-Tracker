import React from 'react';
import PropTypes from 'prop-types';

import 'style/tracker.css';
import 'style/itemgrid.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'
import { DungeonDropdownBox } from './DungeonDropdownBox';
import { ExpandingTab } from './ExpandableTab';

const expandIdList = (trackerLayoutIds) => {
  return trackerLayoutIds.reduce((tot, item) => {
    if (typeof item === "string") {
      return [ ...tot, {"name": item, ...itemDict[item]} ];
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

const ItemGrid = ({ trackerLayoutIds, trackerOptions, visibleTabs }) => {
  tempCountRenders += 1;
  console.log(`Rendering Itemgrid #${tempCountRenders}`)



  const trackerLayout = expandIdList(trackerLayoutIds);

  // Define tracker state variables
  const [trackerState, setTrackerState] = React.useState({});
  
  // Hook to update an item's state
  const updateSingleItem = (pendingState, isDefault=false) => {
    let newState = { ...trackerState };
    if (isDefault && Object.keys(pendingState) in trackerState) {
      delete newState[Object.keys(pendingState)];
    } else {
      newState = { ...newState, ...pendingState };
    }
    setTrackerState(newState);
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
  })
}

export { ItemGrid };