import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const addLoadMore = (tasks, boardElement, taskListElement) => {
  let showingTasksCount = TASKS_PER_PAGE;

  tasks.slice(1, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

const init = () => {
  const filters = generateFilters();
  const tasks = generateTasks(TASK_COUNT);

  render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
  render(siteMainElement, createFilterTemplate(filters), `beforeend`);
  render(siteMainElement, createBoardTemplate(), `beforeend`);

  const boardElement = siteMainElement.querySelector(`.board`);
  const taskListElement = siteMainElement.querySelector(`.board__tasks`);

  render(boardElement, createSortingTemplate(), `afterbegin`);
  render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

  addLoadMore(tasks, boardElement, taskListElement);

};

init();

