import { Item } from 'components/Item';

const createSubBoxStyles = (nItems, span, childTrackerOptions, subGridSize) => {
  const units = childTrackerOptions.geometry.units;
  const oldWidth = childTrackerOptions.calc.itemSize.number;
  const gapSize = Math.min(childTrackerOptions.geometry.columnGap, childTrackerOptions.geometry.rowGap);

  // Resolve new sizes
  const totalSpace = span*oldWidth + (span-1)*gapSize;
  let newWidth = totalSpace/subGridSize;
  if (newWidth-oldWidth > 0 && newWidth-oldWidth < 0.2*oldWidth) {
    newWidth = oldWidth;
  }

  // Set up new styles
  const subBoxStyles = {
    gridColumnEnd: `span ${span}`,
    gridRowEnd: `span ${span}`,
    justifyContent: nItems < 4 ? 'center' : 'space-between',
    alignContent: nItems < 4 ? 'center' : 'space-between',
    rowGap: (nItems < 4) ? childTrackerOptions.geometry.rowGap*(span-1) : 0,
    columnGap: (nItems < 4) ? childTrackerOptions.geometry.columnGap*(span-1) : 0
  }; 
  const newItemSize = { number: newWidth, style: { height: `${newWidth}${units}`, width: `${newWidth}${units}` } };
  const subElementStyles = [...Array(nItems).keys()].map((v) => {
    return { margin: (v === 0 && nItems < 4) ? `0 ${newWidth/2}${units}` : "" };
  });

  // Update tracker options object
  childTrackerOptions.itemSize = newWidth;
  childTrackerOptions.calc.itemSize = newItemSize;

  return [ subBoxStyles, subElementStyles, childTrackerOptions ];
};

export const Subgrid = (props) => {
  const itemList = props.itemInfo.items;
  const nItems = itemList.length;
  const span = props.itemInfo.size;

  // Check the number of items
  if (nItems < 2) {
    console.log("Subgrid elements should have at least 2 items.");
    return null;
  } else if (nItems > 9) {
    console.log("Subgrid elements currently only support less than 5 items");
    return null;
  }

  // Check the provided span
  if (span < 1) {
    console.log("Subgrid element span must be greater than 0.");
    return null;
  } else if (span > props.trackerOptions.geometry.nCols) {
    console.log("Subgrid element span must be less than the number of tracker columns.");
    return null;
  }

  // Build the subgrid styles (wrap this in a useEffect hook later?)
  const copyTrackerOptions = JSON.parse(JSON.stringify(props.trackerOptions));
  let subGridSettings = null;
  if (nItems < 5) {
    subGridSettings = createSubBoxStyles(nItems, span, copyTrackerOptions, 2);
  } else if (nItems < 10) {
    subGridSettings = createSubBoxStyles(nItems, span, copyTrackerOptions, 3);
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