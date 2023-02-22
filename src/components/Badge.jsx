import 'style/badge.css';

const locLookup = { 0: "top-left", 1: "top-right", 2: "bottom-left", 3: "bottom-right" };

export const Badge = ({ itemInfo, itemState, updateSingleItem }) => {

  const baseItem = itemInfo.base;
  const badgeItem = itemInfo.badge;
  const badgeLocation = itemInfo.location ?? 3;

  // Build the list of classes for the base
  const baseClassList = ["base-item", baseItem];
  if (!itemState[0]) {
    baseClassList.push('itm-false');
  }

  // Build the list of classes for the badge
  const badgeClassList = ["badge-item", badgeItem, locLookup[badgeLocation]];
  if (!itemState[1]) {
    badgeClassList.push('itm-hidden');
  }

  // Set up the button interaction
  const onInteract = (slot) => {
    let newState = [itemState[0], itemState[1]];
    newState[slot] = !newState[slot];
    updateSingleItem({ [itemInfo.name]: newState });
  };

  // Render
  return (
    <div className="badge" onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)}>
      <button className={baseClassList.join(" ")} />
      <button className={badgeClassList.join(" ")} />
    </div>
  );
};