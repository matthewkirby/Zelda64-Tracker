export const Toggle = ({ itemInfo, itemState, itemSize, updateSingleItem, extraStyles, disableClick }) => {

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
      style={{...itemSize, ...extraStyles}}
      onClick={!!disableClick ? null : () => onClick()}
      onContextMenu={!!disableClick ? null : () => onClick()}
    />
  );
};