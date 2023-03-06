import { Item } from "components/Item";
import { itemContainerNames } from "components/ItemContainers";
import "./text-border.css";

export const TextBorder = (props) => {

  const innerText = props.itemInfo.text ?? "";
  const frameColor = props.itemInfo.color ?? "gold";
  const outerStyles = { color: frameColor };

  // Parse extra classes required
  const innerType = props.itemInfo.item.type;
  if (itemContainerNames.includes(innerType)) {
    if (innerType === "inline") {
      outerStyles["gridColumnEnd"] = `span ${props.itemInfo.item.nCols}`;
    } else if (innerType === "subgrid" && props.itemInfo.item.size > 1) {
      outerStyles["gridColumnEnd"] = `span ${props.itemInfo.item.size}`;
      outerStyles["gridRowEnd"] = `span ${props.itemInfo.item.size}`;
    }
  }

  return (
    <div className="border-with-text" style={outerStyles}>
      <label>{innerText}</label>
      <Item {...props} itemInfo={props.itemInfo.item} extraClasses={["child"]} />
      <div></div>
    </div>
  );
};