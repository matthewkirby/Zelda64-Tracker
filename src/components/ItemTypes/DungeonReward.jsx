import { Toggle } from "./Toggle";
import './dungeon_reward.css';

const OOT_DUNGEONS = ["", "FREE", "DEKU", "DCVN", "JABU", "FRST", "FIRE", "WATR", "SHDW", "SPRT"];
const MM_DUNGEONS = ["WOOD", "SNOW", "GBAY", "STONE"];
const dungeonTextOptions = {
  "oot": OOT_DUNGEONS,
  "mm": MM_DUNGEONS,
  "ootmm": [ ...OOT_DUNGEONS, ...MM_DUNGEONS ]
};

export const DungeonReward = (props) => {

  const { trackerState, itemInfo, itemSize, extraStyles, updateSingleItem } = props;
  const toggleName = itemInfo.toggle;
  const identifierState = trackerState[itemInfo.name];
  const { dungeonListKey, identifierType, interactionType } = props.metaOptions.dungeonRewardOptions;

  // Style the dungeon name
  const identifierClassList = ["bottom-row", "textFlexBox", "textStyle"];
  if (identifierState === 0) {
    identifierClassList.push("itm-hidden");
  }

  // Dynamic font size
  const fontSize = 0.5 * itemSize.height.slice(0, -2) * 0.8;

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

  const simpleInteraction = () => {
    updateSingleItem({ [toggleName]: !trackerState[toggleName] });
  };

  const onInElementInteraction = (event) => {
    if (event.shiftKey) {
      simpleInteraction();
    } else {
      const maxState = dungeonTextOptions[dungeonListKey].length - 1;
      const newState = event.type === "click" ?
        (identifierState + 1 > maxState ? 0 : identifierState + 1) :
        (identifierState - 1 < 0 ? maxState : identifierState - 1);
      updateSingleItem({ [itemInfo.name]: newState });
    }
  };

  // Render
  return (
    <div 
      className="dungeonReward"
      style={{...itemSize, ...extraStyles}}
      onClick={(e) => onInteract(e)}
      onContextMenu={(e) => onInteract(e)}
    >
      <Toggle 
        key={itemInfo.name+"toggle"}
        {...props}
        itemInfo={{name: toggleName}}
        itemState={trackerState[toggleName]}
        disableClick={true}
      />
      <div
        key={itemInfo.name+"identifier"}
        className={identifierClassList.join(" ")}
        style={{ fontSize: fontSize }}
      >
        {/* Put letters into flexbox divs to space evenly across the width */}
        {[...dungeonTextOptions[dungeonListKey][identifierState]].map((c, i) => <div key={i}>{c}</div>)}
      </div>
    </div>
  );
}