import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from './Dropdown';

import { Button } from '@mui/material';


import 'style/dungeon_dropdown_box.css';

import { defaultLayoutKey, trackerLayoutList } from 'data/ItemLayoutList';


const settingsOptions = {
  dungeonListKey: {
    label: "Dungeon Reward Labels",
    setterKey: "dungeonRewardOptions",
    opts: [
      {value: "oot", label: "Ocarina of Time"},
      {value: "mm", label: "Majora's Mask"},
      {value: "ootmm", label: "OoT/MM Combo"}
    ]
  },
  identifierType: {
    label: "Dungeon Identifiers",
    setterKey: "dungeonRewardOptions",
    opts: [
      {value: "text", label: "Dungeon Names"}
    ],
    disabled: true
  },
  interactionType: {
    label: "Dungeon Reward Interaction",
    setterKey: "dungeonRewardOptions",
    opts: [
      {value: "dropdown", label: "Dropdown"},
      {value: "inElement", label: "Click and Shift+Click"}
    ]
  }
};


// Same component for initial setup and editing settings after
// Some settings will be disabled once the tracker is built? Maybe idk
// Only tab on screen to start (and expanded). Once generated, tab at the bottom collapsed

const TrackerSettings = ({ variableSettings, resetTracker }) => {

  const showLayoutSettings = variableSettings.layoutKey[0] !== defaultLayoutKey;

  const generateSettingsInputs = () => {
    return Object.keys(variableSettings).map((setting) => {
      if (setting === "layoutKey") { return null; }
      console.log(`>> ${setting}: ${variableSettings[setting][0]}`)
      const settingDetails = settingsOptions[setting];
      return (
        <Dropdown
          key={setting}
          label={settingDetails.label}
          options={settingDetails.opts}
          value={variableSettings[setting][0]}
          onChange={(v) => variableSettings[setting][1](v)}
          disabled={settingDetails.disabled ?? false}
        />
      );
    });
  }

  // Build tracker layout dropdown options
  const layoutOptions = Object.keys(trackerLayoutList).reduce((tot, k) => {
    return [ ...tot, { value: k, label: trackerLayoutList[k].label } ];
  }, [{ value: defaultLayoutKey, label: "Select a layout" }])

  return (
    <div className="one-column-grid">
      <Button
        key={"resetbutton"}
        variant="contained"
        color="error"
        onClick={() => resetTracker({})}
      >Reset Tracker</Button>
      <Dropdown
        key={"tl"}
        label={"Tracker Layout"}
        options={layoutOptions}
        value={variableSettings.layoutKey[0]}
        onChange={(v) => variableSettings.layoutKey[1](v)}
      />
      {showLayoutSettings && generateSettingsInputs()}
    </div>
  );
};

TrackerSettings.propTypes = {
  setters: PropTypes.shape({ setLayoutKey: PropTypes.func.isRequired }),
  trackerOptions: PropTypes.shape({ layoutKey: PropTypes.string.isRequired })
}

export { TrackerSettings };