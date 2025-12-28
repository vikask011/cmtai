import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Get all articles
export const getArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};

// Get single article (optional, future use)
export const getArticleById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
  return response.data;
};
