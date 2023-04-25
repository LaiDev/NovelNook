import { getAPI } from "./getData.js";

const generateBooksBtn = document.getElementById("generateBooksBtn");

generateBooksBtn.addEventListener("click", getAPI)