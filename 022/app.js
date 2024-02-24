window.addEventListener("load", solve);

function solve() {
  const clearButton = document.querySelector(".btn");
  console.log(clearButton);
  clearButton.addEventListener("click", ReloadPage);
  function ReloadPage() {
    location.reload();
  }
  const scoreboardList = document.querySelector("#scoreboard-list");
  const DartObject = {};
  const sureList = document.querySelector("#sure-list");
  inputSelectors = {
    player: document.querySelector("#player"),
    score: document.querySelector("#score"),
    round: document.querySelector("#round"),
  };
  const addButton = document.querySelector("#add-btn");
  addButton.addEventListener("click", AddDart);
  function AddDart() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }
    const newDart = {
      player: inputSelectors.player.value,
      score: inputSelectors.score.value,
      round: inputSelectors.round.value,
      id: Object.values(DartObject).length + 1,
    };
    DartObject[newDart.player] = newDart;
    const liElement = createElement(
      "li",
      "",
      ["dart-item"],
      newDart.id,
      sureList
    );
    const articleElement = createElement("article", "", [], null, liElement);
    const playerElement = createElement(
      "p",
      newDart.player,
      [],
      null,
      articleElement
    );
    const scoreElement = createElement(
      "p",
      `Score: ${newDart.score}`,
      [],
      null,
      articleElement
    );
    const roundElement = createElement(
      "p",
      `Round: ${newDart.round}`,
      [],
      null,
      articleElement
    );
    const editButton = createElement(
      "button",
      "edit",
      ["btn", "edit"],
      newDart.id,
      liElement
    );
    editButton.addEventListener("click", EditData);
    function EditData() {
      const searchedDart = DartObject[playerElement.textContent];
      inputSelectors.player.value = searchedDart.player;
      inputSelectors.score.value = searchedDart.score;
      inputSelectors.round.value = searchedDart.round;
      liElement.remove();
      addButton.removeAttribute("disabled");
    }
    const okButton = createElement(
      "button",
      "ok",
      ["btn", "ok"],
      newDart.id,
      liElement
    );
    okButton.addEventListener("click", OkScoreBoard);
    function OkScoreBoard(e) {
      const okButtonz = e.currentTarget;
      const liToDelete = e.currentTarget.parentElement;
      const liToDeleteId = e.currentTarget.parentElement.getAttribute("id");
      okButtonz.remove();
      editButton.remove();
      scoreboardList.appendChild(liElement);
      addButton.removeAttribute("disabled");
    }

    addButton.setAttribute("disabled", "");
    Object.values(inputSelectors).forEach((selector) => {
      selector.value = "";
    });
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
