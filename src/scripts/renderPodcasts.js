import { DataManager } from "./dataManager.js";
import { genres } from "./initialData.js";
import { Modal } from "./renderModal.js";

/**
 * Responsible for rendering podcast cards and injecting them into the DOM.
 *  Uses custom Web Components and connects each card with a modal for details.
 * @namespace PodcastRenderer
 */
export const PodcastRenderer = {
  /**
   *  Renders all podcast items to the specified container element.
   * @function
   * @param {Array<Object>} podcasts - Array of podcast objects to render. Each object should contain properties like `title`, `image`, `seasons`, `genres`, and `updated`.
   * @param {HTMLElement} container - The DOM element where podcast cards will be appended.
   */
  render: (podcasts, container) => {
    container.innerHTML = "";

    podcasts.forEach((podcast) => {
      const podcastEl = document.createElement("podcast-item");
      podcastEl.setPodcast(podcast);

      // Listen for custom event instead of directly wiring modal logic
      podcastEl.addEventListener("podcastSelected", (e) => {
        Modal.openModal(e.detail);
      });

      container.appendChild(podcastEl);
    });
  },
};
// Template for the podcast card component
const template = document.createElement("template");
template.innerHTML = /*html */ `<div id="card"></div>`;
/**
 * Custom element representing a podcast card.
 * Displays podcast information like title, image, genres, seasons, and updated time.
 *
 * @class
 * @extends HTMLElement
 */
class Podcast extends HTMLElement {
  /**
   * @type {Object|null}
   * @property {string} podcast.title - The title of the podcast.
   * @property {string} podcast.image - The URL to the podcast's cover image.
   * @property {number} podcast.seasons - Number of seasons available.
   * @property {Array<number>} podcast.genres - Array of genre IDs.
   * @property {string|Date} podcast.updated - The last updated timestamp.
   */
  podcast = null;

  constructor() {
    super();

    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "./src/output.css");

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));

    // Listen for internal click and dispatch a custom event
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("podcastSelected", {
          detail: this.podcast,
          bubbles: true, // Allows the event to bubble up to parent nodes
          composed: true, // Allows it to pass through shadow DOM boundaries
        })
      );
    });
  }
  /**
   * Sets the podcast data for the component and triggers a re-render.
   *
   * @param {Object} podcastObj - The podcast object containing relevant data.
   */
  setPodcast(podcastObj) {
    this.podcast = podcastObj;
    this.render();
  }
  /**
   * Renders the podcast card content inside the shadow DOM.
   * Includes the title, image, season count, genre tags, and last updated time.
   */
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
