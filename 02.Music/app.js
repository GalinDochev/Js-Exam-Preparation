window.addEventListener("load", solve);

function solve() {
  let songs;
  let totalLikes = 0;
  if (!songs) {
    songs = [];
  }
  inputSelectors = {
    genre: document.querySelector("#genre"),
    name: document.querySelector("#name"),
    author: document.querySelector("#author"),
    date: document.querySelector("#date"),
  };
  const addButton = document.querySelector("#add-btn");
  addButton.addEventListener("click", AddSong);
  const allHitsContainer = document.querySelector(".all-hits-container");
  const saveDiv = document.querySelector(".saved-container");
  function AddSong() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }
    const divElement = createElements(
      "div",
      "",
      ["hits-info"],
      null,
      allHitsContainer
    );
    const imgElement = document.createElement("img");
    imgElement.src = "./static/img/img.png";
    divElement.appendChild(imgElement);
    const song = {
      genre: inputSelectors.genre.value,
      name: inputSelectors.name.value,
      author: inputSelectors.author.value,
      date: inputSelectors.date.value,
    };
    songs.push(song);
    const genreElement = createElements(
      "h2",
      `Genre: ${inputSelectors.genre.value}`,
      [],
      null,
      divElement
    );
    const nameElement = createElements(
      "h2",
      `Name: ${inputSelectors.name.value}`,
      [],
      null,
      divElement
    );
    const authorElement = createElements(
      "h2",
      `Author: ${inputSelectors.author.value}`,
      [],
      null,
      divElement
    );
    const dateElement = createElements(
      "h3",
      `Date: ${inputSelectors.date.value}`,
      [],
      null,
      divElement
    );
    const saveButton = createElements(
      "button",
      "Save song",
      ["save-btn"],
      null,
      divElement
    );
    const likeButton = createElements(
      "button",
      "Like song",
      ["like-btn"],
      null,
      divElement
    );
    const deleteButton = createElements(
      "button",
      "Delete",
      ["delete-btn"],
      null,
      divElement
    );
    console.log(document.querySelector(".saved-container>.hits-info"));
    console.log(saveDiv.innerHTML);
    Object.values(inputSelectors).forEach((selector) => {
      selector.value = "";
    });
    likeButton.addEventListener("click", LikeSong);
    function LikeSong(e) {
      const likesP = document.querySelector(".likes p");
      totalLikes = totalLikes + 1;
      likesP.textContent = `Total Likes: ${totalLikes}`;
      e.currentTarget.setAttribute("disabled");
    }
    saveButton.addEventListener("click", SaveSong);
    function SaveSong(e) {
      const divElement = e.currentTarget.parentElement;
      const likeButton = divElement.querySelector(".like-btn");
      likeButton.remove();
      const saveButton = divElement.querySelector(".save-btn");
      saveButton.remove();
      saveDiv = document.querySelector(".saved-container");
      saveDiv.appendChild(divElement);
    }
    deleteButton.addEventListener("click", DeleteSong);
    function DeleteSong(e) {
      const songToDelete = e.currentTarget.parentElement;
      songToDelete.remove();
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
}
