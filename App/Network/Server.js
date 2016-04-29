class Server {
  // setToken(token) {
  //   this.token = token;
  // }

  makeUrl(path) {
    return "https://castingworkbook.com/" + path;
  }

  makeRequest(path, method, params) {
    let paramType = Object.prototype.toString.call(params);

    let formData;
    if (params instanceof FormData) {
      formData = params;
    } else if (params) {
      formData = new FormData();
      for (var k in params) {
				formData.append(k, params[k]);
			}
    }

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    // if (this.token) {
    //   headers['Authorization'] = this.token;
    // }

    let request = {
      method: method,
      headers: headers,
    }

    if (formData) {
      request.body = formData;
    }

    return fetch(this.makeURL(path), request);
  }

  async performApiRequest(path, method, params) {
    let response = await this.makeRequest(path, method, params);

    if (response._bodyInit) {
      let parsedBody = JSON.parse(response._bodyInit);

      if (parsedBody.error) {
        throw {
          error: parsedBody.error,
          status: parsedBody.status,
        }
      }

      return parsedBody;
    }

    return;
  }
}

module.exports = Server;
