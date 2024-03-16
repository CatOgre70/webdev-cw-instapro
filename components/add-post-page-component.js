import {renderHeaderComponent} from "./header-component.js";
import {renderUploadImageComponent} from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageDescription = "";
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    appEl.innerHTML = ` <div class="page-container">
                          <div class="header-container"></div>
                            <h3 class="form-title">Добавить пост</h3>
                            <div class="form-inputs">
                                <div class="upload-image-container"></div>
                                <label>
                                    Опишите фотографию
                                    <textarea class="input textarea" rows="4" id="text-area"></textarea>
                                </label>
                            </div>
                          <button class="button" id="add-button">Добавить</button>
                        </div>
                      `;

    document.getElementById("add-button").addEventListener("click", () => {
      imageDescription = document.getElementById("text-area").value;
      onAddPostClick({
        description: imageDescription,
        imageUrl: imageUrl,
      });
    });

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });


  };

  render();

}
