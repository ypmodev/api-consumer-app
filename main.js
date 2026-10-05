const API_URL = "https://jsonplaceholder.typicode.com/posts";
let currentPage = 1;
const itemsPerPage = 10;

const select = document.getElementById("apiSelector");
const searchInput = document.getElementById("searchInput");
const fetchButton = document.getElementById("fetchButton");

const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");

const resultsContainer = document.getElementById("results");
const paginationContainer = document.getElementById("pagination");

function showLoading() {
  loadingElement.classList.remove("hidden");
}

function hideLoading() {
  loadingElement.classList.add("hidden");
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError() {
  errorElement.classList.add("hidden");
}

function setupPagination(totalItems) {
  paginationContainer.textContent = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.disabled = true;
    }
    button.addEventListener("click", () => {
      currentPage = i;
      fetchData();
    });
    paginationContainer.appendChild(button);
  }
}

async function fetchDataWithFetch(searchTerm) {
  const parametros = new URLSearchParams({
    _page: currentPage,
    _limit: itemsPerPage,
    q: searchTerm,
  });
  const url = API_URL + "?" + parametros;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Error en el servidor. Código de estado: ${response.status}`,
    );
  }
  const data = await response.json();
  const totalItems = Number(response.headers.get("X-Total-Count"));
  displayResults(data, totalItems);
}

async function fetchDataWithAxios(searchTerm) {
  const parametros = {
    _page: currentPage,
    _limit: itemsPerPage,
    q: searchTerm,
  };
  const response = await axios.get(API_URL, { params: parametros });
  const data = response.data;
  const totalItems = Number(response.headers["x-total-count"]);
  displayResults(data, totalItems);
}

function displayResults(items, totalItems) {
  resultsContainer.textContent = "";
  if (items.length === 0) {
    resultsContainer.textContent = "No se encontraron resultados.";
    return;
  }
  for (const item of items) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <p>${item.id}</p>`;

    resultsContainer.appendChild(card);
  }
  setupPagination(totalItems);
}

fetchButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
});

function validateInput(searchTerm) {
  if (searchTerm === "") {
    showError("Debes introducir un término de búsqueda.");
    return false;
  }

  return true;
}

async function fetchData() {
  const searchTerm = searchInput.value.trim();
  const useAxios = select.value === "axios";

  showLoading();
  hideError();
  resultsContainer.textContent = "";
  paginationContainer.textContent = "";

  if (!validateInput(searchTerm)) {
    hideLoading();
    return;
  }

  try {
    if (useAxios) {
      await fetchDataWithAxios(searchTerm);
    } else {
      await fetchDataWithFetch(searchTerm);
    }
  } catch (error) {
    const status = error.response?.status;

    if (status === 404) {
      showError("404 Not Found: El recurso solicitado no existe.");
    } else if (status === 500) {
      showError("500 Internal Server Error: Error en el servidor.");
    } else if (status) {
      showError(`Error HTTP: ${status}`);
    } else {
      showError(error.message);
    }
  } finally {
    hideLoading();
  }
}
