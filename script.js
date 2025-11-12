const projects = [
  {
    name: "Séjour Médical",
    image: "https://www.mh-digital-solution.com/wp-content/uploads/2023/05/sejourmedical.jpg",
    url: "https://www.sejour-medical.fr/"
  },
  {
    name: "Gem by Gwenaelle",
    image: "https://cdn-ildokec.nitrocdn.com/CjqSBgyqnASARKUDqqEfnftyEdcuXVky/assets/images/optimized/rev-0c5dc04/www.mh-digital-solution.com/wp-content/uploads/2025/08/gemb.png",
    url: "https://www.gembygwenaelle.fr/"
  },
  {
    name: "Histoire Zen",
    image: "https://www.mh-digital-solution.com/wp-content/uploads/2023/06/histoirezen.jpg",
    url: "https://www.histoire-zen.fr/"
  },
  {
    name: "Petits Pieds Grand Pas",
    image: "https://www.mh-digital-solution.com/wp-content/uploads/2023/07/petits.jpg",
    url: "https://petitspiedsgrandpas.com/"
  },
  {
    name: "Clothilde Valade",
    image: "https://www.mh-digital-solution.com/wp-content/uploads/2023/08/clothilde.jpg",
    url: "https://www.clothildevalade.com/"
  },
  {
    name: "Fleurs d’Harmonie",
    image: "https://www.mh-digital-solution.com/wp-content/uploads/2023/09/fleurs.jpg",
    url: "https://fleursdharmonie.com/"
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
