import { Component } from "../core/component";

export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    localStorage.getItem("visited")
      ? this.hide()
      : (document.querySelector(".container").style.display = "none");

    const btn = this.$el.querySelector(".js-header-start");
    btn.addEventListener("click", buttonHandler.bind(this));
  }
}

function buttonHandler() {
  localStorage.setItem("visited", JSON.stringify(true));
  this.hide();
  document.querySelector(".container").style.display = "block";
}
