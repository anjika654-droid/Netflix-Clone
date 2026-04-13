// netflix_clone.js - JavaScript for Netflix clone demo UI

// Sample dataset for demo posters
const sample = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: [
    "The Lost Signal",
    "Dark Waters",
    "Azure Nights",
    "City of Echoes",
    "Midnight Run",
    "Silent Shore",
    "Neon Dawn",
    "Aftermath",
    "Broken Compass",
    "Glass Tower",
    "Silver Line",
    "Hidden Truths"
  ][i % 12],
  desc: "Short synopsis for the title that describes the plot in one sentence.",
  img: `https://picsum.photos/seed/net${i}/400/600`
}));

// Create card element
function makeCard(item) {
  const el = document.createElement("div");
  el.className = "card";
  el.tabIndex = 0;

  el.innerHTML = `
    <img src="${item.img}" alt="${item.title} poster" loading="lazy" />
    <div class="meta">${item.title}</div>
  `;

  // Click interactions
  el.addEventListener("click", () => openModal(item));

  // Keyboard accessibility
  el.addEventListener("keypress", (e) => {
    if (e.key === "Enter") openModal(item);
  });

  return el;
}

// Populate rows with cards
function populate() {
  const popular = document.getElementById("popularRow");
  const trending = document.getElementById("trendingRow");
  const newRow = document.getElementById("newRow");

  sample.slice(0, 8).forEach((it) => popular.appendChild(makeCard(it)));
  sample.slice(4, 12).forEach((it) => trending.appendChild(makeCard(it)));
  sample.slice(2, 8).forEach((it) => newRow.appendChild(makeCard(it)));
}

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("closeModal");

// Open modal function
function openModal(item) {
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modal.classList.add("open");
}

// Close modal
function closeModal() {
  modal.classList.remove("open");
}

// Event listeners
closeBtn.addEventListener("click", closeModal);

document.getElementById("playFeatured").addEventListener("click", () => {
  alert("Play featured — demo only");
});

document.getElementById("moreInfo").addEventListener("click", () => {
  openModal(sample[0]);
});

// Close modal on background click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Load content
populate();
