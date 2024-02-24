// TODO:
function attachEvents() {
  const loadButton = document.querySelector("#load-board-btn");
  loadButton.addEventListener("click", loadBoard);
  function loadBoard() {
    fetch("http://localhost:3030/jsonstore/tasks/")
      .then((res) => res.json())
      .then(console.log);
  }
}

attachEvents();
