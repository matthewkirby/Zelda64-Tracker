const locLookup = { 0: "top-left", 1: "top-right", 2: "bottom-left", 3: "bottom-right" };

const DEFAULT_STATE = [false, false];

export const Badge = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {

  const baseItem = itemInfo.base;
  const badgeItem = itemInfo.badge;
  const badgeLocation = itemInfo.location ?? 3;
  const itemSizeStyle = trackerOptions.calc.itemSize.style;

  const itemState = trackerState[itemInfo.name] ?? DEFAULT_STATE;


  // Build the list of classes for the base
  const baseClassList = ["itm-base", "base-item", baseItem];
  if (!itemState[0]) {
    baseClassList.push('itm-false');
  }

  // Build the list of classes for the badge
  const badgeClassList = ["itm-base", badgeItem, locLookup[badgeLocation]];
  if (!itemState[1]) {
    badgeClassList.push('itm-hidden');
  }

  // Set up the button interaction
  const onInteract = (slot) => {
    let newState = [itemState[0], itemState[1]];
    newState[slot] = !newState[slot];
    updateSingleItem({ [itemInfo.name]: newState },  newState.every((e, i) => e === DEFAULT_STATE[i]));
  };

  // Render
  return (
    <div className="badge" style={{...itemSizeStyle, ...extraStyles}} onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)}>
      <button className={baseClassList.join(" ")} />
      <button className={badgeClassList.join(" ")} />
    </div>
  );
};