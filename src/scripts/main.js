import { podcasts } from "./initialData.js";
import { PodcastRenderer } from "./renderPodcasts.js";
/**
 * Main application logic for initializing and rendering the podcast app.
 * @namespace PodcastApp
 */
const PodcastApp = {
  /**
   * Initializes the podcast application by rendering podcast cards into the DOM.
   * @function
   */
  init: () => {
    const container = document.getElementById("podcast-container");

    PodcastRenderer.render(podcasts, container);
  },
};

PodcastApp.init();
