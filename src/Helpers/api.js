import axios from "axios";
import { BASE_URL } from "../Helpers/baseConfig";
class Api {
  post(route, data, config) {
    return axios.post(BASE_URL + route, data, config);
  }

  get(route, config) {
    return axios.get(BASE_URL + route, config);
  }

  put(route, data, config) {
    return axios.put(BASE_URL + route, data, config);
  }

  delete(route, config) {
    return axios.delete(BASE_URL + route, config);
  }
}

export default new Api();
