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
    image: "img/dar-mamie-dida.PNG", // tu peux changer le nom du fichier image
    url: "https://dar-mamie-dida.vercel.app/",
    description: "Site moderne développé avec ReactJS (UI responsive).",
    tags: ["ReactJS", "Vercel"]
  },
  {
    name: "Darb B",
    image: "img/darb-b.PNG", // tu peux changer le nom du fichier image
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
  wrapper.style.display = "flex";
  wrapper.style.gap = "12px";
  wrapper.style.flexWrap = "wrap";
  wrapper.style.alignItems = "center";
  wrapper.style.margin = "14px 0";

  // Search
  const search = document.createElement("input");
  search.type = "search";
  search.placeholder = "Rechercher un projet (ex: React, WordPress...)";
  search.setAttribute("aria-label", "Rechercher un projet");
  search.style.flex = "1 1 260px";
  search.style.padding = "12px 14px";
  search.style.borderRadius = "999px";
  search.style.border = "1px solid rgba(255,255,255,.12)";
  search.style.background = "rgba(0,0,0,.2)";
  search.style.color = "inherit";
  search.style.outline = "none";

  // Filters container
  const filters = document.createElement("div");
  filters.style.display = "flex";
  filters.style.gap = "8px";
  filters.style.flexWrap = "wrap";

  tags.forEach((t, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = t;
    btn.dataset.tag = t;

    // Style minimal (utilise ton CSS si tu veux)
    btn.style.cursor = "pointer";
    btn.style.padding = "10px 12px";
    btn.style.borderRadius = "999px";
    btn.style.border = "1px solid rgba(255,255,255,.12)";
    btn.style.background = idx === 0 ? "rgba(45,107,255,.25)" : "rgba(255,255,255,.05)";
    btn.style.color = "inherit";
    btn.style.fontWeight = "700";
    btn.style.fontSize = "13px";

    btn.addEventListener("click", () => {
      state.tag = t;
      [...filters.querySelectorAll("button")].forEach((b) => {
        b.style.background = "rgba(255,255,255,.05)";
        b.style.borderColor = "rgba(255,255,255,.12)";
      });
      btn.style.background = "rgba(45,107,255,.25)";
      btn.style.borderColor = "rgba(45,107,255,.6)";
      renderProjects();
    });

    filters.appendChild(btn);
  });

  search.addEventListener("input", (e) => {
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
    empty.textContent = "Aucun projet ne correspond à votre recherche.";
    empty.style.padding = "18px";
    empty.style.border = "1px dashed rgba(255,255,255,.2)";
    empty.style.borderRadius = "14px";
    empty.style.color = "rgba(233,238,252,.72)";
    empty.style.gridColumn = "1 / -1";
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

    card.innerHTML = `
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='img/project-placeholder.jpg';">
      <h3>${escapeHtml(p.name)}</h3>
      ${descHtml}
      ${tagsHtml}
      <a href="${escapeHtml(p.url)}" target="_blank" rel="noreferrer">Visiter le site</a>
    `;

    projectList.appendChild(card);
  });
}

// 6) INIT
document.addEventListener("DOMContentLoaded", () => {
  injectControls();
  renderProjects();
});
