const notifReducer = (state = '', action) => {
  switch (action.type) {
    case "SET_NOTIF": {
      return action.data.notif;
    }
    case "UNSET_NOTIF":
      return null;
    default:
      return state;
  }
};

export const setNotification = (notif, timer) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIF",
      data: {
        notif,
        timer: setTimeout(() => {
          dispatch(unsetNotification(""));
        }, timer * 1000),
      },
    });
  };
};

export const unsetNotification = () => {
  return {
    type: "UNSET_NOTIF"
  };
};

export default notifReducer;