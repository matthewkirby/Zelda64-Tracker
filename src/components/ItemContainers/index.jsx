import { Inline } from './Inline';
import { Subgrid } from './Subgrid';

// This array defines the names of the different container elements to be used in places that check
// if they are dealing with an individual item or a container of items.
// Each of these should be defined in a layout as an object with an `items` key that holds an array of
// items that the container holds.
const itemContainerNames = ["inline", "subgrid"];

export { Inline, Subgrid, itemContainerNames };