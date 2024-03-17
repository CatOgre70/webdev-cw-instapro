import {USER_POSTS_PAGE} from "../routes.js";
import {renderHeaderComponent} from "./header-component.js";
import {goToPage, page, posts, user} from "../index.js";
import {addLike, removeLike} from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);
  appEl.innerHTML = `
              <div class="page-container">
                <div class="header-container"></div>
                ${page === USER_POSTS_PAGE ? `<h3>Публикации пользователя ${posts[0].user.name}</h3>` : ``}
                <ul class="posts"></ul>
              </div>`;
  const postsEl = document.querySelector(".posts");
  postsEl.innerHTML = posts.map((post) => {
    return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                  </li>`
  }).join("");
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for(let likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      if(user !== null && user.token !== undefined) {
        let postWithId = posts.filter((p) => {return p.id === likeButton.dataset.postId});
        let isLiked = postWithId[0].isLiked;
        if(isLiked) {
          removeLike({
            postId: likeButton.dataset.postId,
            token: `Bearer ${user.token}`
          }).then(() => {
            goToPage(page, {userId: posts[0].user.id});
          }).catch((error) => {
            console.error(error);
          });
        } else {
          addLike({
            postId: likeButton.dataset.postId,
            token: `Bearer ${user.token}`
          }).then(() => {
            goToPage(page, {userId: posts[0].user.id});
          }).catch((error) => {
            console.error(error);
          });
        }
      } else {
        alert("Неавторизованный пользователь не может лайкать публикации, пожалуйста авторизуйтесь!");
      }
    });
  }
}
