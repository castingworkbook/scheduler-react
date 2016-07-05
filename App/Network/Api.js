/* @flow */
'use strict';

const ServerURL = "http://www.thecwbint.com";
let token = "";

export async function postSession(data) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const request = {
    method: 'POST',
    headers,
    body: data
  }
  try {
    let response = await fetch(ServerURL + "/inc/inc_login_functions.asp", request);
    let userResponse = await getUser(response);
    return userResponse;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(loginResponse) {
  const cookie = loginResponse.headers.map["set-cookie"];
  const regex = /WebSessionKey=([^;]*);.*/g;
  const match = regex.exec(cookie);
  if(cookie[0].indexOf("WebSessionKey=") != -1 && match.length > 1) {
    token = decodeURI(match[1]);
    const headers = {
      'WebSessionKey': token,
      'Accept': 'application/json'
    }
    const request = {
      method: 'GET',
      headers
    }
    try {
      const response = await fetch(ServerURL + "/castingworkbook3/currentuser.mvc", request);
      const jsonResponse = JSON.parse(response._bodyInit);
      return jsonResponse;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getProjects(endpoint) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json'
  }
  const request = {
    method: 'GET',
    headers
  }
  try {
    const response = await fetch(ServerURL + endpoint, request);
    const jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function getAuditions(endpoint) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
  }
  const request = {
    method: 'GET',
    headers
  }
  try {
    const response = await fetch(ServerURL + endpoint, request);
    const jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function putAuditions(endpoint, data) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const request = {
    method: 'PUT',
    headers,
    body: data,
  }
  try {
    const response = await fetch(ServerURL + endpoint, request);
    const jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function getHistory(endpoint) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
  }
  const request = {
    method: 'GET',
    headers
  }
  try {
    const response = await fetch(ServerURL + endpoint);
    const jsonResponse = JSON.parse(response._bodyInit);
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

export async function postHistory(endpoint, data) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const request = {
    method: 'PUT',
    headers,
    body: data,
  }
  try {
    const response = await fetch(ServerURL + endpoint, request);
    const jsonResponse = JSON.parse(response._bodyInit);
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
    let response = await fetch(ServerURL + endpoint);
  } catch(error) {
    console.log(error);
  }
}

// export async function postHistory(endpoint, token, data) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'post', data);
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }
//
// export async function getMessages(endpoint, token) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'get');
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }
//
// export async function postMessage(endpoint, token, data) {
//   try {
//     this.token = token;
//     let response = await httpRequest(endpoint, 'post', data);
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }

// export async function resetData() {
//   try {
//     let response = await httpRequest('projects/reset_data', 'get');
//     let responseJson = await response.json();
//     return responseJson;
//   } catch(error) {
//     console.error(error);
//   }
// }
