import http from "../http-common";

class PolicyDataService {
  getAll() {
    return http.get("/read.php");
  }

  get(id) {
    return http.get(`/single_read.php/?id=${id}`);
  }

  create(data) {
    return http.post("/create.php", data);
  }

  update(id, data) {
    return http.put(`/update.php/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete.php/?id=${id}`);
  }
  findByText(text) {
    return http.get(`/search.php/?text=${text}`);
  }
}

export default new PolicyDataService();