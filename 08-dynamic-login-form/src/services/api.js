import axios from "axios";

export const loginUser = async (data) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", data);
};
