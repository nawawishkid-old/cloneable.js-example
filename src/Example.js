import { createElement, createElementData } from "./helpers";
import PanelList from "./PanelList";

/**
 * <div class="{type}">
 *    <pre class="line-numbers">
 *        <code class="language-{language}">{codeString}</code>
 *    </pre>
 * </div>
 */
const getCodeElementData = (type, codeString) => {
  const language = type === "options" ? "javascript" : "html";
  const codeElement = createElementData(
    "code",
    `language-${language}`,
    null,
    codeString
  );
  const preElement = createElementData(
    "pre",
    "line-numbers",
    null,
    codeElement
  );
  const wrapperElement = createElementData(
    "div",
    `panel-content ${type}`,
    null,
    preElement
  );

  return wrapperElement;
};
// <div class="playground">{container}</div>
const getPlaygroundElementData = () => createElementData("div", "playground");
// <div class="codes"></div>
const getCodesWrapperElementData = (...children) =>
  createElementData("div", "codes", null, ...children);
// <h3 class="title">{title}</h3>
const getTitleElementData = title =>
  createElementData("h3", "title", null, title);
// <p class="detail">{detail}</p>
const getDetailElementData = detail =>
  createElementData("p", "detail", null, detail);
// <div class="example"></div>
const getExampleElementData = (...children) =>
  createElementData("div", "example", null, ...children);
// <div class="panel-tab">{children}</div>
const getPanelTabElementData = (...children) =>
  createElementData("button", "panel-tab", null, ...children);

class Example {
  constructor(title, detail, containerElem) {
    this.containerElem = containerElem;
    this.content = {
      title: title,
      detail: detail,
      beforeCode: "",
      afterCode: "",
      optionsCode: ""
    };
    this.doms = {};
    this.isCreated = false;
  }

  create() {
    const title = getTitleElementData(this.content.title);
    const detail = getDetailElementData(this.content.detail);
    const playground = getPlaygroundElementData();
    const beforeCode = getCodeElementData("before", this.content.beforeCode);
    const afterCode = getCodeElementData("after", this.content.afterCode);
    const optionsCode = getCodeElementData("options", this.content.optionsCode);
    const self = getExampleElementData(
      title,
      detail,
      playground,
      createElementData(
        "div",
        "panels",
        null,
        createElementData(
          "div",
          "panel-tabs",
          null,
          getPanelTabElementData("Before"),
          getPanelTabElementData("After"),
          getPanelTabElementData("Options")
        ),
        createElementData(
          "div",
          "panel-contents",
          null,
          beforeCode,
          afterCode,
          optionsCode
        )
      )
      // getCodesWrapperElementData(beforeCode, afterCode, optionsCode)
    );

    // const datas = [
    //   title,
    //   detail,
    //   playground,
    //   beforeCode,
    //   afterCode,
    //   optionsCode,
    //   self
    // ];

    // datas.forEach(d => console.log(d));

    this.dom = createElement(self);
    this.doms = {
      title: this.dom.querySelector(".title"),
      detail: this.dom.querySelector(".detail"),
      playground: this.dom.querySelector(".playground"),
      panels: this.dom.querySelector(".panels"),
      beforeCode: this.dom.querySelector(".panels .before code"),
      afterCode: this.dom.querySelector(".panels .after code"),
      optionsCode: this.dom.querySelector(".panels .options code")
    };

    this.doms.playground.appendChild(this.containerElem);

    new PanelList(this.doms.panels).activate(0);
    this.isCreated = true;

    return this;
  }

  title(title) {
    return this._setContent("title", title, "innerHTML");
  }

  detail(detail) {
    return this._setContent("detail", detail, "innerHTML");
  }

  code(section, codeString) {
    return this._setContent(`${section}Code`, codeString);
  }

  _setContent(key, value, updateMethod = "textContent") {
    this.content[key] = value;
    this._updateContent(key, updateMethod);

    return this;
  }

  _updateContent(key, updateMethod = "textContent") {
    if (!this.isCreated) {
      return false;
    }

    this.doms[key][updateMethod] = this.content[key];

    return this;
  }
}

export default Example;
