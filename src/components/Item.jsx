import 'style/item.css';
import 'style/item_subgrids.css';
import { Cycle } from './Cycle';
import { Toggle } from './Toggle';
import { Badge } from './Badge';
import { Composite } from './Composite';
import { Counter } from './Counter';

const styles = {
  baseSquish: { display: "grid", alignItems: "center" }
}

const Squish = ({ itemInfo, trackerState, itemSize, updateSingleItem }) => {

  const itemList = itemInfo.items;
  const nCols = itemInfo.nCols;
  const nItems = itemList.length;

  // Resolve new sizes
  const oldWidth = Number(itemSize.width.slice(0, -2));
  const gapSize = 10;
  const totalSpace = nCols*oldWidth + (nCols-1)*gapSize;
  const newWidth = totalSpace/(nItems + 0.1*(nItems-1));
  const newGap = newWidth/10;

  // Set up new styles
  const squishStyle = { "gridColumnEnd": `span ${nCols}`, "columnGap": `${newGap}px` };
  const subElementStyles = { "gridRow": 1 };
  const newItemSize = { "height": `${newWidth}px`, "width": `${newWidth}px`};

  return (
    <div style={{ ...styles.baseSquish, ...squishStyle }} >
      {itemList.map((item, i) =>
        <Item
          key={item.name+i}
          itemInfo={item}
          trackerState={trackerState}
          itemSize={newItemSize}
          updateSingleItem={updateSingleItem}
          extraStyles={subElementStyles}
        />
      )}
    </div>
  );
};

export const Item = (props) => {
  const itemType = props.itemInfo.type;

  // Expand squished icons
  if (itemType === 'squish') {
    return <Squish {...props} />;
  }

  const itemName = props.itemInfo.name;
  const newProps = { ...props, itemState: props.trackerState[itemName]};

  // Use the correct element type
  if (itemType === 'simple_toggle') {
    return <Toggle {...newProps} />;
  } else if (itemType === 'cycle') {
    return <Cycle {...newProps} />;
  } else if (itemType === 'badge') {
    return <Badge {...newProps} />;
  } else if (itemType === 'composite') {
    return <Composite {...newProps} />;
  } else if (itemType === 'counter') {
    return <Counter {...newProps} />;
  } else {
    console.error(Error(`Item type ${itemType} does not have a defined implementation.`));
  }

}