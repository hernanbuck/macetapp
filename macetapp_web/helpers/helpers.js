import { randomPlants } from '../randomPlants'

export const getRandomPlant = () => {
    const data = Object.keys(randomPlants)
    const index = (Math.random() * (3 - 0) + 0).toFixed(0);
    return randomPlants[data[index]]
}