const initialState = {};

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_USER':
      console.log("user.SAVE_USER: " + JSON.stringify(action));
      return Object.assign({}, state, {
      id: action.user.userId,
      role: action.user.role,
      authToken: action.user.authToken,
    });
    default:
      return state
  }
}
