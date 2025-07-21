import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export const createNote = (note) => API.post('/notes', note);
export const getNote = (id) => API.get(`/notes/${id}`);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);
