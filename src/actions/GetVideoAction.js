import { GET_VIDEO_SUCCESS, GET_VIDEO_FAIL } from "./ActionType";
import { commonApi } from "../api/CommonApi";

export function getVideoApi(method, url, params) {
  return (dispatch) => {
    commonApi({ method, url, params })
      .then((response) => {
        console.log("GET_VIDEO_SUCCESS Response==>" + JSON.stringify(response));
        if (response) {
          dispatch({ type: GET_VIDEO_SUCCESS, data: response.data });
        }
      })
      .catch(function (error) {
        dispatch({ type: GET_VIDEO_FAIL, data: error });
      });
  };
}
