import 'style/Item.css';
import { Cycle } from './Cycle';
import { Toggle } from './Toggle';
import { Badge } from './Badge';

export const Item = (props) => {
  const itemType = props.itemInfo.type;

  if (itemType === 'simple_toggle') {
    return <Toggle {...props} />;
  } else if (itemType === 'cycle') {
    return <Cycle {...props} />;
  } else if (itemType === 'badge') {
    return <Badge {...props} />;
  } else if (itemType === 'composite') {
    return '';
  } else {
    console.error(Error(`Item type ${itemType} does not have a defined implementation.`));
  }

}