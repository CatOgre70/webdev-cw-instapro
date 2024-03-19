import {renderHeaderComponent} from "./header-component.js";

export function renderLoadingPageComponent({ appEl, user, goToPage }) {
  appEl.innerHTML = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="loading-page">
                  <div class="loader"><div></div><div></div><div></div></div>
                </div>
              </div>`;

  renderHeaderComponent({
    user,
    element: document.querySelector(".header-container"),
    goToPage,
  });
}
