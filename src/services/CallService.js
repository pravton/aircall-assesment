import axios from 'axios';

const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app/';
const ANYWHERE_URL = 'https://charming-bat-singlet.cyclic.app/';

async function apiCall(method, url, data, baseUpdate = false) {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    if(baseUpdate) {
      config.url = `${ANYWHERE_URL}${BASE_URL}/${url}`;
    } else {
      config.url = `${BASE_URL}/${url}`;
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error(`Error occurred while making ${method} request to ${url}: ${error}`);
    throw error;
  }
}


export async function getCalls() {
  return apiCall('get', 'activities');
}

export async function getCall(id) {
  return apiCall('get', `activities/${id}`);
}

export async function updateCall(id, data, baseUpdate = false) {
  return apiCall('patch', `activities/${id}`, data, baseUpdate);
}

export async function resetCalls() {
  return apiCall('patch', 'reset');
}
