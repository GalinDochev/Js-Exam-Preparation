window.addEventListener("load", solve);

function solve() {
  const labelMap = {
    Feature: "feature",
    "Low Priority Bug": "low-priority",
    "High Priority Bug": "high-priority",
  };
  const icons = {
    Feature: "&#8865",
    "Low Priority Bug": "&#9737;",
    "High Priority Bug": "&#9888;",
  };
  const tasks = {};
  const inputSelectors = {
    title: document.querySelector("#title"),
    description: document.querySelector("#description"),
    label: document.querySelector("#label"),
    points: document.querySelector("#points"),
    assignee: document.querySelector("#assignee"),
  };
  const selectors = {
    createButton: document.querySelector("#create-task-btn"),
    taskSection: document.querySelector("#tasks-section"),
    deleteButton: document.querySelector(".task-card-actions button"),
  };
  selectors.createButton.addEventListener("click", createTask);

  function createTask(e) {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }
    const task = {
      id: `task- ${Object.values(tasks).length + 1}`,
      title: inputSelectors.title.value,
      description: inputSelectors.description.value,
      label: inputSelectors.label.value,
      points: Number(inputSelectors.points.value),
      assignee: inputSelectors.assignee.value,
    };
    tasks[task.id] = task;
    const article = createElement("article", "", ["task-card"], task.id);
    createElement(
      "div",
      `${task.label} ${icons[task.label]}`,
      ["task-card-label", labelMap[task.label]],
      null,
      article,
      true
    );
    createElement("h3", task.title, ["task-card-title"], null, article);
    createElement(
      "p",
      task.description,
      ["task-card-description"],
      null,
      article
    );
    createElement(
      "div",
      `Estimated at ${task.points} pts`,
      ["task-card-points"],
      null,
      article
    );
    createElement(
      "div",
      `Assigned to ${task.assignee}`,
      ["task-card-assignee"],
      null,
      article
    );
    const taskActions = createElement(
      "div",
      null,
      ["task-card-actions"],
      null,
      article
    );
    const deleteButton = createElement(
      "button",
      "Delete",
      [],
      null,
      taskActions
    );
    selectors.taskSection.appendChild(article);
    Object.values(inputSelectors).forEach((selector) => {
      selector.value = "";
    });
    deleteButton.addEventListener("click", deleteElement);
  }

  function createElement(
    type,
    textContent,
    classes,
    id,
    parent,
    userInnerHTML
  ) {
    const element = document.createElement(type);
    if (userInnerHTML && textContent) {
      element.innerHTML = textContent;
    } else if (textContent) {
      element.textContent = textContent;
    }
    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }
    if (id) {
      element.setAttribute("id", id);
    }
    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }
  function deleteElement(e) {
    const taskId =
      e.currentTarget.parentElement.parentElement.getAttribute("id");
    console.log(taskId);
  }
}
