

let UserCourseListReducer = (state, action) =>{
    switch (action.type) {
        case 'ADD_COURSE':
          return action.payload;
        default:
          throw new Error();
      }
}
export default UserCourseListReducer