let UserInfoReducer = (state, action) =>{
    switch (action.type) {
        case 'ADD_USERINFO':
          return action.payload;
        default:
          throw new Error();
      }
}
export default UserInfoReducer