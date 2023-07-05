import sendRequest from "./send-request";
const BASE_URL = '/api/reviews';

export async function getById(id){
  return sendRequest(`${BASE_URL}/${id}`)
}