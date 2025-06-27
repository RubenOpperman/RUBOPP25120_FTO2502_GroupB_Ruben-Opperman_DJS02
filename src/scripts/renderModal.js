import { DataManager } from "./dataManager.js";
import { genres, seasons } from "./initialData.js";

/**
 * Handles opening and closing of the podcast modal.
 * @namespace Modal
 */
export const Modal = {
  /**
   * Opens the modal with the provided podcast content.
   * @function
   * @param {HTMLElement} container - The element that was clicked to trigger the modal.
   * @param {Object} podcast - The podcast object to render in the modal.
   */
  openModal: (container, podcast) => {
    container.addEventListener("click", function () {
      const modal = document.getElementById("podcast-modal");
      modal.innerHTML = "";
      const content = ModalRenderer.createModalCard(podcast);
      modal.appendChild(content);
      modal.showModal();
      const closeBtn = document.getElementById("close-btn");
      Modal.closeModal(closeBtn);
    });
  },
  /**
   * Closes the modal when the close button is clicked.
   * @function
   * @param {HTMLElement} closeBtn - The close button element inside the modal.
   */
  closeModal: (closeBtn) => {
    closeBtn.addEventListener("click", function () {
      document.getElementById("podcast-modal").close();
    });
  },
};
/**
 * Handles the rendering of podcast content inside the modal.
 * @namespace ModalRenderer
 */
export const ModalRenderer = {
  /**
   * Renders a podcast card into the given container.
   * @function
   * @param {Object} podcast - The podcast object to render.
   * @param {HTMLElement} container - The container where the modal content will be placed.
   */
  render: (podcast, container) => {
    container.innerHTML = "";

    const card = ModalRenderer.createModalCard(podcast);
    container.appendChild(card);
  },
  /**
   * Creates and returns a podcast modal DOM element with description, genres, and seasons.
   * @function
   * @param {Object} podcast - The podcast object.
   * @returns {HTMLElement} - The fully populated modal container.
   */
  createModalCard: (podcast) => {
    const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
      " / "
    );

    const UpdateDate = new Date(podcast.updated);
    const formattedDate = UpdateDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const ModalContainer = document.createElement("div");

    ModalContainer.className =
      "max-w-[full] h-auto w-auto border-1 border-[#9CA3AF] rounded-lg bg-white p-4 font-serif";
    ModalContainer.innerHTML = `<div class="text-right">
  <div class="flex w-full mb-5">
    <h2 class="text-2xl font-bold mb-2">${podcast.title}</h2>
    <button id="close-btn" class="text-red-500 text-3xl ml-auto font-bold">&times;</button>
  </div>
</div>

<div class="flex flex-col md:flex-row gap-6">
  <!-- Image Section -->
  <div class="md:w-1/2">
    <div class="w-full h-auto bg-light-grey rounded-lg mb-2">
      <img
        class="w-full h-full object-cover rounded-2xl"
        src="${podcast.image}"
        alt="${podcast.title} cover"
      />
    </div>
  </div>

  <!-- Textual Content Section -->
  <div class="md:w-1/2">
    <!-- Description -->
    <h3 class="text-xl font-bold mt-2 mb-5">Description</h3>
    <p class="text-secondary-font-color">${podcast.description}</p>

    <!-- Genres -->
    <h3 class="text-xl font-bold mt-10 mb-5">Genres:</h3>
    <div id="genre-container" class="flex flex-wrap gap-2"></div>

    <!-- Last Updated -->
    <div class="flex items-center mt-6">
      <img
        class="w-5 h-5 mr-2"
        src="/assets/gray-calendar-25911.svg"
        alt="calendar icon"
      />
      <p class="text-md text-gray-500">Last updated: ${formattedDate}</p>
    </div>
  </div>
</div>

<!-- Seasons Section -->
<h3 class="text-xl font-bold mt-10 mb-5">Seasons</h3>
<div id="seasons-container" class="mt-6"></div>`;
    DataManager.renderSeasons(podcast, ModalContainer);

    const genresContainer = ModalContainer.querySelector("#genre-container");
    DataManager.renderGenres(genreNames, genresContainer);

    return ModalContainer;
  },
};
