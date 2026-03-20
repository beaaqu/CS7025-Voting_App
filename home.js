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


function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const container = document.querySelector("#for-you-panel");

    if (!container) return;

    container.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "question-card-v2";

        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description || ""}</p>

            <div class="vote-choice-row">
                ${post.options.map(opt => `<button class="vote-choice">${opt}</button>`).join("")}
            </div>

            <div class="comment-section">
                <input type="text" placeholder="Add comment..." class="comment-input">
                <button class="add-comment-btn">Add Comment</button>
                <div class="comments-list"></div>
            </div>
        `;

        const input = article.querySelector(".comment-input");
        const btn = article.querySelector(".add-comment-btn");
        const list = article.querySelector(".comments-list");

        function renderComments() {
            list.innerHTML = "";
            post.comments.forEach(c => {
                const p = document.createElement("p");
                p.textContent = c;
                list.appendChild(p);
            });
        }

        renderComments();

        btn.addEventListener("click", () => {
            if (!input.value.trim()) return;

            post.comments.push(input.value.trim());

            const posts = JSON.parse(localStorage.getItem("posts"));
            const index = posts.findIndex(p => p.id === post.id);
            posts[index] = post;
            localStorage.setItem("posts", JSON.stringify(posts));

            input.value = "";
            renderComments();
        });

        container.appendChild(article);
    });
}

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const container = document.querySelector("#for-you-panel");

    if (!container) return;

    container.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "question-card-v2";

        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description || ""}</p>

            <div class="vote-choice-row">
                ${post.options.map(opt => `<button class="vote-choice">${opt}</button>`).join("")}
            </div>

            <div class="comment-preview-box">
                <div class="comment-preview-top">
                    <span class="comment-count">${post.comments.length} comments</span>
                    <span class="comment-link">View discussion</span>
                </div>
            </div>

            <div class="comment-section" style="display:none;">
                <div class="comments-list"></div>

                <div style="margin-top:10px;">
                    <input type="text" placeholder="Write a comment..." class="comment-input">
                    <button class="add-comment-btn">Post</button>
                </div>
            </div>
        `;

        const toggleBtn = article.querySelector(".comment-link");
        const section = article.querySelector(".comment-section");
        const list = article.querySelector(".comments-list");
        const input = article.querySelector(".comment-input");
        const btn = article.querySelector(".add-comment-btn");

        // 🔁 render comments
        function renderComments() {
            list.innerHTML = "";

            post.comments.forEach(comment => {
                const p = document.createElement("p");
                p.textContent = comment;
                list.appendChild(p);
            });
        }

        renderComments();

        // 👇 toggle discussion
        toggleBtn.addEventListener("click", () => {
            if (section.style.display === "none") {
                section.style.display = "block";
                toggleBtn.textContent = "Hide discussion";
            } else {
                section.style.display = "none";
                toggleBtn.textContent = "View discussion";
            }
        });

        // ➕ add comment
        btn.addEventListener("click", () => {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));

            if (!currentUser) {
                alert("Login to comment");
                return;
            }

            const text = input.value.trim();
            if (!text) return;

            const newComment = `${currentUser.username}: ${text}`;
            post.comments.push(newComment);

            const posts = JSON.parse(localStorage.getItem("posts"));
            const index = posts.findIndex(p => p.id === post.id);
            posts[index] = post;

            localStorage.setItem("posts", JSON.stringify(posts));

            input.value = "";
            renderComments();

            article.querySelector(".comment-count").textContent =
                `${post.comments.length} comments`;
        });

        container.appendChild(article);
    });
}

renderPosts();