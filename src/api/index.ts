import axios from "axios";

export const api = axios.create({
  baseURL: "https://quiz-builder-backend-tjva.onrender.com",
});
