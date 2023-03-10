import './counter.css';

const DEFAULT_STATE = 0;

const locLookup = { 0: "top-left", 1: "top-right", 2: "bottom-left", 3: "bottom-right" };

export const Counter = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {

  const baseItem = itemInfo.name;
  const textLocation = itemInfo.location ?? 1;
  const itemSize = trackerOptions.calc.itemSize;
  const itemState = trackerState[baseItem] ?? DEFAULT_STATE;


  // Build the list of classes
  const baseClassList = ["itm-base", "base-item", baseItem];
  const textClassList = ["itm-base", locLookup[textLocation], "text"];
  if (itemState < 1) {
    baseClassList.push('itm-false');
    textClassList.push('itm-hidden');
  }

  // Try to calculate a good font size
  const width = 0.5 * itemSize.number;
  const fontStyle = {}
  if (itemState < 10) {
    fontStyle['fontSize'] = `${width}px`;
  } else if (itemState < 100) {
    fontStyle['fontSize'] = width*.9;
  } else {
    fontStyle['fontSize'] = width*.75;
  }

  // Set up the button interaction
  const onInteract = (event) => {
    const modifier = event.shiftKey ? 10 : 1;
    let newState = itemState;
    if (event.type === 'click') {
      newState += modifier;
      if (newState > itemInfo.maxVal) {
        newState = itemInfo.maxVal;
      }
    } else {
      newState -= modifier;
      if (newState < itemInfo.minVal) {
        newState = itemInfo.minVal;
      }
    }
    if (newState !== itemState) {
      updateSingleItem({ [itemInfo.name]: newState }, newState === DEFAULT_STATE);
    }
  };

  // Render
  return (
    <div className="counter" style={{...itemSize.style, ...extraStyles}} onClick={(e) => onInteract(e)} onContextMenu={(e) => onInteract(e)}>
      <button className={baseClassList.join(" ")} />
      <button className={textClassList.join(" ")} style={fontStyle}>{itemState}</button>
    </div>
  );}