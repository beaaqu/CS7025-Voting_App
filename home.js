localStorage.removeItem("hasSeenInterestModal");
const feedTabs = document.querySelectorAll(".feed-tab");
const feedPanels = document.querySelectorAll(".feed-panel");

feedTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const feedName = tab.dataset.feed;

        feedTabs.forEach((item) => {
            item.classList.remove("active-feed-tab");
        });

        feedPanels.forEach((panel) => {
            panel.classList.remove("active-feed-panel");
        });

        tab.classList.add("active-feed-tab");

        const activePanel = document.getElementById(`${feedName}-panel`);
        if (activePanel) {
            activePanel.classList.add("active-feed-panel");
        }
    });
});

const interestModal = document.getElementById("interestModal");
const interestOptions = document.querySelectorAll(".interest-option");
const skipInterestsBtn = document.getElementById("skipInterestsBtn");
const saveInterestsBtn = document.getElementById("saveInterestsBtn");
const homeInterestList = document.getElementById("homeInterestList");

function renderSavedInterests() {
    const saved = JSON.parse(localStorage.getItem("selectedInterests") || "[]");

    if (homeInterestList && saved.length > 0) {
        homeInterestList.innerHTML = "";
        saved.forEach((interest) => {
            const span = document.createElement("span");
            span.textContent = interest;
            homeInterestList.appendChild(span);
        });
    }
}

const hasSeenOnboarding = localStorage.getItem("hasSeenInterestModal");

if (!hasSeenOnboarding && interestModal) {
    interestModal.classList.add("show");
}

interestOptions.forEach((option) => {
    option.addEventListener("click", () => {
        option.classList.toggle("selected");
    });
});

if (skipInterestsBtn) {
    skipInterestsBtn.addEventListener("click", () => {
        localStorage.setItem("hasSeenInterestModal", "true");
        interestModal.classList.remove("show");
        renderSavedInterests();
    });
}

if (saveInterestsBtn) {
    saveInterestsBtn.addEventListener("click", () => {
        const selectedInterests = [];

        interestOptions.forEach((option) => {
            if (option.classList.contains("selected")) {
                selectedInterests.push(option.textContent.trim());
            }
        });

        localStorage.setItem("hasSeenInterestModal", "true");
        localStorage.setItem("selectedInterests", JSON.stringify(selectedInterests));
        interestModal.classList.remove("show");
        renderSavedInterests();
    });
}

renderSavedInterests();
