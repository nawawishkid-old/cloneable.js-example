import { createElementData } from "./helpers";

/**
 * @typedef {object} ExampleData
 *
 * @property {string} title - Title
 * @property {string} detail - Detail
 * @property {ElementData} containerData - Container element data object.
 * @property {CloneableOptions} cloneableOptions - Object for Cloneable options.
 */

const defaultContainerData = createElementData(
  "div",
  null,
  createElementData("p", null, "Clone me!")
);

export default [
  {
    title: "This is title",
    detail: "This is detail",
    containerData: defaultContainerData,
    cloneableOptions: {}
  },
  {
    title: "Set options using HTML <code>data-*</code> attributes",
    detail: "<code>data-append</code> and <code>data-max</code>",
    containerData: defaultContainerData,
    cloneableOptions: {}
  }
];
