export const Toggle = ({ itemInfo, itemState, updateSingleItem }) => {

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
      onClick={() => onClick()}
      onContextMenu={() => onClick()}
    />
  );
};