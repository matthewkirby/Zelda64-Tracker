const DEFAULT_STATE = 0;

const equals = (a, b) => {
  return Math.abs(a - b) < Number.EPSILON;
}

export const Cycle = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {

  const itemSizeStyle = trackerOptions.calc.itemSize.style;
  const itemSequence = itemInfo.sequence;
  const minState = itemInfo.disableZero ? DEFAULT_STATE : 1;
  const maxState = itemSequence.length;
  const loop = itemInfo.loop;
  const itemState = trackerState[itemInfo.name] ?? minState;

  // Build the list of classes for the button
  const classList = ["itm-base"];
  if (equals(itemState, 0)) {
    classList.push(itemSequence[0], 'itm-false');
  } else if (itemState <= maxState) {
    classList.push(itemSequence[itemState-1]);
  } else {
    console.error(Error(`Cycle item ${itemInfo.name} has state ${itemState} and max value ${maxState}`));
  }

  // Set up the button interaction
  const onInteract = (forward) => {
    let newState = itemState;
    if (forward) {
      newState = loop ?
        (itemState + 1 > maxState ? minState : itemState + 1) :
        (itemState + 1 > maxState ? maxState : itemState + 1);
    } else {
      newState = loop ?
        (itemState - 1 < minState ? maxState : itemState - 1) :
        (itemState - 1 < minState ? minState : itemState - 1);
    }

    if (newState !== itemState) {
      updateSingleItem({ [itemInfo.name]: newState }, newState === minState);
    }

  }

  // Render
  return (
    <button
      className={classList.join(" ")}
      style={{...itemSizeStyle, ...extraStyles}}
      onClick={() => onInteract(true)}
      onContextMenu={() => onInteract(false)}
    />
  );
};