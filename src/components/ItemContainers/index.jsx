import { Inline } from './Inline';
import { Subgrid } from './Subgrid';

// Each ItemContainer should be definable in a layout as an object with an `items` key that holds
// an array of items for the container
const ItemContainer = (props) => {
  const itemType = props.itemInfo.type;

  if (itemType === 'inline') {
    return <Inline {...props} />;
  } else if (itemType === 'subgrid') {
    return <Subgrid {...props} />;
  }
};

const itemContainerNames = ["inline", "subgrid"];

export { Inline, Subgrid, ItemContainer, itemContainerNames };