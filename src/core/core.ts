import axios from "axios";

interface ApiResponse {
  code: number;
  msg: string;
  data: any;
}

const apiGet = (url: string, params, solveFn) => {
  return new Promise((res, rej) => {
    axios
      .get(url, { params })
      .then((result) => {
        if (solveFn) {
          res([solveFn(result.data), undefined]);
        } else {
          const response: ApiResponse = result.data;
          res([response, undefined]);
        }
      })
      .catch((error) => {
        res([undefined, error]);
      });
  });
};

const apiPost = (url: string, data, params, solveFn) => {
  return new Promise((res, rej) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        if (solveFn) {
          res([solveFn(result.data), undefined]);
        } else {
          const response: ApiResponse = result.data;
          res([response, undefined]);
        }
      })
      .catch((error) => {
        res([undefined, error]);
      });
  });
};
