import axios from "axios";
import { baseUrl } from "../components/Base_api/baseapi";
const BASE_URL = baseUrl;
const REACT_APP_BASE_URL_LOGIN = process.env.REACT_APP_BASE_URL_LOGIN;

export const http = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  timeout: 20000,
  timeoutErrorMessage: "request Timeout",
});

const GET = (url, grant_type, getheaders, params = {}) => {
  if (getheaders) {
    const token = localStorage.getItem("dm-access_token");
    return http.get(BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return http.get(BASE_URL + url);
};

const POST = (
  url,
  data,
  grant_type,
  getheaders,
  headerType = "json",
  params = {}
) => {
  if (getheaders) {
    const token = localStorage.getItem("dm-access_token");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (headerType == "formdata") {
      headers["Content-Type"] = "multipart/form-data";
    }

    return http.post(BASE_URL + url, data, { headers });
  }
  return http.post(BASE_URL + url, data);
};

const DELETE = (url, grant_type, getheaders, params = {}) => {
  if (getheaders) {
    const token = localStorage.getItem("dm-access_token");
    return http.delete(BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return http.delete(BASE_URL + url);
};
const PUT = (
  url,
  data,
  grant_type,
  getheaders,
  headerType = "json",
  params = {}
) => {
  if (getheaders) {
    const token = localStorage.getItem("dm-access_token");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (headerType == "formdata") {
      headers["Content-Type"] = "multipart/form-data";
    }

    return http.put(BASE_URL + url, data, { headers });
  }
  return http.put(BASE_URL + url, data);
};

//incoming change

const UPLOAD = (method, url, data = {}, frontImage,backImage,voucher,minorid,isminor,getheaders) => {
  // if (grant_type) {
  //   data.grant_type = grant_type;
  // }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();


    if(frontImage){
      formData.append("citizenshipFrontImage", frontImage, frontImage.name);
    }
    if(backImage){
      formData.append("citizenshipBackImage", backImage, backImage.name);
    }

    if(isminor){
      formData.append("birthCertificateImage", minorid);
    }


    if(voucher){
      formData.append("voucher", voucher);
    }

    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      getheaders
        ? `Bearer ${localStorage.getItem("dm-access_token")}`
        : `Basic Y2xpZW50aWQ6c2VjcmV0`
    );

    xhr.send(formData);
  });
};


const UPLOADRIGHT = (method, url, data = {}, frontImage,backImage,voucher,getheaders) => {
  // if (grant_type) {
  //   data.grant_type = grant_type;
  // }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();


    if(frontImage){
      formData.append("citizenshipFrontImage", frontImage, frontImage.name);
    }
    if(backImage){
      formData.append("citizenshipBackImage", backImage, backImage.name);
    }

    if(voucher){
      formData.append("voucher", voucher);
    }

    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      getheaders
        ? `Bearer ${localStorage.getItem("dm-access_token")}`
        : `Basic Y2xpZW50aWQ6c2VjcmV0`
    );

    xhr.send(formData);
  });
};


const UPLOADFORM = (method, url, data = {}, frontImage,backImage,marriageCertificate,voucher,minorid,isminor,getheaders) => {
  // if (grant_type) {
  //   data.grant_type = grant_type;
  // }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();


    if(frontImage){
      formData.append("citizenshipFrontImage", frontImage, frontImage.name);
    }
    if(backImage){
      formData.append("citizenshipBackImage", backImage, backImage.name);
    }
    if(marriageCertificate){
      formData.append("marriageCertificate", marriageCertificate, marriageCertificate.name);
    }
    if(isminor){
      formData.append("birthCertificateImage", minorid);
    }


    if(voucher){
      formData.append("voucher", voucher);
    }

    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      getheaders
        ? `Bearer ${localStorage.getItem("dm-access_token")}`
        : `Basic Y2xpZW50aWQ6c2VjcmV0`
    );

    xhr.send(formData);
  });
};



