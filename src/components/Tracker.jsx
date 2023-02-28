import React from 'react';

import 'style/tracker.css';

import { ExpandingTab } from './ExpandableTab';
import { ItemGrid } from './ItemGrid';

import { defaultLayoutKey, trackerLayoutList } from 'data/ItemLayoutList';
import { TrackerSettings } from './TrackerSettings';
import { FirebaseSettings } from './FirebaseSettings';
import { firebaseResetDb } from 'firebase.js';
import { initFirebase } from 'firebase.js';



// This is temp code to track how many times I am rendering
let tempCountRenders = 0;

const calcDerivedTrackerSize = (units, geometry) => {
  const trackerSize = geometry !== null
    ? geometry.nCols*geometry.itemSize + (geometry.nCols-1)*geometry.columnGap
    : 500;
  return {
    number: trackerSize,
    style: { width: `${trackerSize}${units}` }
  };

};

const calcDerivedTrackerProps = (trackerLayout) => {
  const { nCols, itemSize, columnGap, rowGap } = trackerLayout.geometry;
  const sizeUnits = trackerLayout.geometry.units;

  const derivedProps = {
    trackerSize: calcDerivedTrackerSize(sizeUnits, trackerLayout.geometry),
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

  if (layoutKey === defaultLayoutKey) {
    return {
      trackerLayoutIds: null,
      trackerOptions: {
        layoutKey: defaultLayoutKey,
        calc: { trackerSize: calcDerivedTrackerSize("px", null) }
      }
    };
  }

  const defaultTrackerLayout = trackerLayoutList[layoutKey];
  const defaultGeometry = defaultTrackerLayout.geometry;

  const trackerOptions = {
    layoutKey: layoutKey,
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
  console.log(`Rendering Tracker #${tempCountRenders}`)

  // Firebase Connection ==============================================
  const [useFirebase, setUseFirebase] = React.useState(false);

  // Tracker State ====================================================
  const [trackerState, setTrackerState] = React.useState(() => {
    if (!useFirebase) {
      return JSON.parse(localStorage.getItem("trackerState") ?? '{}');
    } else {
      return {};
    }
  });

  const resetTracker = () => {
    if (!useFirebase) { setTrackerState({}); }
    else { firebaseResetDb(); }
  };

  // Tracker Layout ====================================================
  const [layoutKey, setLayoutKey] = React.useState(localStorage.getItem("layoutKey") ?? defaultLayoutKey);
  const buildTracker = layoutKey !== defaultLayoutKey;
  const { trackerLayoutIds, trackerOptions } = loadTrackerByKey(layoutKey);

  // Hook to handle tracker initialization
  const changeTrackerLayout = (newLayoutKey) => {
    if (layoutKey === defaultLayoutKey) {
      const newVisibleTabs = { ...visibleTabs };
      Object.keys(newVisibleTabs).forEach(k => {
        newVisibleTabs[k] = k !== "settings" ? true : false;
      });
      setVisibleTabs(newVisibleTabs);
    }
    setLayoutKey(newLayoutKey)
  };

  // Tracker Settings ===================================================
  const [visibleTabs, setVisibleTabs] = React.useState({ drewards: true, settings: !buildTracker, dbsync: true });

  // Hook to update tab visibility
  const toggleTabVisibility = (tabKey) => {
    const currentState = visibleTabs[tabKey];
    const newState = { ...visibleTabs, [tabKey]: !currentState };
    setVisibleTabs(newState);
  }

  // useEffect Hooks =======================================================
  React.useEffect(() => {
    localStorage.setItem("layoutKey", layoutKey)
  }, [layoutKey]);

  React.useEffect(() => {
    if (!useFirebase) {
      localStorage.setItem("trackerState", JSON.stringify(trackerState));
    }
  }, [useFirebase, trackerState]);

  React.useEffect(() => {
    if (useFirebase) {
      const roomId = "test";
      initFirebase(roomId, setTrackerState);
    }
  }, [useFirebase]);

  // Render ===============================================================
  return (
    <>
      {buildTracker && <ItemGrid
        trackerLayoutIds={trackerLayoutIds}
        trackerOptions={trackerOptions}
        visibleTabs={{ state: visibleTabs, "hook": toggleTabVisibility }}
        useFirebase={useFirebase}
        trackerState={trackerState}
        setTrackerState={setTrackerState}
      />}
      <ExpandingTab
        key="tracker-options" label="Tracker Settings" isVisible={visibleTabs.settings}
        onClick={() => toggleTabVisibility("settings")} trackerOptions={trackerOptions}
      >
        <TrackerSettings key={"ts"}
          trackerOptions={trackerOptions}
          settingsHooks={{
            setLayoutKey: changeTrackerLayout,
            resetTracker: resetTracker,
          }}
        />
      </ExpandingTab>
      <ExpandingTab
        key="firebase-options" label="Sync Tracker Over Web" isVisible={visibleTabs.dbsync}
        onClick={() => toggleTabVisibility("dbsync")} trackerOptions={trackerOptions}
      >
        <FirebaseSettings
          firebaseControls={{useFirebase: useFirebase, setUseFirebase: setUseFirebase}}
        />
      </ExpandingTab>
    </>
  );
}
