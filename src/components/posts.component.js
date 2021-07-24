import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transfrom.service";
import { renderPost } from "../templates/post.template";

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);

    this.loader = loader;
  }

  init() {
    this.$el.addEventListener("click", buttonHandler.bind(this));
  }

  async onShow() {
    this.loader.show();

    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts
      .map((post) => renderPost(post, { withButton: true }))
      .join(" ");

    this.loader.hide();

    this.$el.insertAdjacentHTML("afterbegin", html);
  }

  onHide() {
    this.$el.innerHTML = "";
  }
}

function buttonHandler(event) {
  const id = event.target.dataset.id;
  const title = event.target.dataset.title;

  if (id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const candidate = favorites.find((p) => p.id === id);

    if (candidate) {
      event.target.textContent = "Добавить в избранное";
      event.target.classList.add("button-primary");
      event.target.classList.remove("button-danger");

      favorites = favorites.filter((p) => p.id !== id);
    } else {
      event.target.textContent = "Удалить из избранного";
      event.target.classList.remove("button-primary");
      event.target.classList.add("button-danger");

      favorites.push({ id, title });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
