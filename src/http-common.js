import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/BiAPI/api",
  headers: {
    "Content-type": "application/json"
  }
});