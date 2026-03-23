// This is the base URL of your Laravel backend
const BASE_URL = 'https://fakestoreapiserver.reactbd.org/api';

// ==============================================================
// USER API
// ==============================================================
export const getTopicNodeAPI = {
  // GET request function
  get: async<T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  }
}
