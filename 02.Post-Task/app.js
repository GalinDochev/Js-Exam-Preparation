window.addEventListener("load", solve);

function solve() {
  taskObject = {};
  const ulElement = document.querySelector("#review-list");
  const ulToPost = document.querySelector("#published-list");
  inputSelectors = {
    title: document.querySelector("#task-title"),
    category: document.querySelector("#task-category"),
    content: document.querySelector("#task-content"),
  };
  const buttonsSelector = {
    publish: document.querySelector("#publish-btn"),
  };
  buttonsSelector.publish.addEventListener("click", publish);
  function publish() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }
    const task = {
      title: inputSelectors.title.value,
      category: inputSelectors.category.value,
      content: inputSelectors.content.value,
      id: Object.values(taskObject).length + 1,
    };
    taskObject[task.title] = task;
    const liElement = createElement("li", "", ["rpost"], task.id, ulElement);
    const articleElement = createElement("article", "", [], null, liElement);
    const h4Element = createElement("h4", task.title, [], null, articleElement);

    const categoryElement = createElement(
      "p",
      `Category: ${task.category}`,
      [],
      null,
      articleElement
    );
    const contentElement = createElement(
      "p",
      `Content: ${task.content}`,
      [],
      null,
      articleElement
    );
    const edintButton = createElement(
      "button",
      "Edit",
      ["action-btn", "edit"],
      null,
      liElement
    );
    const postButton = createElement(
      "button",
      "Post",
      ["action-btn", "post"],
      null,
      liElement
    );

    Object.values(inputSelectors).forEach((input) => (input.value = ""));
    edintButton.addEventListener("click", editTask);
    postButton.addEventListener("click", postTask);
  }
  function editTask(e) {
    const liToDelete = e.currentTarget.parentElement;
    const id = liToDelete.getAttribute("id");
    const h4ToMyLiElemenet = e.currentTarget.parentElement.querySelector("h4");
    const searchedTask = taskObject[h4ToMyLiElemenet.textContent];
    inputSelectors.title.value = searchedTask.title;
    inputSelectors.category.value = searchedTask.category;
    inputSelectors.content.value = searchedTask.content;
    liToDelete.remove();
  }
  function postTask(e) {
    const postButton = e.currentTarget;
    const liToDelete = e.currentTarget.parentElement;
    const liToDeleteId = e.currentTarget.parentElement.getAttribute("id");

    const taskToDelete = Object.values(taskObject).find(
      (task) => task.id == liToDeleteId
    );
    const editButton = liToDelete.querySelector("button");
    editButton.remove();
    postButton.remove();
    ulToPost.appendChild(liToDelete);
  }
  function createElement(type, textContent, classes, id, parent) {
    const element = document.createElement(type);
    if (textContent) {
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
}
