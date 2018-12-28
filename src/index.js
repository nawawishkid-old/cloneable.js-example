import Cloneable from "@nawawishkid/cloneable";
import examples from "./examples";
import Example from "./Example";
import { createElement, getPrettyHtml } from "./helpers";
import { objectToString } from "./js-to-string";

const { Prism } = window;
const app = document.getElementById("app");

examples.forEach(ex => {
  const { title, detail, containerData, cloneableOptions } = ex;
  const containerElem = createElement(containerData);
  const cloneable = new Cloneable(containerElem, cloneableOptions);
  const example = new Example(title, detail, containerElem);
  const optionsString = objectToString(cloneable.optionController._data, 2);

  console.log("containerElem: ", containerElem);

  cloneable.on("afterStateChange", function() {
    example.code("after", getPrettyHtml(containerElem));
    Prism.highlightElement(example.doms.afterCode);
  });
  example.create();
  example.code("before", getPrettyHtml(containerElem));
  cloneable.init();
  example.code("options", optionsString);
  example.code("after", getPrettyHtml(containerElem));

  app.appendChild(example.dom);
});
