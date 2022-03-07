
const userInfo = localStorage.getItem('LoginDetails') ? JSON.parse(localStorage.getItem('LoginDetails')) : null

const initialState = {
  user: userInfo,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        user: action.user,
      };

    default:
      return state;
  }
};

export default appReducer;