const UPLOADAGENTFORM = (method, url, data = {}, frontImage,backImage,marriageCertificate,spousecertificate,voucher,minorid,isminor,getheaders) => {
  // if (grant_type) {
  //   data.grant_type = grant_type;
  // }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();


    if(frontImage){
      formData.append("citizenshipFrontImage", frontImage, frontImage.name);
    }
    if(backImage){
      formData.append("citizenshipBackImage", backImage, backImage.name);
    }
    if(marriageCertificate){
      formData.append("marriageCertificate", marriageCertificate, marriageCertificate.name);
    }
    if(spousecertificate){
      formData.append("spouseCitizenship", spousecertificate, spousecertificate.name);
    }
    if(isminor){
      formData.append("birthCertificateImage", minorid);
    }


    if(voucher){
      formData.append("voucher", voucher);
    }

    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      getheaders
        ? `Bearer ${localStorage.getItem("dm-access_token")}`
        : `Basic Y2xpZW50aWQ6c2VjcmV0`
    );

    xhr.send(formData);
  });
};


const UPLOADPUBLIC = (method, url, data = {}, frontImage,backImage,marriageCertificate,spousecertificate,minorid,isminor) => {
  // if (grant_type) {
  //   data.grant_type = grant_type;
  // }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();


    if(frontImage){
      formData.append("citizenshipFrontImage", frontImage, frontImage.name);
    }
    if(backImage){
      formData.append("citizenshipBackImage", backImage, backImage.name);
    }
    if(marriageCertificate){
      formData.append("marriageCertificate", marriageCertificate, marriageCertificate.name);
    }
    if(spousecertificate){
      formData.append("spouseCitizenship", spousecertificate, spousecertificate.name);
    }
    if(isminor){
      formData.append("birthCertificateImage", minorid);
    }


    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    // xhr.setRequestHeader(
    //   "Authorization",
    //   getheaders
    //     ? `Bearer ${localStorage.getItem("dm-access_token")}`
    //     : `Basic Y2xpZW50aWQ6c2VjcmV0`
    // );

    xhr.send(formData);
  });
};



const LOGIN = (method, url, data = {}, grant_type, files, getheaders) => {
  if (grant_type) {
    data.grant_type = grant_type;
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();
    if (files) {
      files.forEach((item) => {
        formData.append("image", item, item.name);
      });
    }
    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open(method, BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      getheaders
        ? `Bearer ${localStorage.getItem("dm-access_token")}`
        : `Basic Y2xpZW50aWQ6c2VjcmV0`
    );

    xhr.send(formData);
  });
};




// const UPLOAD = (method, url, data = {}, grant_type, files, getheaders) => {
//   if (grant_type) {
//     data.grant_type = grant_type;
//   }

//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     const formData = new FormData();
//     if (files) {
//       files.forEach((item) => {
//         formData.append("image", item, item.name);
//       });
//     }
//     for (let key in data) {
//       formData.append(key, data[key]);
//     }

//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           resolve(xhr.response);
//         } else {
//           reject(xhr.response);
//         }
//       }
//     };
//     // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
//     xhr.open(method, BASE_URL + url);
//     xhr.setRequestHeader(
//       "Authorization",
//       getheaders
//         ? `Bearer ${localStorage.getItem("dm-access_token")}`
//         : `Basic Y2xpZW50aWQ6c2VjcmV0`
//     );

//     xhr.send(formData);
//   });
// };

const UPLOADFILE = (url, data = {}, offer, prospectus, form,array) => {
    



  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("offerLetter",offer);
    formData.append("forms", form);
    formData.append("prospectus", prospectus);
    formData.append("value",JSON.stringify(JSON.stringify(array)));



    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
    xhr.open("POST", BASE_URL + url);
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("dm-access_token")}`
    );

    xhr.send(formData);
  });
};

export const httpClient = {
  GET,
  POST,
  PUT,
  DELETE,
  UPLOAD,
  UPLOADFILE,
  UPLOADFORM,
  UPLOADRIGHT,
  UPLOADPUBLIC,
  LOGIN,
  UPLOADAGENTFORM,
};
