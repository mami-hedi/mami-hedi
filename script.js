// =========================
// Portfolio Projects (Optimisé)
// - Compatible avec ton ancien format: {name, image, url}
// - Ajoute recherche + filtre par tags
// - Supporte aussi le nouveau format optionnel: {description, tags}
// =========================

// 1) DATA: anciens + nouveaux
const projects = [
  // ======= ANCIENS (WordPress / sites) =======
  { name: "mylieu", image: "img/LOGO-MYLIEU.webp", url: "https://www.mylieu.fr/", tags: ["WordPress"] },
  { name: "Gem by Gwenaelle", image: "img/gemb.webp", url: "https://www.gembygwenaelle.fr/", tags: ["WordPress"] },

  { name: "Petits Pieds Grand Pas", image: "img/pauli.webp", url: "https://petitspiedsgrandpas.com/", tags: ["WordPress"] },
  { name: "Clothilde Valade", image: "img/clothlide.webp", url: "https://www.clothildevalade.com/", tags: ["WordPress"] },
  { name: "Fleurs d’Harmonie", image: "img/fleurs.webp", url: "https://fleursdharmonie.com/", tags: ["WordPress"] },

  { name: "Le Clos Lacam", image: "img/closlacam-logo-1536x928.webp", url: "https://www.closlacam.fr/", tags: ["WordPress"] },
  { name: "Séjour Médical", image: "img/se.PNG", url: "https://www.sejour-medical.fr/", tags: ["WordPress"] },
  { name: "MH Digital Solution", image: "img/mh.PNG", url: "https://www.mh-digital-solution.com/", tags: ["WordPress", "Agency"] },

  // ======= NOUVEAUX (React / Vercel) =======
  {
    name: "Dar Mamie Dida",
    image: "img/dar-mamie-dida.PNG",
    url: "https://dar-mamie-dida.vercel.app/",
    description: "Site moderne développé avec ReactJS (UI responsive).",
    tags: ["ReactJS", "Vercel"]
  },
  {
    name: "Darb B",
    image: "img/darb-b.PNG",
    url: "https://darb-b.vercel.app/",
    description: "Application web moderne (React) déployée sur Vercel.",
    tags: ["ReactJS", "Vercel"]
  }
];

// 2) ELEMENTS
const projectList = document.getElementById("project-list");

// 3) HELPERS
const uniq = (arr) => [...new Set(arr)];
const escapeHtml = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function normalizeProject(p) {
  return {
    name: p.name || "Projet",
    image: p.image || "img/project-placeholder.jpg",
    url: p.url || "#",
    description: p.description || "",
    tags: Array.isArray(p.tags) ? p.tags : []
  };
}

function matches(project, q, activeTag) {
  const query = (q || "").trim().toLowerCase();
  const haystack = `${project.name} ${project.description} ${project.tags.join(" ")}`.toLowerCase();

  const queryOk = !query || haystack.includes(query);
  const tagOk = activeTag === "Tous" || project.tags.includes(activeTag);

  return queryOk && tagOk;
}

// 4) UI CONTROLS (recherche + filtres) — injectés automatiquement au-dessus de #project-list
const state = { query: "", tag: "Tous" };

function injectControls() {
  if (!projectList) return;

  // Évite double injection si tu recharges
  if (document.getElementById("portfolio-controls")) return;

  const allTags = uniq(projects.flatMap((p) => (p.tags || []))).sort();
  const tags = ["Tous", ...allTags];

  const wrapper = document.createElement("div");
  wrapper.id = "portfolio-controls";
  wrapper.classList.add("toolbar");

  // Search
  const search = document.createElement("div");
  search.classList.add("search");
  search.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Rechercher un projet (ex: React, WordPress...)";
  searchInput.setAttribute("aria-label", "Rechercher un projet");
  search.appendChild(searchInput);

  // Filters container
  const filters = document.createElement("div");
  filters.classList.add("filters");

  tags.forEach((t, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = t;
    btn.dataset.tag = t;
    btn.classList.add("filter-btn");
    if (idx === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      state.tag = t;
      [...filters.querySelectorAll("button")].forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects();
    });

    filters.appendChild(btn);
  });

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value || "";
    renderProjects();
  });

  wrapper.appendChild(search);
  wrapper.appendChild(filters);

  // Insert controls just before the projects grid
  projectList.parentElement.insertBefore(wrapper, projectList);
}

// 5) RENDER
function renderProjects() {
  if (!projectList) return;
  projectList.innerHTML = "";

  const normalized = projects.map(normalizeProject);
  const filtered = normalized.filter((p) => matches(p, state.query, state.tag));

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    empty.textContent = "Aucun projet ne correspond à votre recherche.";
    projectList.appendChild(empty);
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("project");

    const tagsHtml = p.tags.length
      ? `<div class="project-tags">${p.tags
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("")}</div>`
      : "";

    const descHtml = p.description ? `<p class="project-desc">${escapeHtml(p.description)}</p>` : "";

    // Markup aligné avec le CSS : .project-media (image) + .project-body (texte/actions)
    card.innerHTML = `
      <div class="project-media">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='img/project-placeholder.jpg';">
      </div>
      <div class="project-body">
        <h3>${escapeHtml(p.name)}</h3>
        ${descHtml}
        ${tagsHtml}
        <div class="project-actions">
          <a href="${escapeHtml(p.url)}" target="_blank" rel="noreferrer">Visiter le site</a>
        </div>
      </div>
    `;

    projectList.appendChild(card);
  });
}

// 6) INIT
document.addEventListener("DOMContentLoaded", () => {
  injectControls();
  renderProjects();
});
