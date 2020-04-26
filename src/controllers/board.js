// Контроллер нужен нам чтобы взять на себя задачу рендеринга доски с задачами. Чтобы рендерить нужен контейнер - его передадим в конструктор. Задачи могли бы тоже передать в конструктор, но тогда мы жестко привязаны к изночальному массиву. А так у пользователя класса появится возможность обновлять задачи.

import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent, {
  SortType
} from "../components/sort.js";
import TaskController from "./task.js";
import TasksComponent from "../components/tasks.js";
import {
  render,
  remove,
  RenderPosition
} from "../utils/render.js";


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

// Встраиваем сортировку карточек в рендеринг при изменении типа сортировки. const showingTasks = tasks.slice(); имеет важную роль. Метод массива `sort` меняет массив, но изменять входные данные плохая практика. Поэтому на строке 50 мы создаем копию входного массива и затем работаем именно с ним.
const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};


export default class BoardController {
  constructor(container) {
    this._container = container;
    // проинициализируем статичные компоненты в конструкторе
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._tasks = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    // Перенесет рендеринг `load-more` в функцию. В обработчике изменения типа сортировки отрендерим задачи не сортируя их. Подготовили хорошую почву. Готов перерендеринг карточек при клике по кропке сортировки.
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    renderTasks(taskListElement, tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      renderTasks(taskListElement, sortedTasks.slice(0, this._showingTasksCount));

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    renderTasks(taskListElement, sortedTasks);

    this._renderLoadMoreButton();
  }
}
