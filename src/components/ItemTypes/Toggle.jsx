
// TODO: Make disableInteraction a prop that if it exists at all is active rather than need to set to a bool
export const Toggle = ({ itemInfo, itemState, trackerOptions, updateSingleItem, extraStyles, disableInteraction }) => {

  const itemSizeStyle = trackerOptions.calc.itemSize.style;
  const itemName = itemInfo.name;

  const className = ["itm-base", itemName];
  if (!itemState) {
    className.push('itm-false');
  }

  const onClick = () => {
    if (itemName != "BLANK") {
      updateSingleItem({ [itemName]: !itemState });
    }
  }

  return (
    <button
      className={className.join(" ")}
      style={{...itemSizeStyle, ...extraStyles}}
      onClick={!!disableInteraction ? null : () => onClick()}
      onContextMenu={!!disableInteraction ? null : () => onClick()}
    />
  );
};