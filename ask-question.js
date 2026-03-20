const addOptionBtn = document.getElementById("addOptionBtn");
const optionsContainer = document.getElementById("optionsContainer");
const form = document.getElementById("questionForm");

const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewOptions = document.getElementById("previewOptions");

const questionTitleInput = document.getElementById("questionTitle");
const questionDescriptionInput = document.getElementById("questionDescription");

let optionCount = 2;

function updatePreview() {
    const titleValue = questionTitleInput.value.trim();
    const descriptionValue = questionDescriptionInput.value.trim();
    const optionInputs = document.querySelectorAll('input[name="option[]"]');

    previewTitle.textContent = titleValue || "Your question will appear here";
    previewDescription.textContent =
        descriptionValue || "Add a title and a short description to preview your post.";

    previewOptions.innerHTML = "";

    optionInputs.forEach((input, index) => {
        const optionText = input.value.trim() || `Option ${index + 1}`;
        const pill = document.createElement("span");
        pill.className = "preview-option-pill";
        pill.textContent = optionText;
        previewOptions.appendChild(pill);
    });
}

addOptionBtn.addEventListener("click", () => {
    optionCount += 1;

    const optionRow = document.createElement("div");
    optionRow.className = "option-input-row";

    optionRow.innerHTML = `
        <input type="text" name="option[]" placeholder="Option ${optionCount}">
    `;

    optionsContainer.appendChild(optionRow);

    const newInput = optionRow.querySelector("input");
    newInput.addEventListener("input", updatePreview);
    updatePreview();
});

questionTitleInput.addEventListener("input", updatePreview);
questionDescriptionInput.addEventListener("input", updatePreview);

document.querySelectorAll('input[name="option[]"]').forEach((input) => {
    input.addEventListener("input", updatePreview);
});

form.addEventListener("reset", () => {
    setTimeout(() => {
        const allOptionRows = document.querySelectorAll(".option-input-row");
        allOptionRows.forEach((row, index) => {
            if (index > 1) {
                row.remove();
            }
        });

        optionCount = 2;
        updatePreview();
    }, 0);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("You must be logged in");
        return;
    }

    const title = questionTitleInput.value.trim();
    const description = questionDescriptionInput.value.trim();
    const options = Array.from(document.querySelectorAll('input[name="option[]"]'))
        .map(i => i.value.trim())
        .filter(v => v !== "");

    if (!title || options.length < 2) {
        alert("Add title and at least 2 options");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        title,
        description,
        options,
        comments: []
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Posted!");
    window.location.href = "home.html";
});
