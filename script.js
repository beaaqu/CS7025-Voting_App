const tabs = document.querySelectorAll(".dashboard-tab");
const mainPanels = document.querySelectorAll(".tab-panel");
const sidePanels = document.querySelectorAll(".side-panel-group");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;

        tabs.forEach((item) => {
            item.classList.remove("active-tab");
        });

        mainPanels.forEach((panel) => {
            panel.classList.remove("active-panel");
        });

        sidePanels.forEach((panel) => {
            panel.classList.remove("active-panel");
        });

        tab.classList.add("active-tab");

        const activeMainPanel = document.getElementById(`${tabName}-panel`);
        const activeSidePanel = document.getElementById(`${tabName}-side`);

        if (activeMainPanel) {
            activeMainPanel.classList.add("active-panel");
        }

        if (activeSidePanel) {
            activeSidePanel.classList.add("active-panel");
        }
    });
});
