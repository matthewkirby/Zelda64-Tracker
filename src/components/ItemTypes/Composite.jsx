// TODO: Add support for diagonal items. This can be done with css and something like...
// background-image: url(), linear-gradient(to bottom right, rgba(0,0,0,0) 50%, color 50%);
// Needs more fiddling and reading into how this works

const DEFAULT_STATE = false;

export const Composite = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {
  const itemSizeStyle = trackerOptions.calc.itemSize.style;
  const [leftItem, rightItem, legacyItem] = itemInfo.items;
  const leftState = trackerState[leftItem] ?? DEFAULT_STATE;
  const rightState = trackerState[rightItem] ?? DEFAULT_STATE;
  const itemState = [leftState, rightState];
  const isLegacy = itemInfo.legacy;

  // Build the list of classes
  const leftClassList = ["itm-base", isLegacy ? "single-item" : leftItem];
  const rightClassList = ["itm-base", rightItem];

  if (isLegacy) {
    if (!leftState && !rightState) {
      leftClassList.push(legacyItem, "itm-false");
    } else if (leftState && !rightState) {
      leftClassList.push(leftItem, "single-item");
    } else if (!leftState && rightState) {
      leftClassList.push(rightItem, "single-item");
    } else {
      leftClassList.push(legacyItem);
    }
  } else {
    if (!leftState && !rightState) {
      leftClassList.push("left-half", "itm-false");
      rightClassList.push("right-half", "itm-false");
    } else if (leftState && !rightState) {
      leftClassList.push("single-item");
      rightClassList.push("itm-hidden");
    } else if (!leftState && rightState) {
      leftClassList.push("itm-hidden");
      rightClassList.push("single-item")
    } else {
      leftClassList.push("left-half");
      rightClassList.push("right-half");
    }
  }

  // Set up the button interaction
  const onInteract = (slot) => {
    const newState = !itemState[slot];
    updateSingleItem({ [itemInfo.items[slot]]: newState },  newState === DEFAULT_STATE);
  };

  return (
    <div className='composite' style={{...itemSizeStyle, ...extraStyles}} onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)} >
      <button className={leftClassList.join(" ")} />
      {!isLegacy && <button className={rightClassList.join(" ")} />}
    </div>
  );
};