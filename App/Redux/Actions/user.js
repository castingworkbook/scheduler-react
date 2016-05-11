const SAVE_USER = 'USER_USER';

export function saveUser(user) {
  return { type: SAVE_USER, user }
}
