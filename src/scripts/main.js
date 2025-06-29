import { podcasts } from "./initialData.js";
import { PodcastRenderer } from "./renderPodcasts.js";

/**
 * Main application logic for initializing and rendering the podcast app.
 * Responsible for injecting podcast cards into the DOM on page load.
 *
 * @namespace PodcastApp
 */
const PodcastApp = {
  /**
   * Initializes the podcast application by rendering all podcast cards into the target container element.
   * Should be called after the DOM has loaded.
   *
   * @function
   * @memberof PodcastApp

   */
  init: () => {
    const container = document.getElementById("podcast-container");

    PodcastRenderer.render(podcasts, container);
  },
};

// Initialize the podcast application
PodcastApp.init();
