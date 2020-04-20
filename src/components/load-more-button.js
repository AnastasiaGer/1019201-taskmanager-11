import AbstractComponent from "./abstract-component.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  // Добавит в компонент `load-more` метод для подписки на клик
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
