import axios from 'axios';

const BASE_URL = "https://johns-ncknews.herokuapp.com/api";

export const getUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
}

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
}

export const getArticles = async (topic) => {
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  return data.articles;
}
