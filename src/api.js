import axios from 'axios';

const BASE_URL = "https://johns-ncknews.herokuapp.com/api";

export const getUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  //console.log(data.user)
  return data.user;
}
