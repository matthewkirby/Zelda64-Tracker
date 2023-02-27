import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from './Dropdown';

import 'style/dungeon_dropdown_box.css';

import { defaultLayoutKey, trackerLayoutList } from 'data/ItemLayoutList';


const settingsOptions = {
  dungeonListKey: [
    {value: "oot", label: "OoT"},
    {value: "mm", label: "MM"},
    {value: "ootmm", label: "OoTMM"}
  ],
  identifierType: [{value: "text", label: "text"}],
  interactionType: [
    {value: "dropdown", label: "Dropdown"},
    {value: "inElement", label: "In Element"}
  ]
};

const generateSettingsInputs = () => {
  return "poop";
}


// Same component for initial setup and editing settings after
// Some settings will be disabled once the tracker is built? Maybe idk
// Only tab on screen to start (and expanded). Once generated, tab at the bottom collapsed

const TrackerSettings = ({ settingsHooks, trackerOptions }) => {

  const showLayoutSettings = trackerOptions.layoutKey !== defaultLayoutKey;

  // Make a state variable that holds settings, then a button to
  // copy these local settings to the tracker level state and build
  const [localSettings, setLocalSettings] = React.useState(trackerOptions);
  console.log(localSettings.layoutKey)



  // Build tracker layout dropdown options
  const layoutOptions = Object.keys(trackerLayoutList).reduce((tot, k) => {
    return [ ...tot, { value: k, label: trackerLayoutList[k].label } ];
  }, [{ value: defaultLayoutKey, label: "Select a layout" }])

  return (
    <>
      {/* Reset Button */}
      <Dropdown
        key={"tl"}
        label={"Tracker Layout"}
        options={layoutOptions}
        value={trackerOptions.layoutKey}
        onChange={(v) => settingsHooks.setLayoutKey(v)}
      />
      {showLayoutSettings && generateSettingsInputs()}
    </>
  );
};

TrackerSettings.propTypes = {
  settingsHooks: PropTypes.shape({ setLayoutKey: PropTypes.func.isRequired }),
  trackerOptions: PropTypes.shape({ layoutKey: PropTypes.string.isRequired })
}

export { TrackerSettings };