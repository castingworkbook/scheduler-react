const initialState = {};

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_USER':
      console.log("user.SAVE_USER: " + JSON.stringify(action));
      return Object.assign({}, state, {
        id: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        type: action.user.type,
        notificationToken: action.user.notification_token
    });
    default:
      return state
  }
}
