export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
          return {
            uToken: action.token,
            isAdmin: action.isAdmin,
            userName: action.userName,
            profileImage: action.profileImage
          };
        case 'LOGOUT':
          return {};
        default:
          return state;
      }
};