const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <span class="close">&times;</span>
  <img class="modal-img" />
  <div class="modal-buttons">
    <button class="like-btn">❤️ Like</button>
    <a class="download-btn" download target="_blank">⬇️ Download</a>
  </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector(".modal-img");
const downloadBtn = modal.querySelector(".download-btn");
const likeBtn = modal.querySelector(".like-btn");
const closeBtn = modal.querySelector(".close");

let likeCount = 0;

const images = document.querySelectorAll(".box img");
images.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    downloadBtn.href = img.src;
  });
});


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

likeBtn.addEventListener("click", () => {
  likeCount++;
  likeBtn.textContent = `❤️ ${likeCount} Like${likeCount > 1 ? 's' : ''}`;
});

const toggleTheme = document.createElement("button");
toggleTheme.textContent = "🌙";
toggleTheme.className = "theme-switch";
document.body.appendChild(toggleTheme);

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
