window.addEventListener("load", solve);

function solve() {
  const students = {};
  const ulToPost = document.querySelector("#candidates-list");
  inputSelectors = {
    name: document.querySelector("#student").value,
    university: document.querySelector("#university").value,
    score: document.querySelector("#score").value,
  };
  const nextButton = document.querySelector("#next-btn");
  nextButton.addEventListener("click", makeStudent);
  const previewUl = document.querySelector("#preview-list");
  function makeStudent(e) {
    const name = document.querySelector("#student");
    const university = document.querySelector("#university");
    const score = document.querySelector("#score");
    if (name.value == "" || university.value == "" || score.value == "") {
      return;
    }
    const liElement = createElement("li", "", ["application"], null, previewUl);
    const article = createElement("article", "", [], null, liElement);
    const nameElement = createElement("h4", name.value, [], null, article);
    const student = {
      name: name.value,
      university: university.value,
      score: score.value,
    };
    students[student.name] = student;
    const universityElemen = createElement(
      "p",
      `University: ${university.value}`,
      [],
      null,
      article
    );
    const scoreElement = createElement(
      "p",
      `Score: ${score.value}`,
      [],
      null,
      article
    );
    const editButton = createElement(
      "button",
      "edit",
      ["action-btn", "edit"],
      null,
      liElement
    );
    const applyButton = createElement(
      "button",
      "apply",
      ["action-btn", "apply"],
      null,
      liElement
    );
    name.value = "";
    university.value = "";
    score.value = "";
    nextButton.setAttribute("disabled", "");
    editButton.addEventListener("click", edit);
    function edit(e) {
      const liToDelete = e.currentTarget.parentElement;
      const h4ToMyLiElemenet =
        e.currentTarget.parentElement.querySelector("h4");
      const searchedStudent = students[h4ToMyLiElemenet.textContent];
      name.value = searchedStudent.name;
      university.value = searchedStudent.university;
      score.value = searchedStudent.score;
      liToDelete.remove();
    }
    applyButton.addEventListener("click", apply);
    function apply(e) {
      nextButton.removeAttribute("disabled");
      const applyButton = e.currentTarget;
      const liToDelete = e.currentTarget.parentElement;
      const h4ToMyLiElemenet =
        e.currentTarget.parentElement.querySelector("h4");
      const searchedStudent = students[h4ToMyLiElemenet.textContent];
      const editButton = liToDelete.querySelector("button");
      applyButton.remove();
      editButton.remove();
      ulToPost.appendChild(liToDelete);
    }
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
