const tabs = document.querySelectorAll(".dashboard-tab");
const mainPanels = document.querySelectorAll(".tab-panel");
const sidePanels = document.querySelectorAll(".side-panel-group");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;

        tabs.forEach((item) => item.classList.remove("active-tab"));
        mainPanels.forEach((panel) => panel.classList.remove("active-panel"));
        sidePanels.forEach((panel) => panel.classList.remove("active-panel"));

        tab.classList.add("active-tab");

        const activeMainPanel = document.getElementById(`${tabName}-panel`);
        const activeSidePanel = document.getElementById(`${tabName}-side`);

        if (activeMainPanel) activeMainPanel.classList.add("active-panel");
        if (activeSidePanel) activeSidePanel.classList.add("active-panel");
    });
});

const defaultProfile = {
    avatarData: "",
    displayName: "Kelly",
    gender: "",
    birthday: "",
    region: "",
    userId: "TT-2025-00421",
    bio: "Curious about everyday decisions, good design, and helping people choose more clearly.",
    interests: ["Technology", "Food", "Travel", "Design"]
};

function getProfileData() {
    const saved = JSON.parse(localStorage.getItem("profileData") || "null");
    return saved || defaultProfile;
}

function saveProfileData(data) {
    localStorage.setItem("profileData", JSON.stringify(data));
}

function renderProfilePage() {
    const data = getProfileData();

    const avatar = document.getElementById("profileAvatar");
    const displayName = document.getElementById("profileDisplayName");
    const bio = document.getElementById("profileBioText");
    const interests = document.getElementById("profileInterestRow");
    const preferenceList = document.getElementById("profilePreferenceList");
    const factsList = document.getElementById("profileFactsList");

    if (avatar) {
        if (data.avatarData && data.avatarData.trim() !== "") {
            avatar.innerHTML = `<img src="${data.avatarData}" alt="Avatar" class="profile-avatar-image">`;
        } else {
            avatar.textContent = (data.displayName || "Kelly").charAt(0).toUpperCase();
        }
    }

    if (displayName) displayName.textContent = data.displayName || "Kelly";
    if (bio) bio.textContent = data.bio || defaultProfile.bio;

    if (interests) {
        interests.innerHTML = "";
        data.interests.forEach((interest) => {
            const span = document.createElement("span");
            span.textContent = interest;
            interests.appendChild(span);
        });
    }

    if (preferenceList) {
        preferenceList.innerHTML = "";
        data.interests.forEach((interest) => {
            const span = document.createElement("span");
            span.textContent = interest;
            preferenceList.appendChild(span);
        });
    }

    if (factsList) {
        factsList.innerHTML = `
            <div><span>Gender</span><strong>${data.gender || "Not set"}</strong></div>
            <div><span>Birthday</span><strong>${data.birthday || "Not set"}</strong></div>
            <div><span>Region</span><strong>${data.region || "Not set"}</strong></div>
            <div><span>ID</span><strong>${data.userId || "TT-2025-00421"}</strong></div>
        `;
    }
}

const editForm = document.getElementById("editProfileForm");
const avatarFileInput = document.getElementById("avatarFileInput");
const displayNameInput = document.getElementById("displayNameInput");
const genderInput = document.getElementById("genderInput");
const birthdayInput = document.getElementById("birthdayInput");
const ipInput = document.getElementById("ipInput");
const bioInput = document.getElementById("bioInput");
const userIdDisplay = document.getElementById("userIdDisplay");

const previewAvatarImage = document.getElementById("previewAvatarImage");
const previewAvatarFallback = document.getElementById("previewAvatarFallback");
const previewAvatarImageSide = document.getElementById("previewAvatarImageSide");
const previewAvatarFallbackSide = document.getElementById("previewAvatarFallbackSide");

const previewDisplayName = document.getElementById("previewDisplayName");
const previewGender = document.getElementById("previewGender");
const previewBirthday = document.getElementById("previewBirthday");
const previewIP = document.getElementById("previewIP");
const previewUserId = document.getElementById("previewUserId");
const previewBio = document.getElementById("previewBio");
const previewInterestRow = document.getElementById("previewInterestRow");

