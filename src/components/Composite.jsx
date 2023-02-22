import 'style/composite.css';

export const Composite = ({ itemInfo, itemState, itemSize, updateSingleItem }) => {

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
    <div className='composite' style={itemSize} onClick={() => onInteract(0)} onContextMenu={() => onInteract(1)} >
      <button className={leftClassList.join(" ")} />
      <button className={rightClassList.join(" ")} />
    </div>
  );
}