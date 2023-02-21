import 'style/Item.css';

const clicked = (itemName) => {
  console.log("clicked", itemName);
}

export const Item = ({ itemName, itemState }) => {
  return (
    <button
      className={["itm-base", itemName].join(" ")}
      onClick={() => clicked(itemName)}
    />
  );
}