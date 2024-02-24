const inputSelectors = {
  title: document.querySelector("#course-name"),
  type: document.querySelector("#course-type"),
  description: document.querySelector("#description"),
  teacher: document.querySelector("#teacher-name"),
};
const url = "http://localhost:3030/jsonstore/tasks";
const loadButton = document.querySelector("#load-course");
const divList = document.querySelector("#list");
const correctTypes = ["Long", "Medium", "Short"];
const addCourseButton = document.querySelector("#add-course");
const editCourseButton = document.querySelector("#edit-course");
editCourseButton.addEventListener("click", editCourseInForm);
addCourseButton.addEventListener("click", addCourse);
loadButton.addEventListener("click", loadCourses);
let currentCourseId = "";
let currentToDeleteId = "";
async function loadCourses() {
  divList.innerHTML = "";
  const response = await fetch("http://localhost:3030/jsonstore/tasks/");
  const data = await response.json();
  const courses = Object.values(data);
  courses.forEach((course) => {
    courseInitialise(course);
  });
}
async function addCourse(e) {
  e.preventDefault();
  let title = document.querySelector("#course-name").value;
  let type = document.querySelector("#course-type").value;
  let description = document.querySelector("#description").value;
  let teacher = document.querySelector("#teacher-name").value;
  console.log(description);
  if (!correctTypes.includes(type)) {
    return;
  }
  const course = {
    title,
    type,
    description,
    teacher,
  };
  document.querySelector("#course-name").value = "";
  document.querySelector("#course-type").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#teacher-name").value = "";
  await fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    body: JSON.stringify(course),
  });
  await loadCourses();
}
async function editCourseInForm(e) {
  e.preventDefault();
  const title = document.querySelector("#course-name");
  const type = document.querySelector("#course-type");
  const description = document.querySelector("#description");
  const teacher = document.querySelector("#teacher-name");
  const newCourse = {
    title: title.value,
    type: type.value,
    description: description.value,
    teacher: teacher.value,
    _id: currentCourseId,
  };
  await fetch(`${url}/${currentCourseId}`, {
    method: "PUT",
    body: JSON.stringify(newCourse),
  });
  title.value = "";
  type.value = "";
  description.value = "";
  teacher.value = "";
  await loadCourses();
}
function courseInitialise(course) {
  const divContainer = createElements(
    "div",
    "",
    ["container"],
    course._id,
    divList
  );
  const titleElement = createElements(
    "h2",
    course.title,
    [],
    null,
    divContainer
  );
  const teacherElement = createElements(
    "h3",
    course.teacher,
    [],
    null,
    divContainer
  );
  const typeElement = createElements("h3", course.type, [], null, divContainer);
  const descriptionElement = createElements(
    "h4",
    course.description,
    [],
    null,
    divContainer
  );
  const editButton = createElements(
    "button",
    "Edit Course",
    ["edit-btn"],
    null,
    divContainer
  );
  editButton.addEventListener("click", editCourse);
  async function editCourse(e) {
    addCourseButton.setAttribute("disabled", "");
    editCourseButton.removeAttribute("disabled");
    document.querySelector("#course-name").value = course.title;
    document.querySelector("#course-type").value = course.type;
    document.querySelector("#description").value = course.description;
    document.querySelector("#teacher-name").value = course.teacher;
    const buttonParent = e.currentTarget.parentElement;
    currentCourseId = buttonParent.id;
    buttonParent.remove();
    const newTask = {
      title: document.querySelector("#course-name").value,
      type: document.querySelector("#course-type").value,
      description: document.querySelector("#description").value,
      teacher: document.querySelector("#teacher-name").value,
    };
  }
  const finishButton = createElements(
    "button",
    "Finish Course",
    ["finish-btn"],
    null,
    divContainer
  );
  finishButton.addEventListener("click", finishCourse);
  async function finishCourse(e) {
    e.preventDefault();
    await fetch(`http://localhost:3030/jsonstore/tasks/${divContainer.id}`, {
      method: "DELETE",
    });
    await loadCourses();
  }
}

function createElements(type, textContent, classes, id, parent) {
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
