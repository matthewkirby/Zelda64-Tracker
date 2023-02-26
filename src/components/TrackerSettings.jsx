import PropTypes from 'prop-types';
import { Dropdown } from './Dropdown';

import 'style/dungeon_dropdown_box.css';

import { defaultLayoutKey, trackerLayoutList } from 'data/ItemLayoutList';

// Same component for initial setup and editing settings after
// Some settings will be disabled once the tracker is built? Maybe idk
// Only tab on screen to start (and expanded). Once generated, tab at the bottom collapsed

const TrackerSettings = ({ settingsHooks, trackerOptions }) => {

  // Make a state variable that holds settings, then a button to
  // copy these local settings to the tracker level state and build



  // options have a value and label prop

  // Build tracker layout dropdown options
  const layoutOptions = Object.keys(trackerLayoutList).reduce((tot, k) => {
    return [ ...tot, { value: k, label: trackerLayoutList[k].label } ];
  }, [{ value: defaultLayoutKey, label: "Select a layout" }])

  return (
    <Dropdown
      key={"tl"}
      label={"Tracker Layout"}
      options={layoutOptions}
      value={trackerOptions.layoutKey}
      onChange={(v) => settingsHooks.setLayoutKey(v)}
    />
  );
};

TrackerSettings.propTypes = {
  settingsHooks: PropTypes.shape({ setLayoutKey: PropTypes.func.isRequired }),
  trackerOptions: PropTypes.shape({ layoutKey: PropTypes.string.isRequired })
}

export { TrackerSettings };