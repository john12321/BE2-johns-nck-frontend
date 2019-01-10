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

export const postTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });
  return data.topic;
};

export const getArticles = async (topic) => {
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  return data.articles;
}

export const getArticle = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.article;
}

export const getComments = async (article_id) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
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