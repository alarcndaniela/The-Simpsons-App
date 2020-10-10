import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thesimpsonsquoteapi.glitch.me/',
	headers: { 'Content-Type': 'application/json'},
});

export default instance;