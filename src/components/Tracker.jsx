import React from 'react';

import 'style/tracker.css';

import { ExpandingTab } from './ExpandableTab';
import { ItemGrid } from './ItemGrid';

import { defaultLayoutKey, trackerLayoutList } from 'data/ItemLayoutList';
import { TrackerSettings } from './TrackerSettings';
import { FirebaseSettings } from './FirebaseSettings';
import { firebaseResetDb } from 'firebase.js';
import { initFirebase } from 'firebase.js';

import { useSearchParams } from 'react-router-dom';


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
        // "height": `${itemSize}${sizeUnits}`,
        // "width": `${itemSize}${sizeUnits}`
      }
    },
    trackerStyle: {
      gridTemplateColumns: `repeat(${nCols}, ${itemSize}${sizeUnits})`,
      gridAutoRows: `${itemSize}${sizeUnits}`,
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
      },
      defaultDRO: {}
    };
  }

  const defaultTrackerLayout = trackerLayoutList[layoutKey];
  const defaultGeometry = defaultTrackerLayout.geometry;

  const trackerOptions = {
    layoutKey: layoutKey,
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
    trackerOptions: calcDerivedTrackerProps(trackerOptions),
    defaultDRO: defaultTrackerLayout.dungeonRewardOptions
  };
};

const loadUrlParameters = (urlParams) => {
  return {
    // Layout Settings
    layoutKey: urlParams.get("layout") ?? null,
    interactionType: urlParams.get("interactionType") ?? null,

    // Firebase settings
    defaultUseFirebase: urlParams.get("sync") === 'true',
    defaultFirebaseRoomid: urlParams.get("room_id") ?? null,
    defaultFirebasePassword: urlParams.get("password") ?? null,

    // URL only settings
    hideOptions: urlParams.get("hideOptions") === 'true'
  };
};

