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
inputSelectors = {
  location: document.querySelector("#location"),
  temperature: document.querySelector("#temperature"),
  date: document.querySelector("#date"),
};
let currentCloud = "";
const loadButton = document.querySelector("#load-history");
const divList = document.querySelector("#list");
const addWeatherButton = document.querySelector("#add-weather");
addWeatherButton.addEventListener("click", AddWeather);
async function AddWeather(e) {
  e.preventDefault();
  const newCloud = {
    location: inputSelectors.location.value,
    temperature: inputSelectors.temperature.value,
    date: inputSelectors.date.value,
  };
  await fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    body: JSON.stringify(newCloud),
  });
  loadWeather();
  Object.values(inputSelectors).forEach((selector) => [(selector.value = "")]);
}
const editWeatherButton = document.querySelector("#edit-weather");
editWeatherButton.addEventListener("click", EditWeather);
async function EditWeather(e) {
  e.preventDefault();
  const newCloud = {
    location: inputSelectors.location.value,
    temperature: inputSelectors.temperature.value,
    date: inputSelectors.date.value,
    _id: currentCloud,
  };
  await fetch(`http://localhost:3030/jsonstore/tasks/${currentCloud}`, {
    method: "PUT",
    body: JSON.stringify(newCloud),
  });
  loadWeather();
  editWeatherButton.setAttribute("disabled", "");
  addWeatherButton.removeAttribute("disabled");
  Object.values(inputSelectors).forEach((selector) => [(selector.value = "")]);
}
loadButton.addEventListener("click", loadWeather);
async function loadWeather() {
  divList.textContent = "";
  const response = await fetch("http://localhost:3030/jsonstore/tasks/");
  const data = await response.json();
  const clouds = Object.values(data);
  clouds.forEach((cloud) => {
    const containerDiv = createElements(
      "div",
      "",
      ["container"],
      cloud._id,
      divList
    );

    const locationElement = createElements(
      "h2",
      cloud.location,
      [],
      null,
      containerDiv
    );
    const dateElement = createElements(
      "h3",
      cloud.date,
      [],
      null,
      containerDiv
    );
    const temperature = createElements(
      "h3",
      cloud.temperature,
      [],
      null,
      containerDiv
    );
    temperature.setAttribute("id", "celsius");
    const buttonContainer = createElements(
      "div",
      "",
      ["buttons-container"],
      null,
      containerDiv
    );
    const changeButton = createElements(
      "button",
      "Change",
      ["change-btn"],
      cloud._id,
      buttonContainer
    );
    const deleteButton = createElements(
      "button",
      "Delete",
      ["delete-btn"],
      cloud._id,
      buttonContainer
    );
    deleteButton.addEventListener("click", DeleteCloud);
    async function DeleteCloud() {
      await fetch(`http://localhost:3030/jsonstore/tasks/${cloud._id}`, {
        method: "DELETE",
      });
      loadWeather();
    }
    changeButton.addEventListener("click", ChangeDOM);
    function ChangeDOM() {
      inputSelectors.location.value = cloud.location;
      inputSelectors.temperature.value = cloud.temperature;
      inputSelectors.date.value = cloud.date;
      currentCloud = cloud._id;
      containerDiv.remove();
      addWeatherButton.setAttribute("disabled", "");
      editWeatherButton.removeAttribute("disabled");
    }
  });
}
