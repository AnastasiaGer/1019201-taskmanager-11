// Проверка в конструкторе очень важна. Она позволит использовать абстрактный
// класс только в качестве родительского класса и выбросит ошибку при попытке
// выполнить `const c = new AbstractComponent()`.
import {createElement} from "../utils/render.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    // Посмотрев на все компоненты выделяем одинаковые для всех методы. Ими оказываются `getElement`, `removeElement`. Так же проинициализируем в конструкторе свойство `_element`.
    this._element = null;
  }

  // В компонентах есть метод с общим именем, но различной реализацией - `getTemplate`.
  // Добавим его в абстрактный класс, но его реализация в нем будет бросать исключение.
  // Это значит, что его потребуется переопределить в классах-наследниках.
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
