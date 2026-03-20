// FEED TABS
const feedTabs = document.querySelectorAll(".feed-tab");
const feedPanels = document.querySelectorAll(".feed-panel");

feedTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const feedName = tab.dataset.feed;

        feedTabs.forEach(t => t.classList.remove("active-feed-tab"));
        feedPanels.forEach(p => p.classList.remove("active-feed-panel"));

        tab.classList.add("active-feed-tab");
        document.getElementById(`${feedName}-panel`)?.classList.add("active-feed-panel");
    });
});

// STATIC POSTS (HTML ONES)
function enhanceExistingPosts() {
    const posts = document.querySelectorAll(".question-card-v2");

    posts.forEach((article, index) => {
        const list = article.querySelector(".comments-list");

        // Load saved comments OR keep existing ones
        let saved = JSON.parse(localStorage.getItem("comments-" + index) || "null");

        if (!saved) {
            // extract existing comments from HTML
            saved = [];
            list.querySelectorAll("p").forEach(p => {
                saved.push(p.textContent);
            });
        }

        const post = {
            id: "static-" + index,
            comments: saved
        };

        attachLogic(article, post, index, true);
    });
}

// DYNAMIC POSTS
function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const container = document.querySelector("#for-you-panel");

    posts.forEach(post => {
        if (!post.comments) post.comments = [];

        const article = document.createElement("article");
        article.className = "question-card-v2";

        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description || ""}</p>

            <div class="vote-choice-row">
                ${post.options.map(opt => `<button class="vote-choice">${opt}</button>`).join("")}
            </div>

            <div class="comment-box">
                <div class="comment-top">
                    <span class="comment-count">${post.comments.length} comments</span>
                    <button class="view-comments-btn">View discussion</button>
                </div>

                <div class="comments-container" style="display:none;">
                    <div class="comments-list"></div>

                    <button class="open-comment-input-btn">Add Comment</button>

                    <div class="comment-input-area" style="display:none;">
                        <input type="text" class="comment-input" placeholder="Write a comment...">
                        <button class="submit-comment-btn">Post</button>
                    </div>
                </div>
            </div>
        `;

        attachLogic(article, post, null, false);
        container.prepend(article);
    });
}

// SHARED COMMENT LOGIC
function attachLogic(article, post, index, isStatic) {
    const viewBtn = article.querySelector(".view-comments-btn");
    const container = article.querySelector(".comments-container");
    const list = article.querySelector(".comments-list");

    const openBtn = article.querySelector(".open-comment-input-btn");
    const inputArea = article.querySelector(".comment-input-area");
    const input = article.querySelector(".comment-input");
    const submit = article.querySelector(".submit-comment-btn");

    function renderComments() {
        list.innerHTML = "";

        post.comments.forEach(c => {
            const p = document.createElement("p");
            p.className = "single-comment";
            p.textContent = c;
            list.appendChild(p);
        });

        article.querySelector(".comment-count").textContent =
            `${post.comments.length} comments`;
    }

    renderComments();

    viewBtn.addEventListener("click", () => {
        container.style.display =
            container.style.display === "none" ? "block" : "none";
    });

    openBtn.addEventListener("click", () => {
        inputArea.style.display = "block";
        input.focus();
    });

    submit.addEventListener("click", () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {
            alert("Login to comment");
            return;
        }

        const text = input.value.trim();
        if (!text) return;

        const newComment = `${currentUser.username}: ${text}`;
        post.comments.push(newComment);

        if (isStatic) {
            localStorage.setItem("comments-" + index, JSON.stringify(post.comments));
        } else {
            const posts = JSON.parse(localStorage.getItem("posts") || "[]");
            const i = posts.findIndex(p => p.id === post.id);
            if (i !== -1) {
                posts[i] = post;
                localStorage.setItem("posts", JSON.stringify(posts));
            }
        }

        input.value = "";
        renderComments();
    });
}

// INIT
renderPosts();
enhanceExistingPosts();