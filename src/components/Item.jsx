import 'style/item.css';
import 'style/item_subgrids.css';
import { Cycle, Toggle, Badge, Composite, Counter, DungeonReward } from './ItemTypes';
import { itemContainerNames, ItemContainer } from './ItemContainers';

export const Item = (props) => {
  const itemType = props.itemInfo.type;

  // Expand item containers
  if (itemContainerNames.includes(itemType)) {
    return <ItemContainer {...props} />;
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