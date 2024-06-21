import axios from "axios";
const BASE_URL = "http://localhost:5000";

const apiInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

export const home = async (data) => {
  try {
    const apiResponse = await apiInstance.get(`/`);
    return apiResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const sendMessage = async (data) => {
  try {
    const apiResponse = await apiInstance.get(`/`);
    return apiResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
