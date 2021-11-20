const notifReducer = (state = '', action) => {
  switch (action.type) {
    case "SET_MESSAGE": {
      return action.data;
    }
    case "UNSET_MESSAGE":
      return null;
    default:
      return state;
  }
};

export const setNotification = (notif) => {
  return {
      type: "SET_MESSAGE",
      data: notif
    } 
}

export const hideNotification = () => {
  return {
    type: "UNSET_MESSAGE",
    data: null
  };
};

export default notifReducer;