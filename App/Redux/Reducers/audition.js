const initialState = {};

export default function audition(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUDITION':
      console.log("audition.SET_AUDITION: " + JSON.stringify(action));
      return Object.assign({}, state, {
        id: action.audition.id,
        actor: action.audition.actor,
				phone: action.audition.phone,
				role: action.audition.role,
				date: action.audition.date,
				time: action.audition.time,
				status: action.audition.status,
				casting: action.audition.casting,
      });
    default:
      return state
  }
}
