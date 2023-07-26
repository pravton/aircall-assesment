import axios from 'axios';

const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app/';

async function apiCall(method, url, data) {
  try {
    const response = await axios({ method, url: `${BASE_URL}/${url}`, data });
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

export async function updateCall(id, data) {
  return apiCall('patch', `activities/${id}`, data);
}

export async function resetCalls() {
  return apiCall('patch', 'reset');
}
