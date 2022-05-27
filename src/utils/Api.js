import axios from "axios";
import { GIPHY_API_KEY, API_URL, API_PARAMS_OFFSET } from "../utils/Constants";

export const getGifs = ({ query, offset, limit = API_PARAMS_OFFSET }) => {
  const endpoint = query ? "search" : "trending";

  const params = {
    api_key: GIPHY_API_KEY,
    limit,
    offset,
  };

  if (query) params.q = query;

  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/${endpoint}`, { params })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
