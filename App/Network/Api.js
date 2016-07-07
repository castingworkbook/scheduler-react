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

export async function postNote(endpoint, data) {
  const headers = {
    'WebSessionKey': token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const request = {
    method: 'POST',
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
