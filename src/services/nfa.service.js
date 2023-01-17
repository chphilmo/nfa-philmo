
import api from "./api";


class NfaService {

  upload(matter) {
    let formData = new FormData();

    formData.append("file", matter);
    
    return api
      .post("/aws/upload", formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data" }

      })
      .then(response => {
        console.log(response.data);
        return response.data;
      });
  }

}

export default new NfaService();