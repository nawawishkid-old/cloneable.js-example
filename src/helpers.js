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

  Object.keys(attributes).forEach(key => (elem[key] = attributes[key]));
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
 * Create ElementData object.
 *
 * @param {string} tagName Element's tagname.
 * @param {string} className Element's className.
 * @param  {...(ElementData|string)} children Element's children.
 * @return {ElementData}
 */
const createElementData = (tagName = "div", className = "", ...children) => ({
  tagName,
  attributes: className ? { className } : {},
  children
});

const getPrettyHtml = elem => window.html_beautify(elem.outerHTML);

export { createElement, createElementData, getPrettyHtml };
