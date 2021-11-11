import { GET_VIDEO_FAIL, GET_VIDEO_SUCCESS } from "../actions/ActionType";

const initialState = {
  videoList: [],
  loading: true,
  error: false,
};
function videoListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO_SUCCESS:
      return {
        ...state,
        videoList: action.data,
        error: false,
        loading: false,
      };
    case GET_VIDEO_FAIL:
      return { ...state, videoList: [], error: true, loading: false };
    default:
      return state;
  }
}
export default videoListReducer;
