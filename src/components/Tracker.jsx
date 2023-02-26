import React from 'react';

import 'style/tracker.css';
import 'style/itemgrid.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'
import { DungeonDropdownBox } from './DungeonDropdownBox';
import { ExpandingTab } from './ExpandableTab';

import { trackerLayoutList } from 'data/ItemLayoutList';

// This is temp code to track how many times I am rendering
let tempCountRenders = 0;
// Replace this with null and only show the setup options
const tempDefaultLayout = "rsl_no_keys";




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

const calcDerivedTrackerProps = (trackerLayout) => {
  const { nCols, itemSize, columnGap, rowGap } = trackerLayout.geometry;
  const trackerSize = nCols*itemSize + (nCols-1)*columnGap;
  const sizeUnits = trackerLayout.geometry.units;

  const derivedProps = {
    trackerSize: { 
      number: trackerSize,
      style: { width: `${trackerSize}${sizeUnits}` }
    },
    itemSize: {
      number: itemSize,
      style: {
        "height": `${itemSize}${sizeUnits}`,
        "width": `${itemSize}${sizeUnits}`
      }
    },
    trackerStyle: {
      gridTemplateColumns: `repeat(${nCols}, ${itemSize}${sizeUnits})`,
      rowGap: `${rowGap}${sizeUnits}`,
      columnGap: `${columnGap}${sizeUnits}`
    }
  };

  return { ...trackerLayout, calc: derivedProps};
};

const loadTrackerByKey = (layoutKey) => {
  const defaultTrackerLayout = trackerLayoutList[layoutKey];
  const defaultGeometry = defaultTrackerLayout.geometry;

  const trackerOptions = {
    dungeonRewardOptions: defaultTrackerLayout.dungeonRewardOptions,
    geometry: {
      nCols: defaultTrackerLayout.nCols,
      units: defaultGeometry.units,
      itemSize: defaultGeometry.defaultItemSize,
      rowGap: defaultGeometry.defaultRowGap,
      columnGap: defaultGeometry.defaultColumnGap
    }   
  };

  return {
    trackerLayoutIds: defaultTrackerLayout.layout,
    trackerOptions: calcDerivedTrackerProps(trackerOptions)
  };
};

export function Tracker() {
  tempCountRenders += 1;
  console.log(`Rendering #${tempCountRenders}`)

  // Set all the tracker options from the selected layout  
  const [layoutKey, setLayoutKey] = React.useState(tempDefaultLayout); // TODO: Change default
  const { trackerLayoutIds, trackerOptions } = loadTrackerByKey(layoutKey);

  // Set up the tracker's item grid
  const trackerLayout = trackerLayoutIds.reduce((tot, item) => {
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

  // Define tracker state variables
  const [trackerState, setTrackerState] = React.useState(initializeTrackerState(trackerLayout));
  const [visibleTabs, setVisibleTabs] = React.useState({ drewards: true });

  // Hook to update an item's state
  const updateSingleItem = (pendingState) => {
    const newState = { ...trackerState, ...pendingState };
    setTrackerState(newState);
  }

  // Hook to update tab visibility
  const toggleTabVisibility = (tabKey) => {
    const currentState = visibleTabs[tabKey];
    const newState = { ...visibleTabs, [tabKey]: !currentState };
    setVisibleTabs(newState);
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
          key="drewards" label="Dungeon Rewards" isVisible={visibleTabs.drewards}
          onClick={() => toggleTabVisibility("drewards")} trackerOptions={trackerOptions}
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