const interestButtons = document.querySelectorAll(".edit-interest-option");

let currentAvatarData = "";

function setPreviewAvatar(avatarData, displayName) {
    const initial = (displayName || "Kelly").charAt(0).toUpperCase();

    if (avatarData && avatarData.trim() !== "") {
        if (previewAvatarImage) {
            previewAvatarImage.src = avatarData;
            previewAvatarImage.style.display = "block";
        }
        if (previewAvatarFallback) {
            previewAvatarFallback.style.display = "none";
        }

        if (previewAvatarImageSide) {
            previewAvatarImageSide.src = avatarData;
            previewAvatarImageSide.style.display = "block";
        }
        if (previewAvatarFallbackSide) {
            previewAvatarFallbackSide.style.display = "none";
        }
    } else {
        if (previewAvatarImage) previewAvatarImage.style.display = "none";
        if (previewAvatarFallback) {
            previewAvatarFallback.style.display = "flex";
            previewAvatarFallback.textContent = initial;
        }

        if (previewAvatarImageSide) previewAvatarImageSide.style.display = "none";
        if (previewAvatarFallbackSide) {
            previewAvatarFallbackSide.style.display = "flex";
            previewAvatarFallbackSide.textContent = initial;
        }
    }
}

function renderPreview() {
    if (!previewDisplayName) return;

    const selectedInterests = Array.from(document.querySelectorAll(".edit-interest-option.selected"))
        .map((btn) => btn.textContent.trim());

    const displayName = displayNameInput.value.trim() || "Kelly";

    setPreviewAvatar(currentAvatarData, displayName);

    previewDisplayName.textContent = displayName;
    previewGender.textContent = genderInput.value || "Gender not set";
    previewBirthday.textContent = birthdayInput.value || "Birthday not set";
    previewIP.textContent = ipInput.value.trim() || "Region not set";
    previewUserId.textContent = `ID: ${userIdDisplay.textContent}`;
    previewBio.textContent = bioInput.value.trim() || defaultProfile.bio;

    previewInterestRow.innerHTML = "";
    (selectedInterests.length ? selectedInterests : defaultProfile.interests).forEach((interest) => {
        const span = document.createElement("span");
        span.textContent = interest;
        previewInterestRow.appendChild(span);
    });
}

function loadEditProfilePage() {
    if (!editForm) return;

    const data = getProfileData();

    currentAvatarData = data.avatarData || "";
    displayNameInput.value = data.displayName || "Kelly";
    genderInput.value = data.gender || "";
    birthdayInput.value = data.birthday || "";
    ipInput.value = data.region || "";
    bioInput.value = data.bio || defaultProfile.bio;
    userIdDisplay.textContent = data.userId || "TT-2025-00421";

    interestButtons.forEach((btn) => {
        if (data.interests.includes(btn.textContent.trim())) {
            btn.classList.add("selected");
        }
    });

    renderPreview();

    [displayNameInput, genderInput, birthdayInput, ipInput, bioInput].forEach((input) => {
        input.addEventListener("input", renderPreview);
        input.addEventListener("change", renderPreview);
    });

    if (avatarFileInput) {
        avatarFileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                currentAvatarData = e.target.result;
                renderPreview();
            };
            reader.readAsDataURL(file);
        });
    }

    interestButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("selected");
            renderPreview();
        });
    });

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const selectedInterests = Array.from(document.querySelectorAll(".edit-interest-option.selected"))
            .map((btn) => btn.textContent.trim());

        const updated = {
            avatarData: currentAvatarData,
            displayName: displayNameInput.value.trim() || "Kelly",
            gender: genderInput.value || "",
            birthday: birthdayInput.value || "",
            region: ipInput.value.trim() || "",
            userId: userIdDisplay.textContent || "TT-2025-00421",
            bio: bioInput.value.trim() || defaultProfile.bio,
            interests: selectedInterests.length ? selectedInterests : defaultProfile.interests
        };

        saveProfileData(updated);
        localStorage.setItem("selectedInterests", JSON.stringify(updated.interests));
        window.location.href = "profile.html";
    });
}

renderProfilePage();
loadEditProfilePage();
