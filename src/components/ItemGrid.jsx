import React from 'react';
import PropTypes from 'prop-types';

import 'style/tracker.css';
import 'style/itemgrid.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'
import { DungeonDropdownBox } from './DungeonDropdownBox';
import { ExpandingTab } from './ExpandableTab';

const initializeTrackerState = (layout) => {
  const initialState = layout.reduce((tot, item) => {
    if (item.type === "simple_toggle") {
      return { ...tot, [item.name]: false };
    } if (item.type === "cycle") {
      const defaultValue = item.disableZero ? 0 : 1;
      return { ...tot, [item.name]: defaultValue };
    } else if (item.type === "badge" || item.type === "composite") {
      return { ...tot, [item.name]: [false, false] };
    } else if (item.type === "counter") {
      return { ...tot, [item.name]: 0 };
    } else if(item.type === "dungeonReward") {
      return { ...tot, [item.name]: 0, [item.toggle]: false }
    } else if (item.type === "squish") {
      const squishItems = item.items;
      const subDefaults = initializeTrackerState(squishItems);
      return { ...tot, ...subDefaults };
    } else {
      console.error(Error(`Item ${item.name} with type ${item.type} has no defined behavior in initializeTrackerState.`));
    }
  }, {});
  return initialState;
}

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

const ItemGrid = ({ trackerLayoutIds, trackerOptions, visibleTabs }) => {
  const trackerLayout = expandIdList(trackerLayoutIds);

  // Define tracker state variables
  const [trackerState, setTrackerState] = React.useState(initializeTrackerState(trackerLayout));

  // Hook to update an item's state
  const updateSingleItem = (pendingState) => {
    const newState = { ...trackerState, ...pendingState };
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