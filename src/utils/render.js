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

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Создаст функцию `replace` для для замены одного DOM-элемента на другой
export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

// Создаст функцию `remove` для для удаления DOM-элемента
export const remove = (element) => {
  element.remove();
};


