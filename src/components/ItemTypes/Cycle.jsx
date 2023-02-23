const equals = (a, b) => {
  return Math.abs(a - b) < Number.EPSILON;
}

export const Cycle = ({ itemInfo, itemState, itemSize, updateSingleItem, extraStyles }) => {

  const itemSequence = itemInfo.sequence;
  const minState = itemInfo.disableZero ? 0 : 1;
  const maxState = itemSequence.length;
  const loop = itemInfo.loop;

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
    if (forward) {
      const newState = loop ?
        (itemState + 1 > maxState ? minState : itemState + 1) :
        (itemState + 1 > maxState ? maxState : itemState + 1);
      if (newState !== itemState) {
        updateSingleItem({ [itemInfo.name]: newState });
      }
    } else {
      const newState = loop ?
        (itemState - 1 < minState ? maxState : itemState - 1) :
        (itemState - 1 < minState ? minState : itemState - 1);
      if (newState !== itemState) {
        updateSingleItem({ [itemInfo.name]: newState });
      }
    }
  }

  // Render
  return (
    <button
      className={classList.join(" ")}
      style={{...itemSize, ...extraStyles}}
      onClick={() => onInteract(true)}
      onContextMenu={() => onInteract(false)}
    />
  );
};