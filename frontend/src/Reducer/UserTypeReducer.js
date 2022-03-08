let UserTypeReducer = (state, action) =>{
    switch (action.type) {
        case 'ADD_TYPE':
          return action.payload;
        default:
          throw new Error();
      }
}
export default UserTypeReducer