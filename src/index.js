import Cloneable from "@nawawishkid/cloneable";
import examples from "./examples";
import Example from "./Example";
import { createElement, getPrettyHtml } from "./helpers";
import { objectToString } from "./js-to-string";

const { Prism } = window;
const app = document.getElementById("app");
const preloader = document.getElementById("preloader");

examples.forEach(createExamples);
// Mimic load time.
setTimeout(() => {
  app.classList.remove("is-hidden");
  preloader.style.display = "none";
}, 700);

function createExamples(ex, index) {
  const { title, detail, containerData, cloneableOptions } = ex;
  const containerElem = createElement(containerData);
  const cloneable = new Cloneable(containerElem, cloneableOptions);
  const example = new Example(`${index + 1}. ${title}`, detail, containerElem);
  const optionsString = objectToString(cloneable.options, 2);

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
}
