import axios from 'axios';
const BASE = 'http://localhost:5000/api/v1';

export const getItems = ()=> axios.get(BASE + '/items').then(r=>r.data);
export const capture = (payload)=> axios.post(BASE + '/capture', payload).then(r=>r.data);
export const search = (q)=> axios.post(BASE + '/search', { query: q }).then(r=>r.data);
