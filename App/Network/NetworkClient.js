import Server from './Server';

class NetworkClient {
  async getAuthCookie(username, password) {
    try {
      let params = {
        // "user[name]": user.name,
        // "user[password]": user.password,
        "user[name]": username,
        "user[password]": password,
      }

      let response = await Server.performApiRequest('/inc/inc_login_functions.asp', 'POST', params);
      console.log(response);
    } catch(error) {
      throw error;
    }
  }

  async getUser() {

  }

  async getProjects() {

  }

  async getSchedule() {

  }
}
