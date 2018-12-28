class PanelList {
  constructor(panel) {
    this.state = {
      active: null
    };
    this.panels = this.initPanels(panel);
    this.activeClassname = "active";
  }

  initPanels(panel) {
    const panelTabs = panel.querySelectorAll(".panel-tab");
    const panelContents = panel.querySelectorAll(".panel-content");

    return [...panelTabs].map((tab, index) => {
      tab.addEventListener("click", () => this.activate(index));

      return {
        tab,
        content: panelContents[index]
      };
    });
  }

  activate(id, callback = null) {
    const prevPanel = this.panels[this.state.active];
    const newPanel = this.panels[id];

    if (prevPanel) {
      prevPanel.tab.classList.remove(this.activeClassname);
      prevPanel.content.classList.remove(this.activeClassname);
    }

    newPanel.tab.classList.add(this.activeClassname);
    newPanel.content.classList.add(this.activeClassname);

    this.state.active = id;

    if (typeof callback === "function") {
      callback.call(this);
    }
  }
}

export default PanelList;
