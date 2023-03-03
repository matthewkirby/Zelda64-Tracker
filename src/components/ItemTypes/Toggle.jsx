import useFitText from "use-fit-text";

const DEFAULT_STATE = false;

const DecoratedToggle = ({ itemInfo, extraClasses, extraStyles, children }) => {
  const { fontSize, ref } = useFitText();

  if(!Object.keys(itemInfo).includes('text')) {
    return children;
  }

  return (
    <div className={["toggle-grid", ...extraClasses].join(" ")} style={extraStyles} >
      {children}
      <div ref={ref} className={"bottom-row song-labels"} style={{ fontSize }}>
        {itemInfo.text}
      </div>
    </div>
  );

};

export const Toggle = (props) => {
  const inheritSize = props.inheritSize ?? false;
  const itemSizeStyle = inheritSize ? {} : props.trackerOptions.calc.itemSize.style;
  const itemName = props.itemInfo.name;
  const itemState = props.itemState ?? props.trackerState[itemName] ?? DEFAULT_STATE;
  const falseClass = props.falseClass ?? "itm-false";

  const styleList = { ...itemSizeStyle, ...props.extraStyles };
  const classList = [ "itm-base", ...(props.extraClasses || []) ];
  const itemStateClass = itemState ? "" : falseClass;

  const onClick = () => {
    if (itemName != "BLANK") {
      const newState = !itemState;
      props.updateSingleItem({ [itemName]: newState }, newState === DEFAULT_STATE);
    }
  };

  return (
    <DecoratedToggle
      itemInfo={props.itemInfo}
      extraClasses={classList}
      extraStyles={styleList}
    >
      <button
        className={[...classList, itemName, itemStateClass].join(" ")}
        style={styleList}
        onClick={!!props.disableInteraction ? null : () => onClick()}
        onContextMenu={!!props.disableInteraction ? null : () => onClick()}
      />
    </DecoratedToggle>
  );
};