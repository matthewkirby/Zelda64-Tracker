import { Toggle } from "./Toggle";
import { toggleDict } from "button_dictionary";

const locLookup = { 0: "top-left", 1: "top-right", 2: "bottom-left", 3: "bottom-right" };

const DEFAULT_STATE = false;

export const Badge = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {
  const isCheckmark = itemInfo.type === "checkToggle";
  const baseItem = isCheckmark ? toggleDict[itemInfo.name] : toggleDict[itemInfo.base];
  const badgeItem = isCheckmark ? toggleDict["CHECKMARK"] : toggleDict[itemInfo.badge];
  const badgeName = isCheckmark ? `${baseItem.name}_${badgeItem.name}` : badgeItem.name;
  const badgeLocation = isCheckmark ? 1 : itemInfo.location ?? 3;

  // Set up the states
  const baseState = trackerState[baseItem.name] ?? DEFAULT_STATE;
  const badgeState = trackerState[badgeName] ?? DEFAULT_STATE;

  // Set up the button interaction
  const onInteract = (slot) => {
    const newState = ![baseState, badgeState][slot];
    const name = slot === 0 ? baseItem.name : badgeName;
    updateSingleItem({ [name]: newState },  newState === DEFAULT_STATE);
  };

  // Render
  return (
    <div className="badge"
      style={{...trackerOptions.calc.itemSize.style, ...extraStyles}}
      onClick={() => onInteract(0)}
      onContextMenu={() => onInteract(1)}
    >
      <Toggle
        key="toggle"
        itemState={baseState}
        extraClasses={["base-item"]}
        itemInfo={baseItem}
        disableInteraction={true}
        inheritSize={true}
      />
      <Toggle
        key="badge"
        itemState={badgeState}
        extraClasses={[locLookup[badgeLocation]]}
        itemInfo={{...badgeItem}}
        falseClass="itm-hidden"
        disableInteraction={true}
        inheritSize={true}
      />
    </div>
  );
};