import { dungeonTextOptions } from "data/dungeon_text_options";
import { Dropdown } from "./Dropdown";
import 'style/dungeon_dropdown_box.css';
import { itemContainerNames } from "./ItemContainers";

const expandContainerElements = (layout) => {
  return layout.reduce((tot, item) => {
    if (itemContainerNames.includes(item.type)) {
      const subItemIds = item.items ?? [item.item] ?? [];
      const subList = expandContainerElements(subItemIds);
      return [ ...tot , ...subList ];
    }
    return [ ...tot, item ];
  }, []);
}

const findDropdownElements = (layout) => {
  const expandedLayout = expandContainerElements(layout);
  return expandedLayout.filter((item) => ['dungeonReward'].includes(item.type));
};

export const DungeonDropdownBox = ({ trackerLayout, trackerState, updateSingleItem, trackerOptions }) => {
  // If dungeon reward objects are not going to be dropdown controlled, don't do anything.
  if (trackerOptions.dungeonRewardOptions.interactionType !== "dropdown") { return ''; }
  const { labels } = dungeonTextOptions[trackerOptions.dungeonRewardOptions.dungeonListKey];
  const idedLabels = labels.reduce((tot, lab, i) =>  [ ...tot, { label: lab, value: i } ], []);

  // Trim layout list to only things with dropdowns and sort
  const relevantLayoutElements = findDropdownElements([ ...trackerLayout ]);
  relevantLayoutElements.sort((a,b) => a.priority > b.priority ? 1 : -1);
  if (relevantLayoutElements.length === 0) { return null; }

  // Define interaction
  const onChange = (itemName, newVal) => {
    updateSingleItem({ [itemName]: newVal }, newVal === '0');
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