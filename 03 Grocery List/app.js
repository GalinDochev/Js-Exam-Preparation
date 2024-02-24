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
let currentId = "";
const inputSelectors = {
  product: document.querySelector("#product"),
  count: document.querySelector("#count"),
  price: document.querySelector("#price"),
};
const updateProductButton = document.querySelector("#update-product");
updateProductButton.addEventListener("click", UpdateProduct);
const loadButton = document.querySelector("#load-product");
loadButton.addEventListener("click", loadProducts);
const table = document.querySelector("#tbody");
const addProductButton = document.querySelector("#add-product");
addProductButton.addEventListener("click", addProduct);

async function UpdateProduct(e) {
  e.preventDefault();
  const newProduct = {
    product: inputSelectors.product.value,
    count: inputSelectors.count.value,
    price: inputSelectors.price.value,
  };
  await fetch(`http://localhost:3030/jsonstore/grocery/${currentId}`, {
    method: "PATCH",
    body: JSON.stringify(newProduct),
  });
  await loadProducts(e);
  Object.values(inputSelectors).forEach((selector) => {
    selector.value = "";
  });
  addProductButton.disabled = false;
  updateProductButton.disabled = true;
}
async function loadProducts(e) {
  e.preventDefault();
  table.textContent = "";
  const response = await fetch("http://localhost:3030/jsonstore/grocery/");
  const data = await response.json();
  const products = Object.values(data);
  products.forEach((pr) => {
    console.log(pr);
    const rowElement = createElements("tr", "", [], pr._id, table);
    const nameElement = createElements(
      "td",
      pr.product,
      ["name"],
      null,
      rowElement
    );
    const countElement = createElements(
      "td",
      pr.count,
      ["count-product"],
      null,
      rowElement
    );
    const priceElement = createElements(
      "td",
      pr.price,
      ["product-price"],
      null,
      rowElement
    );
    const tdButtonsElement = createElements(
      "td",
      "",
      ["btn"],
      null,
      rowElement
    );
    const updateButton = createElements(
      "button",
      "Update",
      ["update"],
      pr._id,
      tdButtonsElement
    );
    const deleteButton = createElements(
      "button",
      "Delete",
      ["delete"],
      pr._id,
      tdButtonsElement
    );
    updateButton.addEventListener("click", Update);
    async function Update(e) {
      inputSelectors.product.value = pr.product;
      inputSelectors.count.value = pr.count;
      inputSelectors.price.value = pr.price;
      currentId = pr._id;
      addProductButton.setAttribute("disabled", "");
      updateProductButton.disabled = false;
    }
    deleteButton.addEventListener("click", Delete);
    async function Delete(e) {
      await fetch(`http://localhost:3030/jsonstore/grocery/${pr._id}`, {
        method: "DELETE",
      });
      loadProducts(e);
    }
  });
}
async function addProduct(e) {
  e.preventDefault();
  const newProduct = {
    product: inputSelectors.product.value,
    count: inputSelectors.count.value,
    price: inputSelectors.price.value,
  };
  await fetch("http://localhost:3030/jsonstore/grocery/", {
    method: "POST",
    body: JSON.stringify(newProduct),
  });
  loadProducts(e);
  Object.values(inputSelectors).forEach((selector) => {
    selector.value = "";
  });
}
