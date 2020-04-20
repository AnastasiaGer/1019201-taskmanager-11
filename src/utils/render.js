export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Добавит вспомогательную функцию для создания DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Заменим element на component
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

// Создаст функцию `replace` для для замены одного DOM-элемента на другой
export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

// Создаст функцию `remove` для для удаления DOM-элемента
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