export function Tracker() {
  tempCountRenders += 1;
  // console.log(`Rendering Tracker #${tempCountRenders}`);

  // Parse URL Parameter ==============================================
  const [urlParams, setUrlParams] = useSearchParams();
  const parsedUrlParams = loadUrlParameters(urlParams);
  const advancedHideOptions = parsedUrlParams.hideOptions;
  // console.log(parsedUrlParams);

  const updateURL = (keyToChange, newValue) => {
    const newParams = {}
    for (const [key, value] of urlParams.entries()) {
      if (key === keyToChange) {
        newParams[key] = newValue
      } else {
        newParams[key] = value;
      }
    }
    setUrlParams(newParams);
  };

  // Firebase Connection ==============================================
  const [useFirebase, setUseFirebase] = React.useState(parsedUrlParams.defaultUseFirebase);
  const [firebaseRoomId, setFirebaseRoomId] = React.useState(parsedUrlParams.defaultFirebaseRoomid);
  const [firebasePassword, setFirebasePassword] = React.useState(parsedUrlParams.defaultFirebasePassword);
  // console.log(`sync: ${useFirebase}\nid: ${firebaseRoomId}\npw: ${firebasePassword}`, )

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
  const [layoutKey, setLayoutKey] = React.useState(parsedUrlParams.layoutKey ?? localStorage.getItem("layoutKey") ?? defaultLayoutKey);
  const buildTracker = layoutKey !== defaultLayoutKey;
  const { trackerLayoutIds, trackerOptions, defaultDRO } = loadTrackerByKey(layoutKey);

  // Dungeon rewards
  const [dListKey, setDListKey] = React.useState(localStorage.getItem("dListKey") ?? defaultDRO.dungeonListKey ?? "");
  const [dIndentifierType, setDIdentifierType] = React.useState(localStorage.getItem("dIndentifierType") ?? defaultDRO.identifierType ?? "");
  const [dInteractionType, setDInteractionType] = React.useState(parsedUrlParams.interactionType ?? localStorage.getItem("dInteractionType") ?? defaultDRO.interactionType ?? "");
  const dungeonRewardOptions = {
    dungeonListKey: dListKey,
    identifierType: dIndentifierType,
    interactionType: dInteractionType
  };

  // Handle tracker initialization
  const changeTrackerLayout = (newLayoutKey) => {
    if (layoutKey === defaultLayoutKey) {
      const newVisibleTabs = { ...visibleTabs };
      Object.keys(newVisibleTabs).forEach(k => {
        newVisibleTabs[k] = k !== "settings" ? true : false;
      });
      setVisibleTabs(newVisibleTabs);
    }
    updateURL("layout", newLayoutKey);
    setLayoutKey(newLayoutKey);
    if (newLayoutKey !== defaultLayoutKey) {
      const dro = trackerLayoutList[newLayoutKey].dungeonRewardOptions;
      setDListKey(dro.dungeonListKey);
      setDIdentifierType(dro.identifierType);
      setDInteractionType(dro.interactionType);
    }
  };

  // Tracker Settings ===================================================
  // const [visibleTabs, setVisibleTabs] = React.useState({ drewards: true, settings: !buildTracker, dbsync: false });
  const [visibleTabs, setVisibleTabs] = React.useState({ drewards: false, settings: true, dbsync: false });

  // Hook to update tab visibility
  const toggleTabVisibility = (tabKey) => {
    const currentState = visibleTabs[tabKey];
    const newState = { ...visibleTabs, [tabKey]: !currentState };
    setVisibleTabs(newState);
  }

  // useEffect Hooks =======================================================
  React.useEffect(() => {
    localStorage.setItem("layoutKey", layoutKey);
  }, [layoutKey]);

  React.useEffect(() => {
    localStorage.setItem("dListKey", dungeonRewardOptions.dungeonListKey);
    localStorage.setItem("dIndentifierType", dungeonRewardOptions.identifierType);
    localStorage.setItem("dInteractionType", dungeonRewardOptions.interactionType);
  }, [dungeonRewardOptions]);

  React.useEffect(() => {
    if (!useFirebase) {
      localStorage.setItem("trackerState", JSON.stringify(trackerState));
    }
  }, [useFirebase, trackerState]);

  React.useEffect(() => {
    if (useFirebase) {
      initFirebase(firebaseRoomId, firebasePassword, setTrackerState);
    }
  }, [useFirebase]);

  // Render ===============================================================
  return (
    <>
      {buildTracker && <ItemGrid
        trackerLayoutIds={trackerLayoutIds}
        trackerOptions={{ ...trackerOptions, dungeonRewardOptions: dungeonRewardOptions }}
        visibleTabs={{ state: visibleTabs, "hook": toggleTabVisibility }}
        useFirebase={useFirebase}
        trackerState={trackerState}
        setTrackerState={setTrackerState}
      />}
      <ExpandingTab
        key="tracker-options" label="Tracker Settings" isVisible={visibleTabs.settings}
        onClick={() => toggleTabVisibility("settings")} trackerOptions={trackerOptions}
        hidden={advancedHideOptions}
      >
        <TrackerSettings key={"ts"}
          variableSettings={{
            layoutKey: [trackerOptions.layoutKey, changeTrackerLayout],
            dungeonListKey: [dListKey, setDListKey],
            identifierType: [dIndentifierType, setDIdentifierType],
            interactionType: [dInteractionType, setDInteractionType]
          }}
          resetTracker={resetTracker}
        />
      </ExpandingTab>
      <ExpandingTab
        key="firebase-options" label="Sync Tracker Over Web" isVisible={visibleTabs.dbsync}
        onClick={() => toggleTabVisibility("dbsync")} trackerOptions={trackerOptions}
        hidden={advancedHideOptions}
      >
        <FirebaseSettings
          firebaseControls={{useFirebase: useFirebase, setUseFirebase: setUseFirebase}}
        />
      </ExpandingTab>
    </>
  );
}
