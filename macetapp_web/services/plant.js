import axios from 'axios';
import { randomPlants } from '../randomPlants'

const getRandomPlant = () => {
    const data = Object.keys(randomPlants)
    const index = (Math.random() * (3 - 0) + 0).toFixed(0);
    return randomPlants[data[index]]
}

const getPlants = async () => {
    return axios.get('/api/plants').then(resp => resp.data).catch(err => err)
}

const addPlant = (data) => {
    return axios.post('/api/plants', data).then(resp => resp).catch(err => err)
}

const getPlant = (googleId) => {
    return axios.get(`/api/users/${googleId}/plants`).then(resp => resp).catch(err => err)
}

const updatePlant = (data) => {
    return axios.patch('/api/plants', data).then(resp => resp).catch(err => err)
}

export const plantService = {
    getPlants,
    getRandomPlant,
    addPlant,
    getPlant,
    updatePlant
}