import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class TaskController {
  // Конструктор должен принимать container — элемент, в который контроллер будет всё отрисовывать.
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  // Метод render должен принимать данные одной задачи. Также в него должен переехать код, который отвечает за отрисовку задачи, ее замену на форму редактирования и наоборот, а также установка связанных с этим обработчиков событий.
  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
