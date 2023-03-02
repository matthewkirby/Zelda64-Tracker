import { Item } from 'components/Item';

const create2x2SubBoxStyles = (nItems, span, childTrackerOptions) => {
  const units = childTrackerOptions.geometry.units;
  const oldWidth = childTrackerOptions.calc.itemSize.number;
  const gapSize = Math.min(childTrackerOptions.geometry.columnGap, childTrackerOptions.geometry.rowGap);

  // Resolve new sizes
  const totalSpace = span*oldWidth + (span-1)*gapSize;
  const newWidth = totalSpace/2;

  // Set up new styles
  const subBoxStyles = {}; 
  const newItemSize = { number: newWidth, style: { height: `${newWidth}${units}`, width: `${newWidth}${units}` } };
  const subElementStyles = [...Array(nItems).keys()].map((v) => {
    return { margin: (v === 0 && nItems < 4) ? `0 ${newWidth/2}${units}` : "" };
  });

  // Update tracker options object
  childTrackerOptions.itemSize = newWidth;
  childTrackerOptions.calc.itemSize = newItemSize;

  return [ subBoxStyles, subElementStyles, childTrackerOptions ]
};

// Until I have a better method, hard code positions and sizes given
// the number of items and size of the grid3x3 item on the grid
export const Grid3x3 = (props) => {
  const itemList = props.itemInfo.items;
  const nItems = itemList.length;
  const span = props.itemInfo.size;

  if (nItems < 2) {
    console.log("Grid3x3 elements should have at least 2 items.");
    return null;
  } else if (nItems > 5) {
    console.log("Grid3x3 elements currently only support less than 5 items");
    return null;
  }

  if (span !== 1) {
    console.log("Grid3x3 elements currently only support sizes of 1");
    return null;
  }

  const copyTrackerOptions = JSON.parse(JSON.stringify(props.trackerOptions));
  let subGridSettings = null;
  if (nItems < 5) {
    subGridSettings = create2x2SubBoxStyles(nItems, span, copyTrackerOptions);
  }


  return (
    <div className="sub-flex-base" style={subGridSettings[0]} >
      {itemList.map((item, i) =>
        <Item
          key={item.name+i}
          {...props}
          itemInfo={item}
          trackerOptions={subGridSettings[2]}
          extraStyles={subGridSettings[1][i]}
        />
      )}
    </div>
  );
};