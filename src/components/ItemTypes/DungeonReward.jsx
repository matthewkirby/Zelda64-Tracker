import { Toggle } from "./Toggle";
import { dungeonTextOptions } from "data/dungeon_text_options";
import './dungeon_reward.css';

const DEFAULT_STATE_TOGGLE = false;
const DEFAULT_STATE_IDENTIFIER = 0;

// Element has a toggle and identifier element overlaid on a grid
// TODO: Consider refactoring onInElementInteraction to make the identifier a cycle element
// TODO: Consider merging onInteract and onInElementInteraction
export const DungeonReward = (props) => {

  const { trackerState, itemInfo, extraStyles, updateSingleItem, trackerOptions } = props;
  const toggleName = itemInfo.toggle;
  const { dungeonListKey, identifierType, interactionType } = trackerOptions.dungeonRewardOptions;
  const dungeonIdentifiers = dungeonTextOptions[dungeonListKey].identifiers;

  // Style the dungeon name
  const tempIdentifierState = trackerState[itemInfo.name] ?? DEFAULT_STATE_IDENTIFIER;
  // Hack for when label list swaps from oot to mm and out of range
  const identifierState = tempIdentifierState > dungeonIdentifiers.length - 1 ? 0 : tempIdentifierState;
  const identifierClassList = ["bottom-row", "textFlexBox", "textStyle"];
  if (identifierState === 0) {
    identifierClassList.push("itm-hidden");
  }

  // Dynamic font size
  const itemSize = trackerOptions.calc.itemSize;
  const fontSize = 0.5 * itemSize.number * 0.8;

  // Move interaction to the outer div
  const onInteract = (event) => {
    if (interactionType === "dropdown") {
      simpleInteraction();
    } else if (interactionType === "inElement") {
      onInElementInteraction(event);
    } else {
      console.error(Error(`Dungeon reward interaction type ${interactionType} not recognized.`))
    }
  };

  // Handle interactions
  const simpleInteraction = () => {
    const newState = !trackerState[toggleName];
    updateSingleItem({ [toggleName]: newState }, newState === DEFAULT_STATE_TOGGLE);
  };

  const onInElementInteraction = (event) => {
    if (event.shiftKey) {
      simpleInteraction();
    } else {
      const maxState = dungeonIdentifiers.length - 1;
      const newState = event.type === "click" ?
        (identifierState + 1 > maxState ? 0 : identifierState + 1) :
        (identifierState - 1 < 0 ? maxState : identifierState - 1);
      updateSingleItem({ [itemInfo.name]: newState }, newState === DEFAULT_STATE_IDENTIFIER);
    }
  };

  // Render
  return (
    <div 
      className="dungeonReward"
      style={{...itemSize.style, ...extraStyles}}
      onClick={(e) => onInteract(e)}
      onContextMenu={(e) => onInteract(e)}
    >
      <Toggle 
        key={"toggle"}
        {...props}
        itemInfo={{name: toggleName}}
        itemState={trackerState[toggleName]}
        extraClasses={["base-item"]}
        disableInteraction={true}
      />
      <div
        key={"identifier"}
        className={identifierClassList.join(" ")}
        style={{ fontSize: fontSize }}
      >
        {/* Put letters into flexbox divs to space evenly across the width */}
        {[...dungeonIdentifiers[identifierState]].map((c, i) => <div key={i}>{c}</div>)}
      </div>
    </div>
  );
}