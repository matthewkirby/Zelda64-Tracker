import 'style/item.css';
import 'style/item_subgrids.css';
import { Cycle, Toggle, Badge, Composite, Counter, DungeonReward, Grid3x3 } from './ItemTypes';

const Squish = (props) => {
  const itemList = props.itemInfo.items;
  const nCols = props.itemInfo.nCols;
  const childTrackerOptions = JSON.parse(JSON.stringify(props.trackerOptions));
  const nItems = itemList.length;

  // Load tracker sizes
  const units = childTrackerOptions.geometry.units;
  const oldWidth = childTrackerOptions.calc.itemSize.number;
  const gapSize = childTrackerOptions.geometry.columnGap;

  // Resolve new sizes
  const totalSpace = nCols*oldWidth + (nCols-1)*gapSize;
  const gapFraction = gapSize/oldWidth;
  const newWidth = totalSpace/(nItems + gapFraction*(nItems-1));
  const newGap = gapFraction*newWidth;

  // Set up new styles
  const squishStyle = { gridColumnEnd: `span ${nCols}`, columnGap: `${newGap}${units}` };
  const subElementStyles = { gridRow: 1 };
  const newItemSize = { number: newWidth, style: { height: `${newWidth}${units}`, width: `${newWidth}${units}` } };

  // Update tracker options object
  childTrackerOptions.itemSize = newWidth;
  childTrackerOptions.columnGap = newGap;
  childTrackerOptions.calc.itemSize = newItemSize;

  return (
    <div className="squish-base" style={squishStyle} >
      {itemList.map((item, i) =>
        <Item
          key={item.name+i}
          {...props}
          itemInfo={item}
          trackerOptions={childTrackerOptions}
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
  } else if (itemType === '3x3grid') {
    return <Grid3x3 {...props} />;
  }

  // Use the correct element type
  if (itemType === 'toggle') {
    return <Toggle {...props} />;
  } else if (itemType === 'cycle') {
    return <Cycle {...props} />;
  } else if (['badge', 'checkToggle'].includes(itemType)) {
    return <Badge {...props} />;
  } else if (itemType === 'composite') {
    return <Composite {...props} />;
  } else if (itemType === 'counter') {
    return <Counter {...props} />;
  } else if (itemType === 'dungeonReward') {
    return <DungeonReward {...props} />;
  } else {
    console.error(Error(`Item type ${itemType} does not have a defined implementation.`));
  }

}