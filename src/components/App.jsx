import 'style/App.css';

import { Item } from 'components/Item'

const tempTrackerLayout = [
  { name: "OOT_BOW", type: "simple_toggle" },
  { name: "MM_BOW", type: "simple_toggle" },
  { name: "OOT_SLINGSHOT", type: "simple_toggle" },
  { name: "OOT_BOOMERANG", type: "simple_toggle" },
  { name: "OOT_HAMMER", type: "simple_toggle" },
  { name: "OOT_MIRROR_SHIELD", type: "simple_toggle" },
  { name: "OOT_OCARINA", type: "simple_toggle" },
  { name: "OOT_BEANS", type: "simple_toggle" },
  { name: "OOT_GERUDO_CARD", type: "simple_toggle" },
  { name: "MM_FIRE_ARROWS", type: "simple_toggle" },
  { name: "MM_ICE_ARROWS", type: "simple_toggle" },
  { name: "MM_LIGHT_ARROWS", type: "simple_toggle" },
]

export function Tracker() {
  const trackerLayout = [ ...tempTrackerLayout ];
  
  return (
    <div className='tracker'>
      {trackerLayout.map((item) =>
          <Item
            key={item.name}
            itemName={item.name}
            itemType={item.type}
          />
      )}
    </div>
  );
}
