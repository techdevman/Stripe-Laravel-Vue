import axios from "axios";

const googleApiKey = 'AIzaSyCja89IorWF_8352aoPQDuvdkEeAWRw3dg';
const spreadsheetId = '1EEITiB6_oFxtdZJD76P_euXhKcpa6qvzlbnNy47usag';

const convertData = (items, headers) => {
    return items.map(item => {
        const itemObject = {};
        headers.forEach((header, index) => {
            if (item[index]) {
                itemObject[header.value] = item[index];
            } else {
                itemObject[header.value] = '';
            }
        });
        return itemObject;
    });
}

const validEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export { googleApiKey, spreadsheetId, convertData, validEmail, apiClient, fetchUser };
