import axios from 'axios';

export const fetchListings = async () => {
  try {
    const response = await axios.get('/api/getListingsInView', {
      params: {
        neLat: 55.98296328587119,
        neLng: -54.54163846501635,
        swLat: 5.1917120305937345,
        swLng: -142.45547380176595
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

