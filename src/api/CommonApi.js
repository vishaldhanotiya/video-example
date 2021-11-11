import axios from "axios";
import { Alert } from "react-native";
import { AppConstants } from "../constants";

let timeout = 60000;

/**
 * A common API method for calling network requests
 * @returns response or error
 */
export const commonApi = async ({ method = "GET", url, params = {} }) => {
  if (AppConstants.NETWORK_CHECK) {
    const axiosConfig = {
      "Content-Type": "application/json",
      "device-type": "android",
    };

    switch (method) {
      case "GET":
        return axios
          .get(url, {
            headers: axiosConfig,
            params: params,
            timeout: timeout,
          })
          .then((response) => {
            console.log("GET RESPONSE:- ", response);
            return response;
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              return error;
            } else {
              catchError(error);
              return error.response;
            }
          });
    }
  } else {
    Alert.alert("Error", "Please check your internet connection");
  }
};

const alertWithDelay = (response) => {
  setTimeout(() => {
    Alert.alert("Error", response);
  }, 500);
};

const catchError = (error, color) => {
  if (error && error.message && error.message == "Network Error") {
    alertWithDelay("Network Error");
  } else {
    alertWithDelay(error.response);
  }
};
