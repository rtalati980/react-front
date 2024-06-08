import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://ec2.radhakrishnamart.com:8443',
  withCredentials: true // Ensures cookies are included in requests
});

export default axiosInstance;
