import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  // абстрактный метод recoveryListeners, его нужно будет реализовать в наследнике. Его задача — восстанавливать обработчики событий после перерисовки
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    // При перерисовке компонента все обработчики событий будут утеряны, поэтому их нужно навесить заново в методе recoveryListeners

    this.recoveryListeners();
  }
}
