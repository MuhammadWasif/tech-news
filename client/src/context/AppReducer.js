let AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
