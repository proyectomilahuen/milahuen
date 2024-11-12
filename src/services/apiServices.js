import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/endpoint`); // definir ruta dps
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};