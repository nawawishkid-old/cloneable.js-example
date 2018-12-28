/**
 * @typedef {object} ElementData
 *
 * @property {string} tagName - Element's tagname.
 * @property {object} attributes - Element's attributes object.
 * @property {ElementData[]|string[]} - Element's children.
 */

/**
 * Create HTMLElement from ElementData object.
 *
 * @param {ElementData} data
 * @return {HTMLElement} Created HTMLElement.
 */
const createElement = data => {
  if (typeof data === "string") {
    return data;
  }

  const { tagName, attributes, children } = data;
  const elem = document.createElement(tagName);

  setObjectProps(elem, attributes, ["style", "dataset"]);
  children.forEach(child => {
    if (typeof child === "string") {
      elem.innerHTML += child;
    } else {
      elem.append(createElement(child));
    }
  });

  return elem;
};

/**
 *
 * @param {object} object Object to be set property.
 * @param {object} props Property to set to the object.
 * @param {string[]} list Array of property keys that need to be set recursively.
 */
const setObjectProps = (object, props, list = []) =>
  Object.keys(props).forEach(key => {
    const value = props[key];

    if (list.includes(key)) {
      setObjectProps(object[key], value);

      return;
    }

    object[key] = value;
  });

/**
 * Create ElementData object.
 *
 * @param {string} tagName Element's tagname.
 * @param {string} className Element's className.
 * @param  {...(ElementData|string)} children Element's children.
 * @return {ElementData}
 */
const createElementData = (
  tagName = "div",
  className = "",
  attrs = null,
  ...children
) => ({
  tagName,
  attributes: { ...(className ? { className } : {}), ...(attrs || {}) },
  children
});

const getPrettyHtml = (elem, options = {}) =>
  window.html_beautify(elem.outerHTML, { indent_size: 2, ...options });

export { createElement, createElementData, getPrettyHtml };
