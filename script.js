const projects = [
  {
    name: "mylieu",
    image: "img/LOGO-MYLIEU.webp",
    url: "https://www.mylieu.fr/"
  },
  {
    name: "Gem by Gwenaelle",
    image: "img/gemb.webp",
    url: "https://www.gembygwenaelle.fr/"
  },
  {
    name: "Histoire Zen",
    image: "img/hist.webp",
    url: "https://www.histoire-zen.fr/"
  },
  {
    name: "Petits Pieds Grand Pas",
    image: "img/pauli.webp",
    url: "https://petitspiedsgrandpas.com/"
  },
  {
    name: "Clothilde Valade",
    image: "img/clothlide.webp",
    url: "https://www.clothildevalade.com/"
  },
  {
    name: "Fleurs d’Harmonie",
    image: "img/fleurs.webp",
    url: "https://fleursdharmonie.com/"
  },
  {
    name: "gilles ravary",
    image: "img/Gilles-Ravary-logo.webp",
    url: "https://gilles-ravary.fr/"
  },
  {
    name: "Le Clos Lacam",
    image: "img/closlacam-logo-1536x928.webp",
    url: "https://www.closlacam.fr/"
  },
  {
    
    name: "Séjour Médical",
    image: "img/sejour.png",
    url: "https://www.sejour-medical.fr/"
  },
  {
    
    name: "MH Digital Solution",
    image: "img/Logo-mh.webp",
    url: "https://www.mh-digital-solution.com/"
  },
];

const projectList = document.getElementById("project-list");

projects.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("project");
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <a href="${p.url}" target="_blank">Visiter le site</a>
  `;
  projectList.appendChild(card);
});
