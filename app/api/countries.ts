import axios from 'axios';

const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export const getAllCountries = async () => {
  const response = await client.get('/all');
  return response.data;
};
