const locLookup = { 0: "top-left", 1: "top-right", 2: "bottom-left", 3: "bottom-right" };

const DEFAULT_STATE = false;

export const Badge = ({ itemInfo, trackerState, trackerOptions, updateSingleItem, extraStyles }) => {

  const isCheckmark = itemInfo.type === "checkToggle";

  const baseItem = isCheckmark ? itemInfo.name : itemInfo.base;
  const badgeItem = isCheckmark ? "CHECKMARK" : itemInfo.badge;
  const badgeName = isCheckmark ? `${baseItem}_${badgeItem}` : itemInfo.name;
  const badgeLocation = isCheckmark ? 1 : itemInfo.location ?? 3;
  const itemSizeStyle = trackerOptions.calc.itemSize.style;

  const baseState = trackerState[baseItem] ?? DEFAULT_STATE;
  const badgeState = trackerState[badgeName] ?? DEFAULT_STATE;
  const itemState = [baseState, badgeState];

  // Build the list of classes for the base
  const baseClassList = ["itm-base", "base-item", baseItem];
  if (!baseState) {
    baseClassList.push('itm-false');
  }

  // Build the list of classes for the badge
  const badgeClassList = ["itm-base", badgeItem, locLookup[badgeLocation]];
  if (!badgeState) {
    badgeClassList.push('itm-hidden');
  }

  // Set up the button interaction
  const onInteract = (slot) => {
    const newState = !itemState[slot];
    const name = slot === 0 ? baseItem : badgeName;
    updateSingleItem({ [name]: newState },  newState === DEFAULT_STATE);
  };

  // Render
  return (
    <div className="badge" style={{...itemSizeStyle, ...extraStyles}} onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)}>
      <button className={baseClassList.join(" ")} />
      <button className={badgeClassList.join(" ")} />
    </div>
  );
};