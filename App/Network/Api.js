// const ServerURL = "http://cwbscheduler.herokuapp.com/";
// const ServerURL = "http://localhost:3000/";
const ServerURL = "http://www.thecwbint.com";
let token = "";

// function httpRequest(endpoint, method, data) {
//   let headers = {
//     accept: 'application/json',
//     authorization: this.token
//   };
//
//   let formData;
//   if (data) {
//     formData = new FormData();
//     for (var k in data) {
//       if (k == 'selected') {
//         for (var j in data[k]) {
//           let v = data[k][j];
//           formData.append("selected[]", v.toString());
//         }
//       } else {
//         formData.append(k, data[k]);
//       }
//     }
//   }
//
//   let request = {
//     method,
//     headers,
//     body: formData
//   }
//
//   let path = ServerURL + endpoint;
//   return fetch(path, request);
// }

export async function postSession(data) {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  let request = {
    method: 'POST',
    headers,
    body: data
  }
  try {
    let response = await fetch(ServerURL+"/inc/inc_login_functions.asp", request);
    let userResponse = await getUser(response);
    return userResponse;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(loginResponse) {
  let cookie = loginResponse.headers.map["set-cookie"];
  let regex = /WebSessionKey=([^;]*);.*/g;
  let match = regex.exec(cookie);

  if(cookie[0].indexOf("WebSessionKey=") != -1 && match.length > 1) {
    token = decodeURI(match[1]);
    let headers = {
      'WebSessionKey': token,
      'Accept': 'application/json'
    }
    let request = {
      method: 'GET',
      headers
    }
    try {
      let response = await fetch(ServerURL+"/castingworkbook3/currentuser.mvc", request);
      let jsonResponse = JSON.parse(response._bodyInit);
      return jsonResponse;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getProjects(endpoint) {
  let headers = {
    'WebSessionKey': token,
    'Accept': 'application/json'
  }
  let request = {
    method: 'GET',
    headers
  }
  try {
    let response = await fetch(ServerURL+endpoint, request);
    let jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function getAuditions(endpoint) {
  let headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
  }
  let request = {
    method: 'GET',
    headers
  }
  try {
    let response = await fetch(ServerURL+endpoint, request);
    let jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function putAuditions(endpoint, data) {
  let headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  let request = {
    method: 'PUT',
    headers,
    body: data,
  }
  try {
    let response = await fetch(ServerURL+endpoint, request);
    let jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function resetData(endpoint) {
  let headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  try {
    let response = await fetch(ServerURL+endpoint);
  } catch(error) {
    console.log(error);
  }
}

// export async function postSession(data) {
//   try {
//     let response = await httpRequest('session', 'post', data);
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

// export async function getProjects(token) {
//   try {
//     this.token = token;
//     let response = await httpRequest('projects', 'get');
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

// export async function getAuditions(endpoint, token) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'get');
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

// export async function putAudition(endpoint, token, data) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'put', data);
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

// export async function putAuditions(endpoint, token, data) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'put', data);
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

export async function getHistory(endpoint, token) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'get');
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function postHistory(endpoint, token, data) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'post', data);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function getMessages(endpoint, token) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'get');
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function postMessage(endpoint, token, data) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'post', data);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

// export async function resetData() {
//   try {
//     let response = await httpRequest('projects/reset_data', 'get');
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }
