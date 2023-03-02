import { Item } from 'components/Item';

const create2x2SubBoxStyles = (span, childTrackerOptions) => {
  const units = childTrackerOptions.geometry.units;
  const oldWidth = childTrackerOptions.calc.itemSize.number;
  const gapSize = Math.min(childTrackerOptions.geometry.columnGap, childTrackerOptions.geometry.rowGap);

  // Resolve new sizes
  const totalSpace = span*oldWidth + (span-1)*gapSize;
  const newWidth = totalSpace/2;

  // Set up new styles
  const subBoxStyles = {}; 
  const newItemSize = { number: newWidth, style: { height: `${newWidth}${units}`, width: `${newWidth}${units}` } };
  const subElementStyles = [
    { margin: "0 12.5px"}, {}, {}
  ]


  // Update tracker options object
  childTrackerOptions.itemSize = newWidth;
  childTrackerOptions.calc.itemSize = newItemSize;

  return { subBoxStyles: subBoxStyles, subElementStyles: subElementStyles, childTrackerOptions: childTrackerOptions }
};

// Until I have a better method, hard code positions and sizes given
// the number of items and size of the grid3x3 item on the grid
export const Grid3x3 = (props) => {
  const itemList = props.itemInfo.items;
  const span = props.itemInfo.size;

  // if (!Object.keys(funcDefinitions).includes(String(itemList.length))) {
  //   console.log("Grid3x3 elements currently only support certain numbers of items:", Object.keys(funcDefinitions));
  //   return null;
  // }
  if (span !== 1) {
    console.log("Grid3x3 elements currently only support a size of 1");
    return null;
  }

  const { subBoxStyles, subElementStyles, childTrackerOptions } = create2x2SubBoxStyles(span, JSON.parse(JSON.stringify(props.trackerOptions)));


  return (
    <div className="sub-flex-base" style={subBoxStyles} >
      {itemList.map((item, i) =>
        <Item
          key={item.name+i}
          {...props}
          itemInfo={item}
          trackerOptions={childTrackerOptions}
          extraStyles={subElementStyles[i]}
        />
      )}
    </div>
  );
};