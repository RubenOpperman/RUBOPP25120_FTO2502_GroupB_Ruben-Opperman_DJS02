import { DataManager } from "./dataManager.js";
import { genres } from "./initialData.js";
import { Modal } from "./renderModal.js";

/**
 * Responsible for rendering podcast cards and injecting them into the DOM.
 * @namespace PodcastRenderer
 */
export const PodcastRenderer = {
  /**
   * Renders all podcasts to the given container.
   * @function
   * @param {Array<Object>} podcasts - The array of podcast objects to render.
   * @param {HTMLElement} container - The DOM element where podcast cards should be appended.
   */
  render: (podcasts, container) => {
    container.innerHTML = "";

    podcasts.forEach((podcast) => {
      //const card = PodcastRenderer.createCard(podcast);

      const podcastEl = document.createElement("podcast-item");
      podcastEl.setPodcast(podcast);

      container.appendChild(podcastEl);
    });
  },
  /**
   * Creates a single podcast card element with image, title, genres, and updated time.
   * Also sets up the modal interaction.
   * @function
   * @param {Object} podcast - The podcast object to create a card for.
   * @param {string} podcast.title - The podcast title.
   * @param {string} podcast.image - URL to the podcast's image.
   * @param {Array<number>} podcast.genres - Array of genre IDs.
   * @param {string} podcast.updated - ISO date string for when the podcast was last updated.
   * @param {number} podcast.seasons - Number of seasons the podcast has.
   * @returns {HTMLElement} - The complete DOM element for the podcast card.
   */
  //   createCard: (podcast) => {
  //     const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
  //       "  /  "
  //     );
  //     const genreList = genreNames.split(" / ");
  //     const UpdateTimeAgo = DataManager.timeAgo(podcast.updated);
  //     const PodcastCardContainer = document.createElement("div");
  //     PodcastCardContainer.className =
  //       "w-full  rounded-lg border-2 border-[#9CA3AF] bg-Podcast-card p-2 shadow-lg mx-auto font-serif ";
  //     PodcastCardContainer.innerHTML = `

  //     <div class="p-2">
  //     <div class="w-[95%] h-[70%]  mx-auto rounded-lg mb-2"><img class="w-auto h-auto object-cover  rounded-2xl" src="${podcast.image}" > </div>
  //       <h2 class="text-lg font-bold p-1">${podcast.title}</h2>

  // <div class="flex mb-2">
  //     <img class="w-5 pr-2 h-auto" src="/assets/gray-calendar-25911.svg">
  //       <p class="text-sm text-gray-700 p-1 font-medium">${podcast.seasons} seasons</p>
  // </div>

  //      <div id="genre-container" class="flex flex-wrap gap-2 mb-2"></div>

  //       <p class="text-xs text-gray-500 p-1 font-semibold">Updated ${UpdateTimeAgo}</p>
  //     </div>
  //   `;
  //     const genresContainer =
  //       PodcastCardContainer.querySelector("#genre-container");

  //     genreList.forEach((genre) => {
  //       const genreTag = document.createElement("span");
  //       genreTag.className =
  //         "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
  //       genreTag.textContent = genre;
  //       genresContainer.appendChild(genreTag);
  //     });

  //     Modal.openModal(PodcastCardContainer, podcast);

  //     return PodcastCardContainer;
  //   },
};

const template = document.createElement("template");
template.innerHTML = /*html */ `<div  id="card"></div>`;

class Podcast extends HTMLElement {
  podcast = null;

  constructor() {
    super();

    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "./src/output.css");

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
  }

  setPodcast(podcastObj) {
    this.podcast = podcastObj;
    this.render();
  }

  render() {
    if (!this.podcast) return;

    const podcastEl = this.shadowRoot.querySelector("#card");
    const UpdateTimeAgo = DataManager.timeAgo(this.podcast.updated);
    const genreNames = DataManager.getGenreIds(this.podcast.genres, genres);

    podcastEl.className = `rounded-lg border-2 border-[#9CA3AF] bg-Podcast-card p-2 shadow-lg  font-serif `;
    podcastEl.innerHTML = `
      <div class="p-2">
        <div class="w-full h-full  mx-auto rounded-lg mb-2 overflow-hidden">
          <img class="w-full h-full object-cover block rounded-2xl" src="${this.podcast.image}">
        </div>

        <h2 class="text-lg font-bold p-1">${this.podcast.title}</h2>

        <div class="flex mb-2">
          <img class="w-5 pr-2 h-auto" src="/assets/gray-calendar-25911.svg">
          <p class="text-sm text-gray-700 p-1 font-medium">${this.podcast.seasons} seasons</p>
        </div>

        <div id="genre-container" class="flex flex-wrap gap-2 mb-2"></div>

        <p class="text-xs text-gray-500 p-1 font-semibold">Updated ${UpdateTimeAgo}</p>
      </div>
    `;

    const genresContainer = podcastEl.querySelector("#genre-container");

    genreNames.forEach((genre) => {
      const tag = document.createElement("span");
      tag.className =
        "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
      tag.textContent = genre;
      genresContainer.appendChild(tag);
    });
  }
}

customElements.define("podcast-item", Podcast);
