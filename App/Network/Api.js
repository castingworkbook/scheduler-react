const ServerURL = "http://cwbscheduler.herokuapp.com/";
// const ServerURL = "http://localhost:3000/";
let token = "";

function httpRequest(endpoint, method, data) {
  let headers = {
    accept: 'application/json',
    authorization: this.token
  };

  let formData;
  if (data) {
    formData = new FormData();
    for (var k in data) {
      formData.append(k, data[k]);
    }
  }

  let request = {
    method: method,
    headers: headers,
    body: formData
  }

  let path = ServerURL + endpoint;
  return fetch(path, request);
}

export async function postSession(data) {
  try {
    let response = await httpRequest('session', 'post', data);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function getProjects(token) {
  try {
    this.token = token;
    let response = await httpRequest('projects', 'get');
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function getAuditions(endpoint, token) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'get');
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function putAudition(endpoint, token, data) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'put', data);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

export async function putAuditions(endpoint, token, data) {
  try {
    this.token = token;
    let response = await httpRequest(endpoint, 'put', data);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

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

export async function resetData() {
  try {
    let response = await httpRequest('projects/reset_data', 'get');
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}
