export const Toggle = ({ itemInfo, itemState, metaOptions, updateSingleItem, extraStyles, disableClick }) => {

  const itemSizeStyle = metaOptions.itemSize.style;
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
      onClick={!!disableClick ? null : () => onClick()}
      onContextMenu={!!disableClick ? null : () => onClick()}
    />
  );
};