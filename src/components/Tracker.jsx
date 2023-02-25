import React from 'react';

import 'style/tracker.css';

import { itemDict } from 'button_dictionary';
import { Item } from 'components/Item'
import { DungeonDropdownBox } from './DungeonDropdownBox';
import { ExpandingTab } from './ExpandableTab';

// This component has code that runs every time it is rendered that only needs to run on the first time it is rendered.
// I believe there is a hook that can be used to resolve this. So look into it

// This is temp code to track how many times I am rendering
let tempTracker = 0;

// This element will be defined externally and selected via a dropdown or url parameter and passed to this componentent
const tempTrackerLayoutIdList = [
  "OOT_FOREST_MEDALLION_LABELED", "OOT_FIRE_MEDALLION_LABELED", "OOT_WATER_MEDALLION_LABELED", "OOT_SHADOW_MEDALLION_LABELED", "OOT_SPIRIT_MEDALLION_LABELED", "OOT_LIGHT_MEDALLION_LABELED",
  "OOT_PROGRESSIVE_SCALE", "OOT_GOLDEN_SKULLTULA", { type: "squish", items:["OOT_KOKIRI_EMERALD_LABELED", "OOT_GORON_RUBY_LABELED", "OOT_ZORA_SAPPHIRE_LABELED"], nCols: 2}, "OOT_TRIFORCE", "OOT_BOTTLE_RUTOS",
  "OOT_SLINGSHOT", "OOT_BOMB_BAG", "OOT_BOOMERANG", "OOT_PROGRESSIVE_STRENGTH", "OOT_MAGIC_WLENS", "OOT_COMPOSITE_SPELLS",
  "OOT_PROGRESSIVE_HOOKSHOT", "OOT_BOW", "OOT_COMPOSITE_ARROWS", "OOT_HAMMER", "OOT_COMPOSITE_BOOTS", "OOT_MIRROR_SHIELD",
  "OOT_PROGRESSIVE_CHILD_TRADE", "OOT_OCARINA", "OOT_BEANS", "OOT_KOKIRI_SWORD", "OOT_GERUDO_CARD", "OOT_COMPOSITE_TUNICS",
  "OOT_ZELDAS_LULLABY_WCHECK", "OOT_EPONAS_SONG_WCHECK", "OOT_SARIAS_SONG_WCHECK", "OOT_SUNS_SONG_WCHECK", "OOT_SONG_OF_TIME_WCHECK", "OOT_SONG_OF_STORMS_WCHECK",
  "OOT_MINUET_WCHECK", "OOT_BOLERO_WCHECK", "OOT_SERENADE_WCHECK", "OOT_NOCTURNE_WCHECK", "OOT_REQUIEM_WCHECK", "OOT_PRELUDE_WCHECK"
]

// The square size will be another parent parameter, default is 50px
const tempItemSize = null;

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



// Props from parent: trackerLayoutIdList, itemWidth
export function Tracker() {
  // Set up the tracker's item grid
  const trackerLayoutIdList = [ ...tempTrackerLayoutIdList ]; // This is a temp line. It will be a prop from a higher level comp with setup options.
  const trackerLayout = trackerLayoutIdList.reduce((tot, item) => {
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

  // console.log(trackerLayout);

  // Build style object to pass to each item
  const itemSize = tempItemSize ?? 50; // Replace temp variable with prop passed from parent
  const itemSizeStyles = { "height": `${itemSize}px`, "width": `${itemSize}px`};
  

  // =====================================================================
  // This will all be done in parent class as state variable once its written
  // dungeonKeyList: "oot", "mm", "ootmm" || identifierType: "text", "imageTODO" || interactionType: "dropdown", "inElement"
  const metaOptions = {
    dungeonRewardOptions: { dungeonListKey: "ootmm", identifierType: "text", interactionType: "dropdown" },
    itemSize: { number: itemSize, style: itemSizeStyles },
    trackerOptions: { nCols: 6, rowGap: 10, columnGap: 10 }
  };
  const trackerOptions = metaOptions;
  trackerOptions.layoutOptions = trackerOptions.trackerOptions;

  const { nCols, columnGap } = trackerOptions.trackerOptions;
  const width = trackerOptions.itemSize.number;
  const trackerWidth = nCols*width + (nCols-1)*columnGap;
  trackerOptions.trackerSize = { style: { width: `${trackerWidth}px` }, number: trackerWidth };
  // ====================================================================

  // Define tracker state variables
  const [trackerState, setTrackerState] = React.useState(initializeTrackerState(trackerLayout));
  const [visibleTabs, setVisibleTabs] = React.useState({ drewards: true });

  tempTracker += 1;
  console.log(`Rendering #${tempTracker}`)

  // Define the inline styles for the tracker
  const trackerStyles = {
    gridTemplateColumns: `repeat(${metaOptions.trackerOptions.nCols}, ${metaOptions.itemSize.number}px)`,
    rowGap: `${metaOptions.trackerOptions.rowGap}px`,
    columnGap: `${metaOptions.trackerOptions.columnGap}px`
  }

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
      <div className='tracker' id='tracker' style={trackerStyles} onContextMenu={(e)=>e.preventDefault()}>
        {trackerLayout.map((item, i) =>
          <Item
            key={i}
            itemInfo={item}
            trackerState={trackerState}
            updateSingleItem={updateSingleItem}
            metaOptions={metaOptions}
          />
        )}
      </div>
      {metaOptions.dungeonRewardOptions.interactionType === "dropdown" &&
        <ExpandingTab
          key="drewards" label="Dungeon Rewards" isVisible={visibleTabs.drewards}
          onClick={() => toggleTabVisibility("drewards")} trackerOptions={trackerOptions}
        >
          <DungeonDropdownBox
            key={"ddb"}
            trackerState={trackerState}
            trackerLayout={trackerLayout}
            updateSingleItem={updateSingleItem}
            metaOptions={metaOptions}
          />
        </ExpandingTab>
      }
    </>
  );
}
