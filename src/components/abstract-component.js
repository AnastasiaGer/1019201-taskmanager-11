// Проверка в конструкторе очень важна. Она позволит использовать абстрактный
// класс только в качестве родительского класса и выбросит ошибку при попытке
// выполнить `const c = new AbstractComponent()`.

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }
}
