import { createElement, createElementData } from "./helpers";

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
    codeString
  );
  const preElement = createElementData("pre", "line-numbers", codeElement);
  const wrapperElement = createElementData("div", type, preElement);

  return wrapperElement;
};
// <div class="playground">{container}</div>
const getPlaygroundElementData = () => createElementData("div", "playground");
// <div class="codes"></div>
const getCodesWrapperElementData = (...children) =>
  createElementData("div", "codes", ...children);
// <h3 class="title">{title}</h3>
const getTitleElementData = title => createElementData("h3", "title", title);
// <p class="detail">{detail}</p>
const getDetailElementData = detail => createElementData("p", "detail", detail);
// <div class="example"></div>
const getExampleElementData = (...children) =>
  createElementData("div", "example", ...children);

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
      getCodesWrapperElementData(beforeCode, afterCode, optionsCode)
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
      beforeCode: this.dom.querySelector(".codes .before code"),
      afterCode: this.dom.querySelector(".codes .after code"),
      optionsCode: this.dom.querySelector(".codes .options code")
    };

    this.doms.playground.appendChild(this.containerElem);
    console.log("this.doms: ", this.dom);
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
