import { createElementData, createElement } from "./helpers";

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
  null,
  createElementData("p", null, null, "Clone me!")
);
const createFormFieldData = () => {
  let index = 0;

  return (...children) => {
    const id = index;
    const name = `my-field-${id}`;

    index++;

    return createElementData(
      "div",
      null,
      null,
      createElementData(
        "div",
        "field",
        null,
        createElementData("label", "label", { htmlFor: name }, `Field #${id}`),
        createElementData("input", "input", {
          type: "text",
          name,
          placeholder: "Clone me!"
        }),
        ...children
      )
    );
  };
};
const getFormFieldData = createFormFieldData();

export default [
  {
    title: "Default options.",
    detail: "Default options.",
    containerData: getFormFieldData(),
    cloneableOptions: {}
  },
  {
    title: "Set options using HTML <code>data-*</code> attributes",
    detail: "<code>data-append</code> and <code>data-max</code>",
    containerData: {
      ...getFormFieldData(),
      attributes: { dataset: { append: false, max: 2 } }
    },
    cloneableOptions: {}
  },
  {
    title:
      "Set custom <code>cloneButton</code> and <code>removeButton</code> using existing child elements of the container element",
    detail: "",
    containerData: getFormFieldData(
      createElementData(
        "button",
        null,
        { dataset: { cloneableCloneBtn: "" } },
        "Custom clone me!!!"
      ),
      createElementData(
        "button",
        null,
        { dataset: { cloneableRemoveBtn: "" } },
        "Custom remove me!!!"
      )
    ),
    cloneableOptions: {}
  },
  {
    title: "Set <code>maxCloneable</code> option",
    detail: "Set maximum number of cloned elements.",
    containerData: defaultContainerData,
    cloneableOptions: { maxCloneable: 3 }
  },
  {
    title: "Set custom <code>cloneButton</code> and <code>removeButton</code>",
    detail:
      "<code>HTMLElement</code> to be used as <code>cloneButton</code> or <code>removeButton</code>",
    containerData: getFormFieldData(),
    cloneableOptions: {
      cloneButton: createElement(
        createElementData(
          "span",
          "custom-clone-button",
          {
            style: {
              backgroundColor: "#4d4d4d",
              padding: ".5em",
              borderRadius: "5px",
              color: "white",
              cursor: "default"
            }
          },
          "Add more"
        )
      ),
      removeButton: createElement(
        createElementData(
          "button",
          "custom-remove-button",
          { style: { color: "red" } },
          "delete!"
        )
      )
    }
  },
  {
    title: "Middlewares",
    detail:
      "Register middleware function to be called with cloned element as an argument. Use to alter the cloned element.",
    containerData: getFormFieldData(),
    cloneableOptions: {
      middlewares: [
        function alterTextContent(cloned, id) {
          // Label
          const label = cloned.firstElementChild;
          const removeBtn = cloned.parentElement.lastElementChild;
          const { textContent } = label;
          const content = `${textContent}.${id}`;

          label.style.marginRight = "1em";
          label.textContent = content;
          removeBtn.textContent = `Remove #${content}`;

          return cloned;
        },
        function stylizeField(cloned) {
          const colors = [
            "crimson",
            "deeppink",
            "indigo",
            "coral",
            "cornflowerblue"
          ];
          const index = Math.round(Math.random() * (colors.length - 1));

          cloned.style.backgroundColor = colors[index];
          cloned.style.color = "white";
          cloned.style.padding = "1em";

          return cloned;
        }
      ]
    }
  },
  {
    title: "Events",
    detail: "",
    containerData: getFormFieldData(),
    cloneableOptions: {
      maxCloneable: 2,
      events: {
        load: [() => console.log("Cloneable: loaded!")],
        beforeStateChange: [() => alert("Cloneable: beforeStateChange")],
        afterStateChange: [() => alert("Cloneable: afterStateChange!")],
        uncloneable: [() => alert("Maximum limit reached!")]
      }
    }
  },
  {
    title:
      "Disable <code>cloneButton</code> when maximum number of cloned elements reached using <code>afterStateChange</code> event.",
    detail: "",
    containerData: getFormFieldData(),
    cloneableOptions: {
      maxCloneable: 2,
      events: {
        afterStateChange: [
          function() {
            this.cloneButton.disabled = !this.isCloneable();
          }
        ]
      }
    }
  }
];
