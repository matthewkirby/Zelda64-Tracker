import { Item } from 'components/Item';

export const Inline = (props) => {
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
  const inlineStyle = { gridColumnEnd: `span ${nCols}`, columnGap: `${newGap}${units}` };
  const subElementStyles = { gridRow: 1 };
  const newItemSize = { number: newWidth, style: { height: `${newWidth}${units}`, width: `${newWidth}${units}` } };

  // Update tracker options object
  childTrackerOptions.itemSize = newWidth;
  childTrackerOptions.columnGap = newGap;
  childTrackerOptions.calc.itemSize = newItemSize;

  return (
    <div className="inline-base" style={inlineStyle} >
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