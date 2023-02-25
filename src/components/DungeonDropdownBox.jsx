import { dungeonTextOptions } from "data/dungeon_text_options";
import { Dropdown } from "./Dropdown";
import 'style/dungeon_dropdown_box.css';

const expandSquishElements = (layout) => {
  return layout.reduce((tot, item) => {
    if (item.type === 'squish') {
      const subList = expandSquishElements(item.items);
      return [ ...tot , ...subList ];
    }
    return [ ...tot, item ];
  }, []);
}

const findDropdownElements = (layout) => {
  const expandedLayout = expandSquishElements(layout);
  return expandedLayout.filter((item) => ['dungeonReward'].includes(item.type));
};

export const DungeonDropdownBox = ({ trackerLayout, trackerState, updateSingleItem, metaOptions }) => {
  // If dungeon reward objects are not going to be dropdown controlled, don't do anything.
  if (metaOptions.dungeonRewardOptions.interactionType !== "dropdown") { return ''; }
  const { labels } = dungeonTextOptions[metaOptions.dungeonRewardOptions.dungeonListKey];
  const idedLabels = labels.reduce((tot, lab, i) =>  [ ...tot, { label: lab, value: i } ], []);

  // Trim layout list to only things with dropdowns and sort
  const relevantLayoutElements = findDropdownElements([ ...trackerLayout ]);
  relevantLayoutElements.sort((a,b) => a.priority > b.priority ? 1 : -1);

  // Define interaction
  const onChange = (itemName, newVal) => {
    updateSingleItem({ [itemName]: newVal });
  }

  return (
    <div className='marking-box one-column-grid' id='marking-box' >
      {relevantLayoutElements.map((item, i) => {
        return (
          <Dropdown
            key={i}
            label={item.label}
            options={idedLabels}
            value={trackerState[item.name]}
            onChange={(v) => onChange(item.name, v)}
          />
        );
      })}
    </div>
  )
};