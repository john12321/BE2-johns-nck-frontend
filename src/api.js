import axios from 'axios';

// const BASE_URL = "https://nc-knews-example-fixed.herokuapp.com/api";
const BASE_URL = "https://johns-ncknews.herokuapp.com/api";


export const getUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
}

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
}

export const postTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });
  return data.topic;
};

export const getArticles = async (topic, page, sortBy = 'article_id', sortAsc = false) => {
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles?p=${page}&sort_by=${sortBy}&sort_asc=${sortAsc}` : `${BASE_URL}/articles?p=${page}&sort_by=${sortBy}&sort_asc=${sortAsc}`;
  const { data } = await axios.get(URL);
  // console.log(page)
  return data.articles;
}

export const getArticle = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.article;
}

export const getComments = async (article_id, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments?p=${page}`
  );
  return data.comments;
};

export const postComment = async (article_id, body, user_id) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    { user_id, body }
  );
  console.log(data)
  return data.comment;
};

export const updateVotes = async (article_id, voteInc, comment_id) => {
  const URL = comment_id
    ? `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
    : `${BASE_URL}/articles/${article_id}/`;
  await axios.patch(URL, {
    inc_votes: voteInc
  });
};

export const postArticle = async (topic, newArticle) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic}/articles`,
    newArticle,
  );
  return data.article;
};

export const deleteItem = async (article_id, comment_id) => {
  const URL = comment_id
    ? `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
    : `${BASE_URL}/articles/${article_id}`;
  await axios.delete(URL);

};