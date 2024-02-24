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
const inputSelectors = {
  name: document.querySelector("#name"),
  days: document.querySelector("#num-days"),
  date: document.querySelector("#from-date"),
};
let currentChangedVacation = "";
const loadButton = document.querySelector("#load-vacations");
const editVacationButton = document.querySelector("#edit-vacation");
editVacationButton.addEventListener("click", EditVacation);
const addVacationButton = document.querySelector("#add-vacation");
addVacationButton.addEventListener("click", AddVacation);
loadButton.addEventListener("click", loadVacactions);
const listDiv = document.querySelector("#list");

async function loadVacactions() {
  listDiv.textContent = "";
  const response = await fetch("http://localhost:3030/jsonstore/tasks/");
  const data = await response.json();
  const vacations = Object.values(data);
  vacations.forEach((vacation) => {
    console.log(vacation);
    const containerDiv = createElements(
      "div",
      "",
      ["container"],
      vacation._id,
      listDiv
    );
    const nameElement = createElements(
      "h2",
      vacation.name,
      [],
      containerDiv,
      containerDiv
    );
    const dateElement = createElements(
      "h3",
      vacation.date,
      [],
      null,
      containerDiv
    );
    const numberOfDaysElement = createElements(
      "h3",
      vacation.days,
      [],
      null,
      containerDiv
    );
    const changeButton = createElements(
      "button",
      "Change",
      ["change-btn"],
      vacation._id,
      containerDiv
    );
    const doneButton = createElements(
      "button",
      "Done",
      ["done-btn"],
      vacation._id,
      containerDiv
    );
    changeButton.addEventListener("click", ChangeVacation);
    function ChangeVacation() {
      inputSelectors.name.value = vacation.name;
      inputSelectors.days.value = vacation.days;
      inputSelectors.date.value = vacation.date;
      currentChangedVacation = vacation._id;
      containerDiv.remove();
      addVacationButton.setAttribute("disabled", "");
      editVacationButton.removeAttribute("disabled");
    }

    doneButton.addEventListener("click", Delete);
    async function Delete() {
      await fetch(`http://localhost:3030/jsonstore/tasks/${vacation._id}`, {
        method: "DELETE",
      });
      loadVacactions();
    }
  });
}
async function EditVacation(e) {
  e.preventDefault();

  const newVacation = {
    name: inputSelectors.name.value,
    days: inputSelectors.days.value,
    date: inputSelectors.date.value,
  };
  await fetch(
    `http://localhost:3030/jsonstore/tasks/${currentChangedVacation}`,
    {
      method: "PUT",
      body: JSON.stringify(newVacation),
    }
  );
  loadVacactions();
  Object.values(inputSelectors).forEach((selector) => {
    selector.value = "";
  });
  editVacationButton.setAttribute("disabled", "");
  addVacationButton.removeAttribute("disabled");
}
async function AddVacation(e) {
  e.preventDefault();
  const newVacation = {
    name: inputSelectors.name.value,
    date: inputSelectors.date.value,
    days: inputSelectors.days.value,
  };

  await fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    body: JSON.stringify(newVacation),
  });
  loadVacactions();
  Object.values(inputSelectors).forEach((selector) => {
    selector.value = "";
  });
}
