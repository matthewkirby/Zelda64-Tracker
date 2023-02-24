// TODO: Add support for diagonal items. This can be done with css and something like...
// background-image: url(), linear-gradient(to bottom right, rgba(0,0,0,0) 50%, color 50%);
// Needs more fiddling and reading into how this works

export const Composite = ({ itemInfo, itemState, metaOptions, updateSingleItem, extraStyles }) => {

  const itemSizeStyle = metaOptions.itemSize.style;
  const [leftItem, rightItem] = itemInfo.items;
  const [leftState, rightState] = itemState;

  // Build the list of classes
  const leftClassList = ["itm-base", leftItem];
  const rightClassList = ["itm-base", rightItem];
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

  // Set up the button interaction
  const onInteract = (slot) => {
    let newState = [itemState[0], itemState[1]];
    newState[slot] = !newState[slot];
    updateSingleItem({ [itemInfo.name]: newState });
  };

  return (
    <div className='composite' style={{...itemSizeStyle, ...extraStyles}} onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)} >
      <button className={leftClassList.join(" ")} />
      <button className={rightClassList.join(" ")} />
    </div>
  );
}