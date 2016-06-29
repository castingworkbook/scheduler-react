const initialState = {};

export default function project(state = initialState, action) {
  switch(action.type) {
    case 'SET_PROJECT':
      console.log("project.SET_PROJECT: " + JSON.stringify(action));
      return Object.assign({}, state, {
        id: action.project.id,
        type: action.project.type,
        title: action.project.title,
        director: action.project.director,
        phone: action.project.phone
    });
    default:
      return state
  }
}
